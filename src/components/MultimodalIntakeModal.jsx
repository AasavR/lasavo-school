import React, { useState } from 'react';
import { analyzeMultimodalClientInput } from '../services/engineeringAgents';

export default function MultimodalIntakeModal({ isOpen, onClose, onAddProject }) {
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80");
  const [videoUrl, setVideoUrl] = useState("");
  const [projectTitle, setProjectTitle] = useState("Horizon Heights - G+8 Commercial Tower");
  const [clientName, setClientName] = useState("Horizon Realty & Infra Ltd.");
  const [clientInstructions, setClientInstructions] = useState("Client requests G+8 commercial building with stilt parking, RCC moment frames, ETABS model, AutoCAD structural framing, and Tekla BIM drawings.");
  const [designCode, setDesignCode] = useState("IS 456 / IS 1893:2016");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  if (!isOpen) return null;

  // Preset sample client intake media
  const sampleMedia = [
    { name: "Building Blueprint Photo", url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80" },
    { name: "Industrial Steel Truss Photo", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" },
    { name: "High Rise Construction Site Photo", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" }
  ];

  const handleRunMultimodalVision = async () => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeMultimodalClientInput(selectedImage, clientInstructions);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreatePipelineProject = () => {
    const newProj = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      title: projectTitle,
      client: clientName,
      buildingType: analysisResult?.detectedTypology || "Multi-Story RCC Frame",
      stories: analysisResult?.estimatedStories || 8,
      designCode: designCode,
      seismicZone: "Zone IV (Z = 0.24)",
      windSpeed: "44 m/s",
      soilBearingCapacity: "190 kN/m²",
      concreteGrade: "M30 (Columns), M25 (Beams)",
      steelGrade: "Fe500D TMT",
      stage: "concept",
      clientBrief: {
        image: selectedImage,
        videoUrl: videoUrl,
        description: clientInstructions,
        keyRequirements: [
          analysisResult?.detectedGrid || "5.5m x 4.8m Column Bay Grid",
          "Complete ETABS .e2k & STAAD .std generation",
          "2D AutoCAD DXF & Tekla 3D BIM exporter"
        ]
      },
      architecturalSpecs: {
        totalAreaSqFt: 32000,
        footprintDim: "24.0m x 20.0m",
        roomSchedule: [
          { name: "Commercial Office Floor", dim: "24.0m x 20.0m" }
        ]
      },
      structuralSpecs: {
        columnSizes: [
          { id: "C1", dim: "500mm x 500mm", location: "Corner", rebar: "10 - 25mm dia (Fe500)" },
          { id: "C2", dim: "600mm x 600mm", location: "Interior Heavy", rebar: "14 - 25mm dia (Fe500)" }
        ],
        beamSizes: [
          { id: "B1", dim: "300mm x 450mm", type: "Main Beam", rebar: "Top 3-16#, Bottom 4-20#" }
        ],
        slabThickness: "150mm Two-Way RCC Slab",
        foundationType: "Isolated Footings / Raft Mat",
        shearWallThickness: "250mm RCC Wall"
      },
      feaResults: {
        maxBendingMoment: "165 kN·m",
        maxShearForce: "98 kN",
        maxAxialLoad: "2150 kN",
        maxStoryDrift: "0.0019",
        maxDeflection: "12.1 mm",
        dcRatios: [
          { member: "Column C1 Ground", ratio: 0.81, status: "PASS" },
          { member: "Column C2 Ground", ratio: 0.88, status: "PASS" },
          { member: "Beam B1 First Floor", ratio: 0.91, status: "PASS" }
        ]
      },
      agentOutputs: {
        architect: { completed: true, timestamp: new Date().toLocaleTimeString(), summary: "Multimodal intake mapped 24m x 20m column grid." },
        civil: { completed: false, timestamp: "", summary: "Formulating BOQ & Foundation requirements..." },
        draftsman: { completed: false, timestamp: "", summary: "Drafting AutoCAD DXF & Tekla 3D BIM models..." },
        structural: { completed: false, timestamp: "", summary: "Constructing ETABS .e2k & STAAD.Pro .std models..." }
      },
      engineerApproval: {
        approved: false,
        signedBy: "",
        licenseNo: "",
        comments: "",
        approvalDate: ""
      }
    };

    onAddProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 animate-fade-in my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
              Multimodal Client Intake Engine (Vision & Video Parser)
            </h2>
            <p className="text-xs text-slate-400">
              Upload client images, video briefs, site photos, or hand sketches for AI extraction
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
          >
            ✕ Close
          </button>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Image/Video Selection & Input Form */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project Title & Client:</label>
              <input
                type="text"
                value={projectTitle}
                onChange={e => setProjectTitle(e.target.value)}
                placeholder="Project Title"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:border-indigo-500 focus:outline-none mb-2"
              />
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Client Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select / Upload Client Input Image:</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {sampleMedia.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(m.url)}
                    className={`p-1.5 rounded-xl border text-[10px] font-semibold text-left transition overflow-hidden ${
                      selectedImage === m.url ? 'bg-indigo-950 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <img src={m.url} alt={m.name} className="w-full h-14 object-cover rounded-lg mb-1" />
                    <span className="truncate block">{m.name}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={selectedImage}
                onChange={e => setSelectedImage(e.target.value)}
                placeholder="Or paste image URL"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Structural Design Code:</label>
              <select
                value={designCode}
                onChange={e => setDesignCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              >
                <option value="IS 456 / IS 1893:2016">Indian Standards (IS 456 / IS 1893:2016)</option>
                <option value="ACI 318-19 / AISC 360">ACI 318-19 / AISC 360 (USA)</option>
                <option value="Eurocode 2 / Eurocode 3">Eurocode 2 (Concrete) & Eurocode 3 (Steel)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client Brief & Specific Requests:</label>
              <textarea
                rows={3}
                value={clientInstructions}
                onChange={e => setClientInstructions(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleRunMultimodalVision}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Multimodal Gemini Agent Analyzing Image & Brief...</span>
                </>
              ) : (
                <span>👁️ Run AI Vision Recognition on Client Media</span>
              )}
            </button>
          </div>

          {/* Right Column: Image Preview & AI Extracted Specifications */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-44 bg-slate-950 flex items-center justify-center">
              <img src={selectedImage} alt="Client Input" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] text-slate-300 font-bold border border-slate-800">
                📷 Client Media Preview
              </div>
            </div>

            {analysisResult ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>✓ AI Multimodal Recognition Completed</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Gemini 3.6 Vision</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Building Typology & Grid:</span>
                    <span className="font-bold text-white">{analysisResult.detectedTypology} • {analysisResult.detectedGrid}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Materials & Code:</span>
                    <span className="font-bold text-indigo-300">{analysisResult.detectedMaterials}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Extracted Load Cases:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysisResult.detectedLoadCases.map((lc, idx) => (
                        <span key={idx} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">
                          {lc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreatePipelineProject}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:scale-105 mt-2"
                >
                  🚀 Launch Engineering Workforce Pipeline for this Project
                </button>
              </div>
            ) : (
              <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-2">
                <p>Click "Run AI Vision Recognition" to let the multimodal agent parse building grid, story heights, seismic zones, and load combinations.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
