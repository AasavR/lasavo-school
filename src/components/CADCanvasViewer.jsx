import React, { useRef, useEffect, useState } from 'react';
import { generateAutoCADDXF } from '../services/engineeringAgents';

export default function CADCanvasViewer({ project }) {
  const canvasRef = useRef(null);

  // Layer visibility toggles
  const [layers, setLayers] = useState({
    gridLines: true,
    columns: true,
    beams: true,
    shearWalls: true,
    dimensions: true,
    bluebeamMarkup: true
  });

  // Canvas Viewport State (Zoom & Pan)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState('pan'); // 'pan' | 'measure'
  const [measurePoints, setMeasurePoints] = useState([]);
  const [measuredDistance, setMeasuredDistance] = useState(null);

  // Redraw Canvas whenever view or layers change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear Background (AutoCAD Dark Slate Theme)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw Subtle AutoCAD Background Grid Lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1 / zoom;
    for (let x = -500; x < width + 500; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, -500);
      ctx.lineTo(x, height + 500);
      ctx.stroke();
    }
    for (let y = -500; y < height + 500; y += 40) {
      ctx.beginPath();
      ctx.moveTo(-500, y);
      ctx.lineTo(width + 500, y);
      ctx.stroke();
    }

    // Grid Coordinates (X: 0 to 4 bay spans @ 110px, Y: 0 to 4 bay spans @ 95px)
    const xGrids = [60, 170, 280, 390, 500];
    const yGrids = [60, 155, 250, 345, 440];
    const xLabels = ['A', 'B', 'C', 'D', 'E'];
    const yLabels = ['1', '2', '3', '4', '5'];

    // 1. Draw Structural Grid Lines (Red Centerlines)
    if (layers.gridLines) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5 / zoom;
      ctx.setLineDash([8, 4]);

      // Vertical Grids
      xGrids.forEach((x, idx) => {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, 480);
        ctx.stroke();

        // Grid Bubble
        ctx.setLineDash([]);
        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(x, 20, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(xLabels[idx], x, 20);
        ctx.setLineDash([8, 4]);
      });

      // Horizontal Grids
      yGrids.forEach((y, idx) => {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(540, y);
        ctx.stroke();

        // Grid Bubble
        ctx.setLineDash([]);
        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(20, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(yLabels[idx], 20, y);
        ctx.setLineDash([8, 4]);
      });
      ctx.setLineDash([]);
    }

    // 2. Draw Beams (Cyan Solid Lines connecting grid intersections)
    if (layers.beams) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 4 / zoom;

      // Horizontal Beams
      for (let i = 0; i < yGrids.length; i++) {
        ctx.beginPath();
        ctx.moveTo(xGrids[0], yGrids[i]);
        ctx.lineTo(xGrids[xGrids.length - 1], yGrids[i]);
        ctx.stroke();
      }

      // Vertical Beams
      for (let j = 0; j < xGrids.length; j++) {
        ctx.beginPath();
        ctx.moveTo(xGrids[j], yGrids[0]);
        ctx.lineTo(xGrids[j], yGrids[yGrids.length - 1]);
        ctx.stroke();
      }
    }

    // 3. Draw Central Shear Wall Core
    if (layers.shearWalls) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(xGrids[1], yGrids[1], xGrids[3] - xGrids[1], yGrids[2] - yGrids[1]);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STAIR & LIFT SHEAR CORE (200mm RCC)', (xGrids[1] + xGrids[3]) / 2, (yGrids[1] + yGrids[2]) / 2);
    }

    // 4. Draw Column Blocks (Yellow/Green Solid Squares)
    if (layers.columns) {
      const colSize = 22; // Canvas pixels representing 450mm
      xGrids.forEach((x, colIdx) => {
        yGrids.forEach((y, rowIdx) => {
          // Skip core area
          if (colIdx > 0 && colIdx < 3 && rowIdx === 1) return;

          ctx.fillStyle = (colIdx === 0 || colIdx === 4 || rowIdx === 0 || rowIdx === 4) ? '#fbbf24' : '#10b981'; // Corner yellow, Interior green
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1 / zoom;
          ctx.fillRect(x - colSize / 2, y - colSize / 2, colSize, colSize);
          ctx.strokeRect(x - colSize / 2, y - colSize / 2, colSize, colSize);

          // Hatch lines inside column
          ctx.strokeStyle = '#000000';
          ctx.beginPath();
          ctx.moveTo(x - colSize / 2, y - colSize / 2);
          ctx.lineTo(x + colSize / 2, y + colSize / 2);
          ctx.stroke();
        });
      });
    }

    // 5. Draw Dimension Lines (Green Dimensions)
    if (layers.dimensions) {
      ctx.strokeStyle = '#22c55e';
      ctx.fillStyle = '#22c55e';
      ctx.font = '10px monospace';
      ctx.lineWidth = 1 / zoom;

      // Span dimensions
      for (let i = 0; i < xGrids.length - 1; i++) {
        const x1 = xGrids[i];
        const x2 = xGrids[i + 1];
        const yDim = 465;

        ctx.beginPath();
        ctx.moveTo(x1, yDim);
        ctx.lineTo(x2, yDim);
        ctx.stroke();

        ctx.fillText('5.50m', (x1 + x2) / 2, yDim + 12);
      }
    }

    // 6. Draw Bluebeam Style Revision Markup Callouts
    if (layers.bluebeamMarkup) {
      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 2 / zoom;

      // Draw revision cloud around corner column C1
      const cx = xGrids[0];
      const cy = yGrids[0];
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('REV 1: C1 450x450 M30', cx + 38, cy - 5);
    }

    // Draw active measurement points if any
    if (measurePoints.length > 0) {
      ctx.fillStyle = '#ec4899';
      measurePoints.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5 / zoom, 0, Math.PI * 2);
        ctx.fill();
      });

      if (measurePoints.length === 2) {
        ctx.strokeStyle = '#ec4899';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(measurePoints[0].x, measurePoints[0].y);
        ctx.lineTo(measurePoints[1].x, measurePoints[1].y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.restore();
  }, [pan, zoom, layers, measurePoints]);

  // Handle Mouse Events for Pan & Measure
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - pan.x) / zoom;
    const clickY = (e.clientY - rect.top - pan.y) / zoom;

    if (activeTool === 'measure') {
      if (measurePoints.length >= 2) {
        setMeasurePoints([{ x: clickX, y: clickY }]);
        setMeasuredDistance(null);
      } else {
        const nextPts = [...measurePoints, { x: clickX, y: clickY }];
        setMeasurePoints(nextPts);
        if (nextPts.length === 2) {
          const dx = nextPts[1].x - nextPts[0].x;
          const dy = nextPts[1].y - nextPts[0].y;
          const distPx = Math.sqrt(dx * dx + dy * dy);
          // Scale: 110 px = 5.5m -> 1 px = 0.05m
          const distMeters = (distPx * 0.05).toFixed(2);
          setMeasuredDistance(distMeters);
        }
      }
      return;
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownloadDXF = () => {
    const dxfString = generateAutoCADDXF(project);
    const blob = new Blob([dxfString], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}_AutoCAD_Framing.dxf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            AutoCAD 2D Framing Engine (.DXF Viewer & Bluebeam Callouts)
          </h3>
          <p className="text-[11px] text-slate-400">
            Interactive structural layout plan showing column grids, beams & shear wall core
          </p>
        </div>

        {/* View Controls & Exporter */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTool(activeTool === 'pan' ? 'measure' : 'pan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              activeTool === 'measure' ? 'bg-pink-600 border-pink-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {activeTool === 'measure' ? '📏 Measuring Mode' : '✋ Pan Mode'}
          </button>

          <button
            onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
            title="Zoom In"
          >
            🔍+
          </button>

          <button
            onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
            title="Zoom Out"
          >
            🔍-
          </button>

          <button
            onClick={() => { setZoom(1); setPan({ x: 40, y: 40 }); setMeasurePoints([]); setMeasuredDistance(null); }}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-semibold"
          >
            Reset
          </button>

          <button
            onClick={handleDownloadDXF}
            className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow shadow-cyan-600/30 flex items-center space-x-1.5 transition"
          >
            <span>⬇️ Export .DXF CAD</span>
          </button>
        </div>
      </div>

      {/* Layer Toggles Toolbar */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-slate-400 font-medium py-1">CAD Layers:</span>
        <button
          onClick={() => setLayers(l => ({ ...l, gridLines: !l.gridLines }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.gridLines ? 'bg-red-950/80 border-red-700 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.gridLines ? '✓ Red Grids' : '× Grids'}
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, columns: !l.columns }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.columns ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.columns ? '✓ Columns' : '× Columns'}
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, beams: !l.beams }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.beams ? 'bg-cyan-950/80 border-cyan-700 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.beams ? '✓ Beams' : '× Beams'}
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, shearWalls: !l.shearWalls }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.shearWalls ? 'bg-sky-950/80 border-sky-700 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.shearWalls ? '✓ Shear Wall Core' : '× Shear Wall'}
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, dimensions: !l.dimensions }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.dimensions ? 'bg-green-950/80 border-green-700 text-green-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.dimensions ? '✓ Dimensions' : '× Dimensions'}
        </button>

        <button
          onClick={() => setLayers(l => ({ ...l, bluebeamMarkup: !l.bluebeamMarkup }))}
          className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition ${
            layers.bluebeamMarkup ? 'bg-pink-950/80 border-pink-700 text-pink-300' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          {layers.bluebeamMarkup ? '✓ Bluebeam Annotations' : '× Bluebeam'}
        </button>
      </div>

      {/* Measured Distance Toast */}
      {measuredDistance && (
        <div className="bg-pink-950/90 border border-pink-700 text-pink-200 px-3 py-1.5 rounded-lg text-xs font-bold flex justify-between items-center">
          <span>Measured Dimension Distance: <span className="text-white text-sm">{measuredDistance} meters</span></span>
          <button onClick={() => { setMeasurePoints([]); setMeasuredDistance(null); }} className="text-pink-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Canvas Display */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          width={700}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-[460px] block"
        />

        <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-400 font-mono flex items-center space-x-3">
          <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
          <span>Scale: 1:100 Metric</span>
          <span>Grid: 5.5m x 4.8m</span>
        </div>
      </div>
    </div>
  );
}
