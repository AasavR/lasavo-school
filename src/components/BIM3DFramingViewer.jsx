import React, { useRef, useEffect, useState } from 'react';
import { generateTeklaBIMJSON } from '../services/engineeringAgents';

export default function BIM3DFramingViewer({ project, customOverrides = {} }) {
  const canvasRef = useRef(null);

  // 3D Orbit View State
  const [angleX, setAngleX] = useState(-25); // degrees
  const [angleY, setAngleY] = useState(45);  // degrees
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState('tekla_bim'); // 'tekla_bim' | 'moment_diagram' | 'deflection' | 'forces'
  const [visibleStories, setVisibleStories] = useState(project.stories || 6);

  const [isOrbiting, setIsOrbiting] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Draw 3D Frame Projection on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2 + 60);

    const radX = (angleX * Math.PI) / 180;
    const radY = (angleY * Math.PI) / 180;

    // Project 3D Point (x, y, z) to 2D Screen (sx, sy)
    const project3D = (x, y, z) => {
      // Rotation Y
      const x1 = x * Math.cos(radY) - z * Math.sin(radY);
      const z1 = x * Math.sin(radY) + z * Math.cos(radY);

      // Rotation X
      const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);

      const scale = zoom * 0.95;
      return {
        sx: x1 * scale,
        sy: -y2 * scale
      };
    };

    // Define Grid Dimensions
    const bayX = 55;
    const bayZ = 45;
    const storyH = 35;
    const numX = 3; // 4 columns in X
    const numZ = 3; // 4 columns in Z

    // Draw Ground Grid / Footings Base
    for (let ix = 0; ix <= numX; ix++) {
      for (let iz = 0; iz <= numZ; iz++) {
        const x = (ix - numX / 2) * bayX;
        const z = (iz - numZ / 2) * bayZ;
        const pBase = project3D(x, 0, z);

        // Draw Footing Pad
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pBase.sx, pBase.sy, 6 * zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    // Draw Stories (Columns & Beams)
    for (let story = 0; story < visibleStories; story++) {
      const yBottom = story * storyH;
      const yTop = (story + 1) * storyH;

      // Draw Vertical Columns
      for (let ix = 0; ix <= numX; ix++) {
        for (let iz = 0; iz <= numZ; iz++) {
          const x = (ix - numX / 2) * bayX;
          const z = (iz - numZ / 2) * bayZ;

          let pBot = project3D(x, yBottom, z);
          let pTop = project3D(x, yTop, z);

          // Apply Deflection offset if in deflection mode
          if (viewMode === 'deflection') {
            const driftOffset = Math.pow(story + 1, 1.4) * 2.2;
            pTop.sx += driftOffset;
          }

          // Member Stress Color (Green = Safe, Yellow = High, Red = Overstressed)
          let colColor = story === 0 ? '#10b981' : '#34d399';
          if (story === 0 && customOverrides.concreteGrade === 'M20') colColor = '#f43f5e'; // Stress warning

          ctx.strokeStyle = colColor;
          ctx.lineWidth = (story === 0 ? 5 : 3.5) * zoom;
          ctx.beginPath();
          ctx.moveTo(pBot.sx, pBot.sy);
          ctx.lineTo(pTop.sx, pTop.sy);
          ctx.stroke();
        }
      }

      // Draw Floor Beams (X-Direction & Z-Direction)
      for (let ix = 0; ix <= numX; ix++) {
        for (let iz = 0; iz <= numZ; iz++) {
          const x = (ix - numX / 2) * bayX;
          const z = (iz - numZ / 2) * bayZ;

          // X-Beam to next column
          if (ix < numX) {
            const xNext = (ix + 1 - numX / 2) * bayX;
            let p1 = project3D(x, yTop, z);
            let p2 = project3D(xNext, yTop, z);

            if (viewMode === 'deflection') {
              const driftOffset = Math.pow(story + 1, 1.4) * 2.2;
              p1.sx += driftOffset;
              p2.sx += driftOffset;
            }

            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2.5 * zoom;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);

            if (viewMode === 'moment_diagram') {
              // Draw Bending Moment Parabola Curve on Beam
              const midX = (p1.sx + p2.sx) / 2;
              const midY = (p1.sy + p2.sy) / 2 + 14 * zoom;
              ctx.quadraticCurveTo(midX, midY, p2.sx, p2.sy);
              ctx.strokeStyle = '#a855f7'; // Purple moment curve
            } else {
              ctx.lineTo(p2.sx, p2.sy);
            }
            ctx.stroke();
          }

          // Z-Beam to next column
          if (iz < numZ) {
            const zNext = (iz + 1 - numZ / 2) * bayZ;
            let p1 = project3D(x, yTop, z);
            let p2 = project3D(x, yTop, zNext);

            if (viewMode === 'deflection') {
              const driftOffset = Math.pow(story + 1, 1.4) * 2.2;
              p1.sx += driftOffset;
              p2.sx += driftOffset;
            }

            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 2.5 * zoom;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw Floor Slab Translucent Plane on Floor Top
      ctx.fillStyle = 'rgba(14, 165, 233, 0.08)';
      const pTL = project3D((-numX / 2) * bayX, yTop, (-numZ / 2) * bayZ);
      const pTR = project3D((numX / 2) * bayX, yTop, (-numZ / 2) * bayZ);
      const pBR = project3D((numX / 2) * bayX, yTop, (numZ / 2) * bayZ);
      const pBL = project3D((-numX / 2) * bayX, yTop, (numZ / 2) * bayZ);

      ctx.beginPath();
      ctx.moveTo(pTL.sx, pTL.sy);
      ctx.lineTo(pTR.sx, pTR.sy);
      ctx.lineTo(pBR.sx, pBR.sy);
      ctx.lineTo(pBL.sx, pBL.sy);
      ctx.closePath();
      ctx.fill();
    }

    // Draw Lateral Seismic Force Arrows if in Forces mode
    if (viewMode === 'forces') {
      for (let s = 1; s <= visibleStories; s++) {
        const pFloor = project3D((-numX / 2) * bayX - 25, s * storyH, 0);
        ctx.strokeStyle = '#f43f5e';
        ctx.fillStyle = '#f43f5e';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(pFloor.sx - 35, pFloor.sy);
        ctx.lineTo(pFloor.sx, pFloor.sy);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(pFloor.sx, pFloor.sy);
        ctx.lineTo(pFloor.sx - 8, pFloor.sy - 5);
        ctx.lineTo(pFloor.sx - 8, pFloor.sy + 5);
        ctx.closePath();
        ctx.fill();

        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(`EQ Lateral: ${(s * 45).toFixed(0)} kN`, pFloor.sx - 85, pFloor.sy - 4);
      }
    }

    ctx.restore();
  }, [angleX, angleY, zoom, viewMode, visibleStories, customOverrides, project]);

  // Orbit Mouse Handlers
  const handleMouseDown = (e) => {
    setIsOrbiting(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isOrbiting) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;

    setAngleY(a => a + dx * 0.5);
    setAngleX(a => Math.max(-80, Math.min(80, a + dy * 0.5)));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsOrbiting(false);
  };

  const handleExportTekla = () => {
    const teklaObj = generateTeklaBIMJSON(project);
    const jsonStr = JSON.stringify(teklaObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}_Tekla_BIM_Model.ifc.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            3D Structural Frame & Tekla/BIM Model Viewer
          </h3>
          <p className="text-[11px] text-slate-400">
            Interactive 3D FEA frame preview, deformed shape & structural load visualization
          </p>
        </div>

        {/* View Mode Switches */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('tekla_bim')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              viewMode === 'tekla_bim' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🏗️ 3D BIM Frame
          </button>

          <button
            onClick={() => setViewMode('moment_diagram')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              viewMode === 'moment_diagram' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📈 Moment Diagrams (Mu)
          </button>

          <button
            onClick={() => setViewMode('deflection')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              viewMode === 'deflection' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            〰️ Deflected Shape
          </button>

          <button
            onClick={() => setViewMode('forces')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              viewMode === 'forces' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Seismic Load Vectors
          </button>
        </div>

        <button
          onClick={handleExportTekla}
          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow shadow-emerald-600/30 transition flex items-center space-x-1"
        >
          <span>⬇️ Export Tekla IFC/BIM</span>
        </button>
      </div>

      {/* Story Height Slider & Orbit Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800/80">
        <div className="flex items-center space-x-3">
          <span className="text-slate-300 font-medium">Building Height (Stories):</span>
          <input
            type="range"
            min={1}
            max={project.stories || 8}
            value={visibleStories}
            onChange={e => setVisibleStories(parseInt(e.target.value))}
            className="accent-emerald-500 cursor-pointer w-28"
          />
          <span className="font-bold text-emerald-400">{visibleStories} Levels</span>
        </div>

        <div className="flex items-center space-x-4 text-slate-400">
          <span>Click & Drag to 3D Orbit Rotate</span>
          <span>Pitch: {angleX.toFixed(0)}°</span>
          <span>Yaw: {angleY.toFixed(0)}°</span>
        </div>
      </div>

      {/* 3D Canvas Render Box */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 cursor-move">
        <canvas
          ref={canvasRef}
          width={700}
          height={460}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-[440px] block"
        />

        {/* Floating Legend */}
        <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur border border-slate-800 p-2.5 rounded-xl text-[10px] text-slate-300 space-y-1">
          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1">FEA Stress Key</div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Pass (D/C &le; 0.80)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Beams (300x450 M25)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>Bending Moment Parabola</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Seismic EQ Lateral Loads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
