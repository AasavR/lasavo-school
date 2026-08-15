// Data repository for Civil & Structural Engineering AI Pipeline Projects

export const INITIAL_CIVIL_PROJECTS = [
  {
    id: "proj-gurugram-01",
    title: "Tanishq Flagship Retail Store - Gurugram",
    client: "Titan Company Ltd. / Tanishq Retail",
    buildingType: "Commercial Retail Cantilever RCC Frame",
    location: "MG Road, Gurugram, Haryana",
    stories: 4, // Basement + Ground + 2 Floors
    designCode: "IS 456 / IS 1893:2016",
    seismicZone: "Zone IV (Z = 0.24)",
    windSpeed: "47 m/s",
    soilBearingCapacity: "210 kN/m²",
    concreteGrade: "M35 (Columns), M30 (Beams & Slabs)",
    steelGrade: "Fe500D TMT",
    stage: "verification",
    clientBrief: {
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "",
      description: "High-end retail jewelry showroom in Gurugram featuring column-free double-height glass atrium, 4.5m cantilevered front facade, heavy vault structural reinforcement, and ETABS FEA model.",
      keyRequirements: [
        "4.5m Cantilevered Front Entry Canopy (Heavy M35 Beam)",
        "Column-free central atrium 12m x 10m",
        "Reinforced Concrete Vault Room (300mm shear wall + Fe550D mesh)",
        "Seismic Zone IV Delhi-NCR ductile detailing per IS 13920"
      ]
    },
    architecturalSpecs: {
      totalAreaSqFt: 18500,
      footprintDim: "18.0m x 16.0m",
      roomSchedule: [
        { name: "Ground Floor Showroom Floor", dim: "18.0m x 16.0m" },
        { name: "High-Security Vault Room", dim: "6.0m x 4.5m" },
        { name: "First Floor Diamond Gallery", dim: "18.0m x 16.0m" }
      ]
    },
    structuralSpecs: {
      columnSizes: [
        { id: "TG1", dim: "500mm x 500mm", location: "Atrium Perimeter Column", rebar: "12 - 25mm dia (Fe500D)" },
        { id: "TG2", dim: "450mm x 600mm", location: "Cantilever Support Column", rebar: "14 - 25mm dia (Fe500D)" }
      ],
      beamSizes: [
        { id: "CANT1", dim: "350mm x 600mm Heavy Cantilever Beam", type: "Front Facade Support", rebar: "Top 6-25#, Bottom 2-16#" },
        { id: "B1", dim: "300mm x 450mm", type: "Main Span Beam", rebar: "Top 3-16#, Bottom 4-20#" }
      ],
      slabThickness: "175mm Two-Way Slab with Heavy Security Mesh",
      foundationType: "Combined Raft Footing with Vault Pedestals",
      shearWallThickness: "300mm Vault & Core Shear Wall"
    },
    feaResults: {
      maxBendingMoment: "285.0 kN·m (Cantilever Support Beam CANT1)",
      maxShearForce: "142.0 kN",
      maxAxialLoad: "2450 kN (Atrium Column TG2 Ground)",
      maxStoryDrift: "0.0016 (Limit: 0.0040)",
      maxDeflection: "8.4 mm (Cantilever Tip Deflection)",
      dcRatios: [
        { member: "Cantilever Beam CANT1 (Gurugram)", ratio: 0.84, status: "PASS (Optimal)" },
        { member: "Atrium Column TG1 (G.F.)", ratio: 0.79, status: "PASS (Optimal)" },
        { member: "Vault RCC Wall (300mm)", ratio: 0.62, status: "PASS (Optimal)" }
      ]
    },
    agentOutputs: {
      architect: { completed: true, timestamp: "2026-08-15 09:15", summary: "Auto-classified: Gurugram Tanishq Retail Project. Matched 18m x 16m floorplan." },
      civil: { completed: true, timestamp: "2026-08-15 09:30", summary: "BOQ: Concrete = 360 m³, Steel Rebar = 38.5 MT. Vault Raft Foundation designed." },
      draftsman: { completed: true, timestamp: "2026-08-15 10:00", summary: "Generated 2D AutoCAD DXF framing plan & Tekla 3D BIM model." },
      structural: { completed: true, timestamp: "2026-08-15 10:45", summary: "Completed ETABS .e2k script & cantilever FEA deflection check." }
    },
    engineerApproval: {
      approved: false,
      signedBy: "",
      licenseNo: "",
      comments: "",
      approvalDate: ""
    }
  },
  {
    id: "proj-andaman-02",
    title: "Nestle & Amul FMCD Logistics Warehouse - Andaman & Nicobar",
    client: "Nestle India & Amul Cooperative / Port Blair Logistics",
    buildingType: "Industrial Steel Cold Storage Portal Truss",
    location: "Port Blair, Andaman & Nicobar Islands",
    stories: 1, // Clear Span Warehouse
    designCode: "IS 800:2007 / AISC 360-16 / IS 875 (Part 3 Wind)",
    seismicZone: "Zone V (Z = 0.36 High Seismic Island)",
    windSpeed: "55 m/s (Cyclone Zone Coastal)",
    soilBearingCapacity: "140 kN/m² (Coral Sand & Clay)",
    concreteGrade: "M30 (Pedestals), M25 (Substructure)",
    steelGrade: "Fe345 High Wind Structural Steel",
    stage: "structural",
    clientBrief: {
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "",
      description: "FMCD cold storage distribution center in Port Blair for Nestle and Amul products. 36m clear span portal frame x 72m length. High wind (55 m/s cyclone) & Zone V seismic design. STAAD.Pro model, Tekla steel detailing & anchor bolt schedule.",
      keyRequirements: [
        "36.0m Clear Span Portal Truss without interior columns",
        "Cyclone Wind Resistance: 55 m/s velocity pressure 1.85 kN/m²",
        "High Seismic Zone V ductile portal connections",
        "Insulated Sandwich Panel Roof & Cold Chain Mezzanine"
      ]
    },
    architecturalSpecs: {
      totalAreaSqFt: 27900,
      footprintDim: "36.0m x 72.0m",
      roomSchedule: [
        { name: "Nestle & Amul Cold Storage Zone", dim: "36.0m x 60.0m" },
        { name: "Loading Bay & Admin Office", dim: "36.0m x 12.0m" }
      ]
    },
    structuralSpecs: {
      columnSizes: [
        { id: "AC1", dim: "ISMB 600 Heavy Built-up Column", location: "Portal Frame Main Column", rebar: "Flange 25mm, Web 16mm" },
        { id: "AC2", dim: "ISMB 400 Gable Column", location: "Gable Wind Frame", rebar: "Standard Section" }
      ],
      beamSizes: [
        { id: "TRUSS1", dim: "Warren Truss Top Chord 2xISA 100x100x10", type: "36m Span Roof Truss", rebar: "Welded Gusset Plate" },
        { id: "PUR1", dim: "Z250 x 2.5mm Cold Formed Purlin", type: "Roof Purlin @ 1.0m c/c", rebar: "Continuous Span" }
      ],
      slabThickness: "220mm Heavy Load Slab on Grade with Polyfiber Rebar",
      foundationType: "RCC Pedestal with 32mm Anchor Bolts on Deep Isolated Footings",
      shearWallThickness: "Double Diagonal Steel Rod Bracing (32mm Dia)"
    },
    feaResults: {
      maxBendingMoment: "410 kN·m (Portal Knee Joint under 55 m/s Wind)",
      maxShearForce: "165 kN",
      maxAxialLoad: "580 kN (Truss Diagonal Compression)",
      maxStoryDrift: "0.0028 (Lateral Eave Drift)",
      maxDeflection: "42 mm (Roof Ridge Deflection)",
      dcRatios: [
        { member: "Portal Column AC1 (Port Blair Wind)", ratio: 0.86, status: "PASS (Optimal)" },
        { member: "Warren Roof Truss TRUSS1", ratio: 0.89, status: "PASS (Optimal)" },
        { member: "Cyclone Wind Bracing (32mm Rod)", ratio: 0.74, status: "PASS (Optimal)" }
      ]
    },
    agentOutputs: {
      architect: { completed: true, timestamp: "2026-08-15 08:30", summary: "Auto-classified: Andaman & Nicobar Nestle/Amul Warehouse. Defined 36m span grid." },
      civil: { completed: true, timestamp: "2026-08-15 09:00", summary: "Calculated Steel Tonnage = 62.4 MT Structural Steel, Concrete Pedestals = 95 m³." },
      draftsman: { completed: true, timestamp: "2026-08-15 09:45", summary: "Generated STAAD.Pro .std script & Tekla 3D Steel Assembly." },
      structural: { completed: true, timestamp: "2026-08-15 10:30", summary: "Completed STAAD.Pro 55 m/s cyclone wind & Zone V seismic FEA." }
    },
    engineerApproval: {
      approved: false,
      signedBy: "",
      licenseNo: "",
      comments: "",
      approvalDate: ""
    }
  },
  {
    id: "proj-001",
    title: "Skyline Residency - G+5 Residential RCC Building",
    client: "Metro Housing Infrastructure Ltd.",
    buildingType: "Residential RCC Frame",
    location: "Sector 62, Noida, UP",
    stories: 6,
    designCode: "IS 456 / IS 1893:2016",
    seismicZone: "Zone IV (Z = 0.24)",
    windSpeed: "44 m/s",
    soilBearingCapacity: "180 kN/m²",
    concreteGrade: "M30 (Columns), M25 (Beams & Slabs)",
    steelGrade: "Fe500D TMT",
    stage: "verification",
    clientBrief: {
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "",
      description: "Client requires a G+5 apartment complex with parking at stilt level. Typical floor layout: 4 2BHK units per floor. Needs complete structural design, ETABS script, AutoCAD structural framing drawings, and Tekla BIM file.",
      keyRequirements: [
        "Column grid: 5.5m x 4.8m typical bay width",
        "Stilt floor clear height: 3.2m for parking",
        "Typical floor height: 3.0m",
        "Staircase and lift core in center RCC shear wall"
      ]
    },
    architecturalSpecs: {
      totalAreaSqFt: 24500,
      footprintDim: "22.0m x 19.2m",
      roomSchedule: [
        { name: "Living Room", dim: "5.5m x 3.8m" },
        { name: "Master Bedroom", dim: "4.0m x 3.5m" }
      ]
    },
    structuralSpecs: {
      columnSizes: [
        { id: "C1", dim: "450mm x 450mm", location: "Corner", rebar: "8 - 20mm dia (Fe500)" },
        { id: "C2", dim: "500mm x 500mm", location: "Interior Heavy", rebar: "12 - 25mm dia (Fe500)" }
      ],
      beamSizes: [
        { id: "B1", dim: "300mm x 450mm", type: "Main Longitudinal Beam", rebar: "Top 3-16#, Bottom 4-20#" }
      ],
      slabThickness: "150mm Two-Way RCC Slab",
      foundationType: "Isolated Footing (Depth = 2.2m)",
      shearWallThickness: "200mm Reinforced Concrete"
    },
    feaResults: {
      maxBendingMoment: "142.5 kN·m",
      maxShearForce: "88.2 kN",
      maxAxialLoad: "1840 kN",
      maxStoryDrift: "0.0018",
      maxDeflection: "11.4 mm",
      dcRatios: [
        { member: "Column C1 (G.F.)", ratio: 0.78, status: "PASS (Optimal)" },
        { member: "Column C2 (G.F.)", ratio: 0.89, status: "PASS (Safety OK)" }
      ]
    },
    agentOutputs: {
      architect: { completed: true, timestamp: "2026-08-14 10:15", summary: "Generated floorplan grid layout 22m x 19.2m with 16 column nodes." },
      civil: { completed: true, timestamp: "2026-08-14 10:30", summary: "Calculated BOQ: Concrete = 485 m³, Steel Rebar = 46.2 Metric Tons." },
      draftsman: { completed: true, timestamp: "2026-08-14 11:05", summary: "Generated 2D AutoCAD DXF structural frame drawing & Tekla 3D BIM model structure." },
      structural: { completed: true, timestamp: "2026-08-14 11:45", summary: "Created ETABS .e2k script. Performed 3D FEA response spectrum analysis." }
    },
    engineerApproval: {
      approved: false,
      signedBy: "",
      licenseNo: "",
      comments: "",
      approvalDate: ""
    }
  }
];

export const BUILDING_CODES = [
  { id: "IS", name: "Indian Standards (IS 456, IS 1893, IS 800)", country: "India" },
  { id: "ACI", name: "American Concrete Inst. (ACI 318) / AISC 360", country: "USA" },
  { id: "EUROCODE", name: "Eurocode 2 (Concrete) & Eurocode 3 (Steel)", country: "Europe" },
  { id: "BS", name: "British Standards (BS 8110 / BS 5950)", country: "UK" }
];
