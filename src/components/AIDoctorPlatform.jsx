import React, { useState, useEffect, useRef } from 'react';

export default function AIDoctorPlatform() {
  // Global & Navigation State
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('teleconsult'); // 'teleconsult' | 'mentalwellness' | 'pharma' | 'labtests' | 'botanical' | 'symptomchecker'
  
  // Doctor Avatars State
  const [activeAvatar, setActiveAvatar] = useState({
    id: 'doc1',
    name: 'Dr. Ananya Sharma, MD',
    specialty: 'General Medicine & Triage Specialist',
    hospital: 'IIT Delhi AI Tele-Health Innovation Hub',
    avatarImg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experience: '12+ Yrs Clinical Experience (AI Calibrated)',
    status: 'Online • Autonomous 24/7',
    nmcNo: 'NMC/IITD/2026/89201'
  });

  // Tele-Consultation Chat & Speech State
  const [messages, setMessages] = useState([
    {
      sender: 'doctor',
      text: 'Namaste! Welcome to Lasavo AI Tele-Health, developed in technical collaboration with IIT Delhi. I am Dr. Ananya, your AI Medical Avatar. How can I assist you with your health today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [consultationStatus, setConsultationStatus] = useState('Active'); // 'Active' | 'Rx Generated'

  // Modals State
  const [showRxModal, setShowRxModal] = useState(false);
  const [generatedRx, setGeneratedRx] = useState(null);
  const [showSymptomModal, setShowSymptomModal] = useState(false);

  // Service 1: Mental Wellness State
  const [moodRating, setMoodRating] = useState(7);
  const [wellnessNotes, setWellnessNotes] = useState('');
  const [sessionActive, setSessionActive] = useState(false);
  const [therapyType, setTherapyType] = useState('Cognitive Behavioral (CBT)');

  // Service 2: E-Pharmacy State
  const [cart, setCart] = useState([]);
  const [searchRx, setSearchRx] = useState('');

  // Service 3: Lab Test Booking State
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Service 4: Botanical & Phytomedicine Analyzer State
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [botanicalQuery, setBotanicalQuery] = useState('');

  // Symptom Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [triageResult, setTriageResult] = useState(null);

  const doctorsList = [
    {
      id: 'doc1',
      name: 'Dr. Ananya Sharma, MD',
      specialty: 'General Physician & Triage',
      hospital: 'IIT Delhi AI Clinical Center',
      avatarImg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      badge: 'Pan-India 24/7',
      lang: 'English, Hindi, Hinglish',
      nmcNo: 'NMC/IITD/2026/89201'
    },
    {
      id: 'doc2',
      name: 'Dr. Rajesh Verma, DM',
      specialty: 'Cardiology & Heart Care',
      hospital: 'IIT Delhi Medical Tech Research Wing',
      avatarImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      badge: 'AI ECG Scanner',
      lang: 'English, Hindi',
      nmcNo: 'NMC/IITD/2026/41029'
    },
    {
      id: 'doc3',
      name: 'Dr. Kavita Menon, Psy.D',
      specialty: 'Mental Wellness & Video Psychology Avatar',
      hospital: 'IIT Delhi Neuro-AI Lab',
      avatarImg: 'https://images.unsplash.com/photo-1594824813566-818a4d4681fb?auto=format&fit=crop&q=80&w=400',
      badge: 'Therapy Avatar 24/7',
      lang: 'English, Hindi, Tamil, Bengali',
      nmcNo: 'NMC/IITD/2026/77312'
    },
    {
      id: 'doc4',
      name: 'Dr. Arjun Shastri, BAMS, MD (Ay)',
      specialty: 'Ayurvedic Phytomedicine & Botanical AI',
      hospital: 'Lasavo AYUSH Innovation Hub',
      avatarImg: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      badge: 'AYUSH Certified',
      lang: 'English, Hindi, Sanskrit',
      nmcNo: 'AYUSH/IITD/2026/10982'
    }
  ];

  const medicinesData = [
    { id: 'm1', name: 'Paracetamol 650mg (Dolocare)', category: 'Fever & Pain Relief', price: 32, rxRequired: false, desc: 'Effective fever and mild to moderate pain reliever.' },
    { id: 'm2', name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 115, rxRequired: true, desc: 'Broad-spectrum antibiotic for bacterial infections.' },
    { id: 'm3', name: 'Multivitamin & Zinc Capsules (VitaShield)', category: 'Immunity & Supplements', price: 210, rxRequired: false, desc: 'Daily immunity booster with essential vitamins.' },
    { id: 'm4', name: 'Cetirizine 10mg', category: 'Allergy Relief', price: 45, rxRequired: false, desc: 'Provides quick relief from nasal congestion and sneezing.' },
    { id: 'm5', name: 'Ashwagandha Premium Mental Calm Blend', category: 'Mental Wellness', price: 350, rxRequired: false, desc: 'Ayurvedic adaptogen for stress reduction and calm focus.' }
  ];

  const labTestsData = [
    { id: 't1', title: 'Complete Blood Count (CBC) with ESR', fast: '10-12 Hrs Fasting', price: 399, OriginalPrice: 799, turnaround: 'Reports in 6 Hours', parameters: 28 },
    { id: 't2', title: 'Comprehensive Thyroid Profile (T3, T4, TSH)', fast: 'No Fasting Required', price: 549, OriginalPrice: 1100, turnaround: 'Reports in 12 Hours', parameters: 3 },
    { id: 't3', title: 'Full Body Health Checkup (IIT Delhi Certified)', fast: '12 Hrs Fasting Required', price: 1499, OriginalPrice: 2999, turnaround: 'Reports in 24 Hours', parameters: 64 },
    { id: 't4', title: 'HbA1c & Fasting Blood Sugar (Diabetes Screen)', fast: '10 Hrs Fasting', price: 450, OriginalPrice: 900, turnaround: 'Reports in 8 Hours', parameters: 2 }
  ];

  const botanicalPlants = [
    {
      id: 'p1',
      name: 'Ashwagandha (Withania somnifera)',
      sansKritName: 'अश्वगंधा',
      activeCompounds: ['Withanolide A', 'Withaferin A', 'Sitoindosides'],
      benefits: 'Stress reduction, cortisol lowering, neuroprotection, immune modulation',
      safetyRating: 'High Safety (Standard Dosage)',
      ayushCategory: 'Rasayana (Rejuvenative)',
      dosage: '300mg - 600mg daily (standardized extract)'
    },
    {
      id: 'p2',
      name: 'Turmeric / Haridra (Curcuma longa)',
      sansKritName: 'हरिद्रा',
      activeCompounds: ['Curcuminoids (Curcumin)', 'Turmerone', 'Zingiberene'],
      benefits: 'Potent anti-inflammatory, antioxidant, joint protection, digestive support',
      safetyRating: 'Very High Safety',
      ayushCategory: 'Varnya & Shothahara',
      dosage: '500mg - 1000mg with piperine'
    },
    {
      id: 'p3',
      name: 'Brahmi (Bacopa monnieri)',
      sansKritName: 'ब्राह्मी',
      activeCompounds: ['Bacoside A', 'Bacoside B', 'Hersaponin'],
      benefits: 'Cognitive enhancement, memory consolidation, anxiety reduction',
      safetyRating: 'High Safety',
      ayushCategory: 'Medhya Rasayana (Brain Tonic)',
      dosage: '300mg - 450mg standardized'
    },
    {
      id: 'p4',
      name: 'Tulsi / Holy Basil (Ocimum sanctum)',
      sansKritName: 'तुलसी',
      activeCompounds: ['Eugenol', 'Ursolic Acid', 'Rosmarinic Acid'],
      benefits: 'Respiratory relief, immunomodulation, anti-microbial action',
      safetyRating: 'Very High Safety',
      ayushCategory: 'Kaphahara & Shvasahara',
      dosage: '250mg - 500mg extract or fresh leaf tea'
    }
  ];

  const symptomList = [
    { id: 's1', label: 'High Fever (>100°F)', severity: 'High', category: 'General' },
    { id: 's2', label: 'Persistent Cough', severity: 'Moderate', category: 'Respiratory' },
    { id: 's3', label: 'Severe Headache / Migraine', severity: 'Moderate', category: 'Neurological' },
    { id: 's4', label: 'Chest Pain or Tightness', severity: 'Emergency', category: 'Cardiovascular' },
    { id: 's5', label: 'Skin Rash or Itching', severity: 'Low', category: 'Dermatology' },
    { id: 's6', label: 'Anxiety or Sleep Loss', severity: 'Moderate', category: 'Mental Health' },
    { id: 's7', label: 'Abdominal Cramps / Nausea', severity: 'Moderate', category: 'Digestive' }
  ];

  // Speech Synthesis Helper
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = { sender: 'patient', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setIsSpeaking(true);

    setTimeout(() => {
      let replyText = `Thank you. I have analyzed your query with our IIT Delhi clinical diagnostic protocols. `;
      if (currentInput.toLowerCase().includes('fever') || currentInput.toLowerCase().includes('headache')) {
        replyText += `For acute fever or mild headache, rest, oral hydration, and Paracetamol 650mg are standard first-line care. I have prepared an e-Prescription for you.`;
        generateDigitalRx(currentInput, 'Paracetamol 650mg TDS (3 days)');
      } else if (currentInput.toLowerCase().includes('stress') || currentInput.toLowerCase().includes('anxiety')) {
        replyText += `I recommend trying our Video Psychology Avatar session under Mental Wellness for structured CBT reflection.`;
      } else {
        replyText += `I have logged your clinical notes. You can view your verified e-Prescription or book home sample collection.`;
        generateDigitalRx(currentInput, 'Multivitamin & Hydration Supplement');
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'doctor', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      speakText(replyText);
    }, 1400);
  };

  const generateDigitalRx = (complaint, medName) => {
    setGeneratedRx({
      id: `RX-IITD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctorName: activeAvatar.name,
      doctorNmc: activeAvatar.nmcNo,
      specialty: activeAvatar.specialty,
      chiefComplaint: complaint,
      medicines: [
        { name: medName, dosage: '1-0-1 (After Food)', duration: '3 Days', instructions: 'Take with warm water' },
        { name: 'ORS / Hydration Electrolyte Powder', dosage: 'As needed', duration: '5 Days', instructions: 'Dissolve 1 sachet in 1L water' }
      ],
      qrCodeData: 'VERIFIED-IIT-DELHI-LASAVO-TELEHEALTH-2026'
    });
    setConsultationStatus('Rx Generated');
  };

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.find((s) => s.id === symptom.id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const runSymptomTriage = () => {
    if (selectedSymptoms.length === 0) return;
    const hasEmergency = selectedSymptoms.some((s) => s.severity === 'Emergency');
    const hasHigh = selectedSymptoms.some((s) => s.severity === 'High');

    let triage = {
      level: hasEmergency ? 'Emergency Alert' : hasHigh ? 'Urgent AI Consultation Recommended' : 'Routine Care',
      color: hasEmergency ? 'red' : hasHigh ? 'amber' : 'emerald',
      advice: hasEmergency
        ? 'Please seek immediate physical emergency medical care or call 108. AI Doctor Avatar is standby for preliminary triage.'
        : 'Connect with Dr. Ananya Sharma on the AI Doctor Avatar console for immediate digital prescription.',
      suggestedAvatar: hasEmergency ? 'Dr. Rajesh Verma (Cardiology)' : 'Dr. Ananya Sharma (General Medicine)'
    };
    setTriageResult(triage);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto w-full pb-16 text-slate-100 font-sans">
      
      {/* Top Header & Partnership Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-indigo-950 p-6 md:p-8 border border-teal-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                Official Partnership • Lasavo Pvt Ltd & IIT Delhi
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold px-3 py-1 rounded-full">
                Pan-India Telemedicine Platform
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Lasavo AI Doctor & Tele-Consultation Suite
            </h1>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Serving citizens across 28 States & 8 Union Territories. Consult realistic 24/7 AI Doctor Avatars without physical doctor presence. Features instant NMC telemedicine digital prescriptions, video psychology avatars, e-pharmacy delivery, and AYUSH phytomedicine ingredient analysis.
            </p>
          </div>

          {/* Right Language & Quick Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-teal-300 font-bold text-xs rounded-2xl px-4 py-3 outline-none"
            >
              <option value="English">🌐 English</option>
              <option value="Hindi">🌐 हिंदी (Hindi)</option>
              <option value="Hinglish">🌐 Hinglish</option>
              <option value="Tamil">🌐 தமிழ் (Tamil)</option>
              <option value="Telugu">🌐 తెలుగు (Telugu)</option>
              <option value="Gujarati">🌐 ગુજરાતી (Gujarati)</option>
            </select>

            <button
              onClick={() => setShowSymptomModal(true)}
              className="bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs shadow-lg shadow-teal-500/25 transition active:scale-95 text-center"
            >
              🩺 AI Symptom Checker
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        <button
          onClick={() => setActiveTab('teleconsult')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
            activeTab === 'teleconsult'
              ? 'bg-gradient-to-br from-teal-950/90 to-slate-900 border-teal-500/60 shadow-lg shadow-teal-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl">👩‍⚕️</span>
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
              Primary
            </span>
          </div>
          <div>
            <h3 className={`font-extrabold text-xs ${activeTab === 'teleconsult' ? 'text-white' : 'text-slate-300'}`}>AI Doctor Consultation</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">24/7 Realistic Avatars</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('mentalwellness')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
            activeTab === 'mentalwellness'
              ? 'bg-gradient-to-br from-indigo-950/90 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl">🧠</span>
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Service 1
            </span>
          </div>
          <div>
            <h3 className={`font-extrabold text-xs ${activeTab === 'mentalwellness' ? 'text-white' : 'text-slate-300'}`}>Mental Wellness</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Video Psychology Avatar</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('pharma')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
            activeTab === 'pharma'
              ? 'bg-gradient-to-br from-emerald-950/90 to-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl">💊</span>
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Service 2
            </span>
          </div>
          <div>
            <h3 className={`font-extrabold text-xs ${activeTab === 'pharma' ? 'text-white' : 'text-slate-300'}`}>E-Pharmacy & Rx</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Doorstep Pan-India Medicine</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('labtests')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
            activeTab === 'labtests'
              ? 'bg-gradient-to-br from-amber-950/90 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl">🔬</span>
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              Service 3
            </span>
          </div>
          <div>
            <h3 className={`font-extrabold text-xs ${activeTab === 'labtests' ? 'text-white' : 'text-slate-300'}`}>Lab Diagnostic Booking</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Home Sample Collection</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('botanical')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 col-span-2 sm:col-span-1 ${
            activeTab === 'botanical'
              ? 'bg-gradient-to-br from-green-950/90 to-slate-900 border-green-500/60 shadow-lg shadow-green-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl">🌿</span>
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-green-500/20 text-green-300">
              Phytomedicine
            </span>
          </div>
          <div>
            <h3 className={`font-extrabold text-xs ${activeTab === 'botanical' ? 'text-white' : 'text-slate-300'}`}>Botanical Phytomedicine</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Plant Ingredient AI</p>
          </div>
        </button>

      </div>

      {/* TAB 0: AI Doctor Avatar & Consultation Studio */}
      {activeTab === 'teleconsult' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Avatar Roster */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>👨‍⚕️ Available AI Doctor Avatars</span>
                </h3>
                <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20">
                  IIT-D Validated
                </span>
              </div>

              <div className="space-y-3">
                {doctorsList.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setActiveAvatar(doc)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center space-x-3 ${
                      activeAvatar.name === doc.name
                        ? 'bg-teal-950/50 border-teal-500/60 ring-1 ring-teal-500/40 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                      <img src={doc.avatarImg} alt={doc.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{doc.name}</h4>
                      <p className="text-[11px] text-teal-400 font-semibold truncate">{doc.specialty}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{doc.hospital}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Digital Prescription Box */}
            {generatedRx && (
              <div className="bg-gradient-to-br from-teal-950/80 to-slate-950 p-5 rounded-3xl border border-teal-500/40 space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-teal-300">✅ Digital e-Prescription Ready</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-teal-400 px-2 py-0.5 rounded">{generatedRx.id}</span>
                </div>
                <p className="text-xs text-slate-300">
                  Prescribed by <strong className="text-white">{generatedRx.doctorName}</strong> for <em className="text-teal-300">"{generatedRx.chiefComplaint}"</em>
                </p>
                <button
                  onClick={() => setShowRxModal(true)}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition shadow-lg"
                >
                  📄 View & Download Prescription
                </button>
              </div>
            )}
          </div>

          {/* Right Live Video Avatar Console & Interactive Chat */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Header */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl overflow-hidden border border-teal-500/40">
                    <img src={activeAvatar.avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white">{activeAvatar.name}</h3>
                    <p className="text-[10px] text-teal-400 font-semibold">{activeAvatar.specialty} • NMC Reg: {activeAvatar.nmcNo}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${
                      voiceEnabled ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {voiceEnabled ? '🔊 AI Voice ON' : '🔇 AI Voice Muted'}
                  </button>

                  <span className="flex items-center gap-1.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Video Stream
                  </span>
                </div>
              </div>

              {/* Video Screen */}
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={activeAvatar.avatarImg}
                  alt="Doctor Stream"
                  className={`w-full h-full object-cover filter brightness-95 transition duration-500 ${
                    isSpeaking ? 'scale-105 filter brightness-110' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none"></div>

                <div className="absolute top-4 left-4 flex flex-col space-y-1">
                  <span className="bg-slate-900/80 backdrop-blur text-[10px] text-slate-300 font-mono px-2.5 py-1 rounded-lg border border-slate-700/60">
                    LATENCY: 38ms • IIT-D CLINICAL ENGINE
                  </span>
                </div>

                {isSpeaking && (
                  <div className="absolute bottom-6 flex items-end space-x-1.5 h-8 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-2xl border border-teal-500/40">
                    <span className="w-1 bg-teal-400 h-6 animate-pulse"></span>
                    <span className="w-1 bg-teal-300 h-4 animate-bounce"></span>
                    <span className="w-1 bg-teal-500 h-7 animate-pulse"></span>
                    <span className="text-[10px] text-teal-300 font-bold ml-2">AI Doctor Speaking...</span>
                  </div>
                )}
              </div>

              {/* Consultation Messages */}
              <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-950/70 border-t border-slate-800">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      m.sender === 'patient' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'patient'
                          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-br-none shadow-lg'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-2xl transition border ${
                    isRecording
                      ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                  title="Voice Input"
                >
                  🎙️
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Describe your health symptoms (e.g. fever, headache, indigestion)..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-teal-500 text-white text-xs rounded-2xl px-4 py-3 outline-none"
                />

                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs shadow-lg shadow-teal-500/20 transition active:scale-95"
                >
                  Send 🚀
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 1: Service 1 - Mental Wellness Video Psychology Avatar */}
      {activeTab === 'mentalwellness' && (
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                Service 1 • Mental Wellness Avatar
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                Video Psychology Avatar & AI Emotional Therapy Studio
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Converse in real-time with Dr. Kavita Menon, your 24/7 AI Psychology Avatar. Confidential CBT therapy, stress management, and emotional wellness guidance.
              </p>
            </div>

            <button
              onClick={() => setSessionActive(!sessionActive)}
              className={`px-6 py-3 rounded-2xl font-black text-xs transition shadow-lg ${
                sessionActive
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30 hover:opacity-95'
              }`}
            >
              {sessionActive ? 'End Therapy Session' : '🧠 Start Video Psychology Session'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5">
              <h3 className="text-sm font-extrabold text-white">Daily Emotional Check-in</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>How are you feeling today?</span>
                  <span className="text-indigo-400 font-black">{moodRating}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodRating}
                  onChange={(e) => setMoodRating(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Therapy Technique Selected</label>
                <select
                  value={therapyType}
                  onChange={(e) => setTherapyType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-3 outline-none"
                >
                  <option>Cognitive Behavioral Therapy (CBT)</option>
                  <option>Mindfulness & Breathwork</option>
                  <option>Stress & Work Burnout Counseling</option>
                  <option>Sleep Hygiene & Insomnia Guidance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Guided Reflection Notes</label>
                <textarea
                  rows="3"
                  value={wellnessNotes}
                  onChange={(e) => setWellnessNotes(e.target.value)}
                  placeholder="Express your thoughts or concerns here..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl p-3 text-xs text-white outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1594824813566-818a4d4681fb?auto=format&fit=crop&q=80&w=800"
                  alt="Psychology Avatar"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur p-3.5 rounded-2xl border border-indigo-500/30 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-extrabold text-white">Dr. Kavita Menon (AI Psychology Avatar)</h4>
                    <p className="text-[10px] text-indigo-300">IIT Delhi Neuro-Behavioral AI Model</p>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/40">
                    {sessionActive ? 'Session Live' : 'Ready to Connect'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>🔒 100% Encrypted & Confidential</span>
                <span>Supported in 12+ Indian Languages</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Service 2 - E-Pharmacy & Online Medicine Delivery */}
      {activeTab === 'pharma' && (
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                Service 2 • E-Pharmacy Service
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                Pan-India Express Online Pharmacy & Prescription Fulfilment
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Order genuine prescribed medicines, OTC healthcare supplies, and Ayurvedic wellness products with fast doorstep delivery across India.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-extrabold text-emerald-400">
                🛒 Cart Items: {cart.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-8 space-y-4">
              <input
                type="text"
                placeholder="Search medicines, health products..."
                value={searchRx}
                onChange={(e) => setSearchRx(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-white text-xs rounded-2xl px-4 py-3.5 outline-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {medicinesData
                  .filter((m) => m.name.toLowerCase().includes(searchRx.toLowerCase()) || m.category.toLowerCase().includes(searchRx.toLowerCase()))
                  .map((med) => (
                    <div key={med.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {med.category}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-1">{med.name}</h4>
                        </div>
                        <span className="text-xs font-black text-emerald-400">₹{med.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{med.desc}</p>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                        <span className="text-[9px] text-slate-400">
                          {med.rxRequired ? '⚠️ Rx Required' : '✅ OTC Available'}
                        </span>
                        <button
                          onClick={() => setCart([...cart, med])}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl text-[11px] transition active:scale-95"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
                <span>📄 Delivery Summary</span>
              </h3>

              <div className="space-y-2 text-xs">
                {cart.map((c, i) => (
                  <div key={i} className="flex justify-between border-b border-slate-800 pb-1.5 text-slate-300">
                    <span>{c.name}</span>
                    <span className="font-bold text-emerald-400">₹{c.price}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                <span>Total:</span>
                <span className="text-emerald-400">₹{cart.reduce((a, b) => a + b.price, 0)}</span>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition shadow-lg shadow-emerald-500/20">
                Proceed to Pay & Ship (Pan-India)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Service 3 - Diagnostic Lab Test Booking */}
      {activeTab === 'labtests' && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                Service 3 • Diagnostic Services
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                Home Diagnostic Sample Collection & Lab Test Booking
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Book certified lab diagnostic packages with trained phlebotomist home visit across all major Indian cities. NABL & IIT-D Certified Labs.
              </p>
            </div>

            {bookingConfirmed && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold px-4 py-2 rounded-xl">
                ✅ Home Collection Booked Successfully!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labTestsData.map((test) => (
              <div key={test.id} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-white">{test.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-medium">
                        {test.fast}
                      </span>
                      <span className="text-[10px] text-slate-400">• {test.parameters} Test Parameters</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-400 block">₹{test.price}</span>
                    <span className="text-[10px] text-slate-500 line-through">₹{test.OriginalPrice}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400">⏱️ {test.turnaround}</span>
                  <button
                    onClick={() => {
                      setSelectedLabTest(test);
                      setBookingConfirmed(true);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs transition active:scale-95"
                  >
                    Book Home Collection 🏠
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Botanical & Phytomedicine Ingredient Analyzer (Specialized AI Engine) */}
      {activeTab === 'botanical' && (
        <div className="bg-slate-900/90 border border-green-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="bg-green-500/20 text-green-300 border border-green-500/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                Phytomedicine AI • AYUSH Ingredient Inspector
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                Botanical & Herbal Ingredient Active Compound Analyzer
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                AI Phytomedicine engine co-developed with IIT Delhi for analyzing bioactive compounds, AYUSH regulatory compliance, and herb-drug safety interactions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Plant List */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Select Botanical Extract</h3>
              <div className="space-y-3">
                {botanicalPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      selectedPlant?.name === plant.name
                        ? 'bg-green-950/60 border-green-500/60 ring-1 ring-green-500/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-white">{plant.name}</h4>
                      <span className="text-xs text-green-400 font-serif font-bold">{plant.sansKritName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{plant.ayushCategory}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plant Active Details */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5">
              {selectedPlant ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{selectedPlant.name}</h3>
                      <p className="text-xs text-green-400 font-semibold">{selectedPlant.sansKritName} • {selectedPlant.ayushCategory}</p>
                    </div>
                    <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-500/30">
                      {selectedPlant.safetyRating}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-slate-300">Active Bioactive Compounds Identified:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedPlant.activeCompounds.map((comp, idx) => (
                        <span key={idx} className="bg-slate-900 text-green-300 border border-green-500/30 text-xs px-3 py-1 rounded-xl font-mono font-bold">
                          🔬 {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-300">Therapeutic Pharmacological Action:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedPlant.benefits}</p>
                  </div>

                  <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                    <h4 className="text-xs font-extrabold text-teal-400">Standardized Therapeutic Dosage:</h4>
                    <p className="text-xs text-slate-300 font-mono">{selectedPlant.dosage}</p>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                  <span className="text-4xl">🌿</span>
                  <p className="text-xs font-bold">Select any medicinal plant extract on the left to analyze bioactive compounds.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: Verified Digital e-Prescription Modal */}
      {showRxModal && generatedRx && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            
            <button
              onClick={() => setShowRxModal(false)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>

            <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
              <div>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-teal-500/30">
                  NMC Telemedicine Guidelines 2020 Compliant
                </span>
                <h3 className="text-base font-extrabold text-white mt-1">Official Digital Tele-Health e-Prescription</h3>
                <p className="text-[11px] text-slate-400">Lasavo Private Limited • IIT Delhi Tech Innovation Hub</p>
              </div>
              <span className="text-xs font-mono font-bold text-teal-400">{generatedRx.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Prescribing Doctor</span>
                <span className="font-bold text-white">{generatedRx.doctorName}</span>
                <span className="text-[10px] text-teal-400 block">{generatedRx.specialty}</span>
                <span className="text-[10px] text-slate-400 block font-mono">Reg: {generatedRx.doctorNmc}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Date of Consultation</span>
                <span className="font-bold text-white">{generatedRx.date}</span>
                <span className="text-[10px] text-emerald-400 block mt-1">✅ Cryptographically Verified</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-300">Rx Medicines Prescribed:</h4>
              <div className="space-y-2">
                {generatedRx.medicines.map((med, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white block">{idx + 1}. {med.name}</span>
                      <span className="text-[10px] text-slate-400">{med.instructions}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-teal-400 font-extrabold block">{med.dosage}</span>
                      <span className="text-[10px] text-slate-500">{med.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowRxModal(false);
                  setActiveTab('pharma');
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow"
              >
                🛒 Fulfill Medicines via E-Pharmacy
              </button>
              <button
                onClick={() => alert('e-Prescription PDF downloaded successfully.')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                📥 Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Interactive AI Symptom Checker Modal */}
      {showSymptomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            
            <button
              onClick={() => setShowSymptomModal(false)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>

            <div>
              <span className="bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-teal-500/30">
                IIT Delhi Clinical Triage AI
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">Interactive AI Symptom Checker</h3>
              <p className="text-xs text-slate-400">Select any symptoms you are currently experiencing:</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {symptomList.map((sym) => {
                const isSelected = selectedSymptoms.some((s) => s.id === sym.id);
                return (
                  <button
                    key={sym.id}
                    onClick={() => toggleSymptom(sym)}
                    className={`p-3 rounded-2xl border text-left text-xs transition ${
                      isSelected
                        ? 'bg-teal-950 border-teal-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{sym.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={runSymptomTriage}
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-lg transition"
            >
              Run Clinical AI Triage Assessment
            </button>

            {triageResult && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-teal-500/30 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-teal-300">Triage Result:</span>
                  <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold">{triageResult.level}</span>
                </div>
                <p className="text-slate-300">{triageResult.advice}</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
