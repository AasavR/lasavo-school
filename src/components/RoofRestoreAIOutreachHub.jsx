import React, { useState, useEffect } from 'react';
import { LeadEnrichmentAgent } from '../../agents/lead_enrichment_agent.js';
import { PhoneOutreachAgent } from '../../agents/phone_outreach_agent.js';
import { EmailOutreachAgent } from '../../agents/email_outreach_agent.js';
import { OperationsEscalationAgent } from '../../agents/operations_escalation_agent.js';
import { callAIModel } from '../services/aiModelService.js';
import APIKeyModal from './APIKeyModal.jsx';

export default function RoofRestoreAIOutreachHub() {
  const [activeTab, setActiveTab] = useState('command-center'); // 'command-center' | 'gis-leads' | 'phone-sim' | 'email-cadence' | 'escalations-eod' | 'ai-playground'
  const [selectedCounty, setSelectedCounty] = useState('Hillsborough County');
  const [selectedTerritoryTier, setSelectedTerritoryTier] = useState('all');

  // AI Model Key State
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [aiProvider, setAiProvider] = useState(localStorage.getItem('lasavo_ai_provider') || 'kimi');
  const [playgroundPrompt, setPlaygroundPrompt] = useState('Draft an aggressive cold email pitch for a 80,000 sq ft industrial warehouse in Manchester NH offering elastomeric roof coating vs $400k tear-off.');
  const [playgroundResult, setPlaygroundResult] = useState('');
  const [isQueryingAI, setIsQueryingAI] = useState(false);

  // Agent State
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, time: '09:00 AM', agent: 'Operations Manager', message: 'Workforce initialized for RoofRestore5x ME/NH campaign.', type: 'info' },
    { id: 2, time: '09:02 AM', agent: 'Lead Enricher', message: 'Scanned 14 GIS parcels in Hillsborough County (NH) > 20,000 sq ft.', type: 'success' },
    { id: 3, time: '09:15 AM', agent: 'Phone Voice Agent', message: 'Completed cold call to Gateway Industrial. Audit booked for Thursday 10am.', type: 'success' },
    { id: 4, time: '09:30 AM', agent: 'Escalation Agent', message: 'ALERT: Casco Bay Cold Storage ($210,000) escalated to Founder Aasav Ravi.', type: 'warning' }
  ]);

  // Data Collections
  const [enrichedLeads, setEnrichedLeads] = useState([]);
  const [phoneSimState, setPhoneSimState] = useState({
    activeCall: false,
    contactName: 'Marcus Vance',
    company: 'Gateway Industrial Logistics LLC',
    city: 'Nashua, NH',
    sqFt: 65000,
    objection: 'Tear-off Preference',
    currentScript: '',
    transcript: [],
    auditBooked: false
  });

  const [emailTemplate, setEmailTemplate] = useState('templateA');
  const [emailDispatches, setEmailDispatches] = useState([]);
  const [eodReportText, setEodReportText] = useState('');
  const [dealCalculatorValue, setDealCalculatorValue] = useState(200000);

  // Initialize data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const leadAgent = new LeadEnrichmentAgent();
    const leads = await leadAgent.enrichLeadsForCounty('Hillsborough County');
    const meLeads = await leadAgent.enrichLeadsForCounty('Cumberland County');
    const combined = [...leads, ...meLeads];
    setEnrichedLeads(combined);

    const emailAgent = new EmailOutreachAgent();
    const dispatches = await emailAgent.dispatchEmailBatch(combined);
    setEmailDispatches(dispatches);

    const opsAgent = new OperationsEscalationAgent();
    const report = opsAgent.generateDailyEODReport();
    setEodReportText(report);
  };

  const addLog = (agent, message, type = 'info') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAgentLogs(prev => [{ id: Date.now(), time: timeStr, agent, message, type }, ...prev]);
  };

  const handleQueryAIPlayground = async () => {
    if (!playgroundPrompt.trim()) return;
    setIsQueryingAI(true);
    setPlaygroundResult(`[${aiProvider.toUpperCase()} AI Querying...]`);
    try {
      const res = await callAIModel({
        prompt: playgroundPrompt,
        systemPrompt: 'You are an elite AI Sales SDR & Lead Generation Agent for Commercial Roof Restoration.'
      });
      setPlaygroundResult(res);
      addLog('AI Agent Workbench', `Executed live AI prompt via ${aiProvider.toUpperCase()} model`, 'success');
    } catch (err) {
      setPlaygroundResult('Error: ' + err.message);
    } finally {
      setIsQueryingAI(false);
    }
  };

  const handleRunFullOutreachCycle = async () => {
    setIsAgentRunning(true);
    addLog('System', 'Starting automated outreach cycle for ME & NH territories...', 'info');

    setTimeout(() => {
      addLog('Lead Scraper', 'GIS Audit complete: Scraped 25 commercial parcels exceeding 20,000 sq ft.', 'success');
    }, 800);

    setTimeout(() => {
      addLog('Phone Voice Agent', 'Executed 40 direct calls. 18 live conversations completed, 2 Audits Booked.', 'success');
    }, 1800);

    setTimeout(() => {
      addLog('Email Agent', 'Sent 60 personalized email sequences using Templates A & B.', 'info');
    }, 2800);

    setTimeout(() => {
      addLog('Escalation Manager', 'HIGH TICKET ALERT: Escalated $210k Casco Bay Cold Storage deal to Aasav Ravi.', 'warning');
      setIsAgentRunning(false);
    }, 3800);
  };

  const handleStartCallSimulation = () => {
    const phoneAgent = new PhoneOutreachAgent();
    const script = phoneAgent.getOpeningScript(phoneSimState.contactName, phoneSimState.company, 'Route 3 Corridor');
    
    setPhoneSimState(prev => ({
      ...prev,
      activeCall: true,
      currentScript: script,
      transcript: [
        { sender: 'AI Agent', text: script, time: '00:05' }
      ],
      auditBooked: false
    }));
  };

  const handleObjectionClick = (objectionType) => {
    const phoneAgent = new PhoneOutreachAgent();
    const objData = phoneAgent.handleObjection(objectionType);

    setPhoneSimState(prev => ({
      ...prev,
      currentScript: objData.scriptResponse,
      transcript: [
        ...prev.transcript,
        { sender: 'Prospect', text: objData.objection, time: '00:32' },
        { sender: 'AI Agent', text: objData.scriptResponse, time: '00:45' }
      ]
    }));
  };

  const handleBookAuditSim = () => {
    setPhoneSimState(prev => ({
      ...prev,
      auditBooked: true,
      transcript: [
        ...prev.transcript,
        { sender: 'Prospect', text: 'That OpEx categorization sounds compelling. Let’s schedule the thermal moisture audit for Thursday.', time: '01:10' },
        { sender: 'AI Agent', text: 'Fantastic! I’ve scheduled our senior engineer for Thursday at 10:00 AM. Confirmation sent to your email.', time: '01:15' }
      ]
    }));
    addLog('Phone Voice Agent', `Audit Booked with ${phoneSimState.company} (${phoneSimState.contactName})`, 'success');
  };

  // Territory priority filtered leads
  const filteredLeads = enrichedLeads.filter(lead => {
    if (selectedTerritoryTier === 'all') return true;
    return lead.priorityLevel === parseInt(selectedTerritoryTier);
  });

  // Calculate earnings for deal calculator
  const calcIntakeFee = 100;
  const calcRate = dealCalculatorValue >= 200000 ? 0.10 : 0.07;
  const calcCommission = Math.round(dealCalculatorValue * calcRate);
  const calcTotalEarnings = calcIntakeFee + calcCommission;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                RoofRestore5x Venture SOP System
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Active Workforce
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Lasavo Commercial AI Outreach Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Autonomous Sales Workforce for Commercial Flat Roof Restoration (Maine & New Hampshire) • Founder: <strong className="text-indigo-300">Aasav Ravi</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsApiKeyOpen(true)}
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs font-bold text-slate-200 shadow-md transition flex items-center space-x-2 active:scale-95"
            >
              <span className="text-amber-400">🤖</span>
              <span>AI Engine: {aiProvider === 'kimi' ? 'Kimi K3 (Moonshot)' : aiProvider === 'openrouter' ? 'OpenRouter Free' : 'Gemini 2.5 Flash'}</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded uppercase">Config Key</span>
            </button>

            <button
              onClick={handleRunFullOutreachCycle}
              disabled={isAgentRunning}
              className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-xl flex items-center gap-2 transition transform active:scale-95 ${
                isAgentRunning
                  ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 cursor-wait'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isAgentRunning ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running SOP Outreach Cycle...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trigger SOP Outreach Cycle
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top KPI Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Daily Lead Goal</div>
            <div className="text-xl font-bold text-white mt-1">28 / 25 <span className="text-emerald-400 text-xs font-normal ml-1">112%</span></div>
            <div className="text-slate-500 text-[11px] mt-0.5">Verified Contacts Logged</div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Cold Calls Dispatched</div>
            <div className="text-xl font-bold text-white mt-1">44 / 40 <span className="text-emerald-400 text-xs font-normal ml-1">110%</span></div>
            <div className="text-slate-500 text-[11px] mt-0.5">18 Live Conversations</div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Emails Sent</div>
            <div className="text-xl font-bold text-white mt-1">65 / 60 <span className="text-emerald-400 text-xs font-normal ml-1">108%</span></div>
            <div className="text-slate-500 text-[11px] mt-0.5">19.2% Open • 4.8% Reply</div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Audits Booked Today</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">2 Audits <span className="text-emerald-400 text-xs font-normal ml-1">200%</span></div>
            <div className="text-slate-500 text-[11px] mt-0.5">$295,000 Pipeline Value</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('command-center')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'command-center'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          ⚡ Outreach Command Center
        </button>

        <button
          onClick={() => setActiveTab('gis-leads')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'gis-leads'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          🔍 SOP 1: Lead Identification & GIS
        </button>

        <button
          onClick={() => setActiveTab('phone-sim')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'phone-sim'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          📞 SOP 2: Phone & Objection Simulator
        </button>

        <button
          onClick={() => setActiveTab('email-cadence')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'email-cadence'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          ✉️ SOP 3: Email Personalization
        </button>

        <button
          onClick={() => setActiveTab('escalations-eod')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'escalations-eod'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          🚨 SOP 4 & 6: Escalations & EOD Reports
        </button>

        <button
          onClick={() => setActiveTab('ai-playground')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
            activeTab === 'ai-playground'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30'
              : 'text-amber-400 hover:text-amber-200 hover:bg-slate-900 border border-amber-500/20'
          }`}
        >
          🤖 SOP 5: AI Model Workbench (Kimi / Free API)
        </button>
      </div>

      {/* TAB 1: COMMAND CENTER */}
      {activeTab === 'command-center' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: 4 Dedicated Agent Status Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> Deployed AI Agent Workforce
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Agent 1 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                    GIS
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[11px] font-semibold">
                    SOP 1 Active
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">Lead Scraper & SOS Verification Agent</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Scans Hillsborough, Rockingham & Cumberland County GIS databases for roof footprints {'>'} 20,000 sq ft.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                  <span>Enriched Today: <strong className="text-white">28 Leads</strong></span>
                  <span className="text-indigo-400">100% Sos Matched</span>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                    TEL
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[11px] font-semibold">
                    SOP 2 Active
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">Phone Cadence Voice Agent</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Executes 40-50 cold calls daily along Route 3/I-93 corridors. Counters tear-off vs liquid restoration objections.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                  <span>Calls Dispatched: <strong className="text-white">44 Calls</strong></span>
                  <span className="text-purple-400">2 Audits Booked</span>
                </div>
              </div>

              {/* Agent 3 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg">
                    EML
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[11px] font-semibold">
                    SOP 3 Active
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">Email Cadence & Personalization</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Generates & sends Templates A & B. Offers 10-minute briefing & complimentary thermal moisture scans.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                  <span>Sent Today: <strong className="text-white">65 Emails</strong></span>
                  <span className="text-pink-400">19.2% Open Rate</span>
                </div>
              </div>

              {/* Agent 4 */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    OPS
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md text-[11px] font-semibold">
                    Escalation Watch
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">Operations & Escalation Agent</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Monitors KPIs, auto-escalates deals {'>'} $150,000 to Aasav Ravi, and generates 5:00 PM EST daily EOD summary.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                  <span>Deals Escalated: <strong className="text-amber-300">1 Deal ($210k)</strong></span>
                  <span className="text-amber-400">EOD Ready</span>
                </div>
              </div>
            </div>

            {/* Territory Priority Matrix Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-6">
              <h3 className="font-bold text-white text-base mb-4 flex items-center justify-between">
                <span>Territory Priority Mapping & Targeting Strategy</span>
                <span className="text-xs text-indigo-400 font-normal">SOP Section 2 Matrix</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-indigo-500/30 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Priority Level 1</div>
                    <div className="text-sm font-semibold text-white mt-0.5">Greater Manchester & Nashua, NH</div>
                    <div className="text-xs text-slate-400 mt-0.5">Industrial parks, logistics, manufacturing along Route 3 / I-93</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">$75,000 - $250,000+</div>
                    <div className="text-[11px] text-slate-400">Phone Outreach</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Priority Level 2</div>
                    <div className="text-sm font-semibold text-white mt-0.5">Greater Portland Metro, ME</div>
                    <div className="text-xs text-slate-400 mt-0.5">Cold storage, marine distribution, commercial office portfolios</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">$50,000 - $200,000+</div>
                    <div className="text-[11px] text-slate-400">Email Cadence</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">Priority Level 3</div>
                    <div className="text-sm font-semibold text-white mt-0.5">NH/ME Seacoast Region (Portsmouth, Dover, Kittery)</div>
                    <div className="text-xs text-slate-400 mt-0.5">Coastal corporate hubs, hospitality groups, tech flex spaces</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">$45,000 - $150,000</div>
                    <div className="text-[11px] text-slate-400">Hybrid Phone/Email</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority Level 4</div>
                    <div className="text-sm font-semibold text-white mt-0.5">Lewiston – Auburn & Central Maine</div>
                    <div className="text-xs text-slate-400 mt-0.5">Repurposed textile mills, distribution centers, regional retail plazas</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">$20,000 - $130,000</div>
                    <div className="text-[11px] text-slate-400">Direct Phone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live AI Log Feed Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-bold text-white text-base mb-4 flex items-center justify-between">
              <span>Live Telemetry Stream</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>

            <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-y-auto max-h-[500px] space-y-3 font-mono text-xs">
              {agentLogs.map((log) => (
                <div key={log.id} className="border-b border-slate-900 pb-2.5 last:border-0">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
                    <span className="font-bold text-indigo-400">{log.agent}</span>
                    <span>{log.time}</span>
                  </div>
                  <p className={`leading-relaxed ${
                    log.type === 'warning' ? 'text-amber-300' : log.type === 'success' ? 'text-emerald-300' : 'text-slate-300'
                  }`}>
                    {log.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Manual Quick Action Box */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => addLog('Operations Agent', 'Initiated manual database sync with Lasavo CRM.', 'info')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
              >
                🔄 Sync Live Pipeline to CRM
              </button>
              <button
                onClick={() => addLog('Escalation Agent', 'Sent daily SMS alert to Founder Aasav Ravi.', 'warning')}
                className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition"
              >
                📲 Ping Executive Lead (Aasav Ravi)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOP 1 - LEAD IDENTIFICATION & GIS */}
      {activeTab === 'gis-leads' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">SOP 1: Lead Identification & Data Enrichment</h2>
              <p className="text-slate-400 text-xs mt-1">
                Scan GIS tax assessor parcel data for commercial roofs {'>'} 20,000 sq ft & verify Secretary of State title matching.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedTerritoryTier}
                onChange={(e) => setSelectedTerritoryTier(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Territory Priorities</option>
                <option value="1">Priority 1: Manchester/Nashua (NH)</option>
                <option value="2">Priority 2: Greater Portland (ME)</option>
                <option value="3">Priority 3: NH/ME Seacoast</option>
                <option value="4">Priority 4: Central ME</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      lead.priorityLevel === 1 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                      lead.priorityLevel === 2 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    }`}>
                      Priority Level {lead.priorityLevel}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{lead.parcelData.parcelId}</span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">{lead.parcelData.ownerLLC}</h3>
                  <p className="text-slate-400 text-xs mt-1">{lead.parcelData.address}, {lead.parcelData.city}, {lead.parcelData.state}</p>

                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Roof Area Footprint:</span>
                      <strong className="text-white">{lead.parcelData.roofSqFt.toLocaleString()} sq ft</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Existing Membrane:</span>
                      <strong className="text-indigo-300">{lead.parcelData.roofType}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Contract Value:</span>
                      <strong className="text-emerald-400">${lead.estimatedDealValue.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Savings vs Tear-off:</span>
                      <strong className="text-emerald-400">${lead.savingsVsTearoff.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Contact Scraping Details */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Verified Contact Profile</div>
                    {lead.contacts.map((c, i) => (
                      <div key={i} className="text-xs space-y-0.5 mb-2 last:mb-0">
                        <div className="font-bold text-slate-200">{c.fullName}</div>
                        <div className="text-slate-400 text-[11px]">{c.title}</div>
                        <div className="text-indigo-400 text-[11px] font-mono">{c.phone} • {c.email}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> SOS Active & Verified
                  </span>
                  <button className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 rounded-lg font-semibold transition">
                    Push to CRM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOP 2 - PHONE & OBJECTION SIMULATOR */}
      {activeTab === 'phone-sim' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">SOP 2: Phone Outreach & Objection Handling</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Cold calling framework along Route 3 / I-93 corridors. Target daily volume: 40-50 direct calls.
                </p>
              </div>

              {!phoneSimState.activeCall ? (
                <button
                  onClick={handleStartCallSimulation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Simulate Cold Call
                </button>
              ) : (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> Call In Progress
                </div>
              )}
            </div>

            {/* Prospect Call Header */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="text-xs text-slate-400">Target Contact</div>
                <div className="text-base font-bold text-white">{phoneSimState.contactName}</div>
                <div className="text-xs text-indigo-300">{phoneSimState.company} ({phoneSimState.city})</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Roof Sq Footage</div>
                <div className="text-sm font-bold text-white">{phoneSimState.sqFt.toLocaleString()} sq ft</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Target Corridor</div>
                <div className="text-sm font-bold text-purple-300">Route 3 / I-93 Corridor</div>
              </div>
            </div>

            {/* Live Audio Transcript Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 h-80 overflow-y-auto space-y-4 font-sans text-sm mb-6">
              {!phoneSimState.activeCall ? (
                <div className="text-center text-slate-500 py-24">
                  Click <strong className="text-emerald-400">Simulate Cold Call</strong> above to test the SOP 2 cold call framework and real-time objection handling.
                </div>
              ) : (
                phoneSimState.transcript.map((item, idx) => (
                  <div key={idx} className={`flex ${item.sender === 'AI Agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      item.sender === 'AI Agent'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                    }`}>
                      <div className="text-[10px] opacity-75 font-semibold mb-1">{item.sender} • {item.time}</div>
                      {item.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Interactive Objection Trigger Buttons */}
            {phoneSimState.activeCall && !phoneSimState.auditBooked && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Objection Handling Script:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleObjectionClick('tear off')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-medium transition"
                  >
                    💬 Objection 1: "We do full tear-off replacements"
                  </button>

                  <button
                    onClick={() => handleObjectionClick('budget')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-medium transition"
                  >
                    💬 Objection 2: "No CapEx budget allocated"
                  </button>

                  <button
                    onClick={() => handleBookAuditSim()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-600/20 transition ml-auto"
                  >
                    ✅ Prospect Agrees: Book Thermal Moisture Audit Scan
                  </button>
                </div>
              </div>
            )}

            {phoneSimState.auditBooked && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-emerald-300 text-xs font-semibold animate-fade-in">
                🎉 SUCCESS: On-site Thermal Imaging Moisture Assessment Scan Scheduled for Thursday 10:00 AM EST!
              </div>
            )}
          </div>

          {/* Right Column: Objection Battlecard Cheatsheet */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">SOP 2 Objection Handling Framework</h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-amber-400 mb-1">Objection: Full Tear-off Preference</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Unlike a full tear-off that costs $15–$25/sq ft and disrupts tenant operations, our liquid restoration systems extend roof lifecycle by 10 to 15 years at 50% to 60% lower cost, fully categorized as an operational expenditure."
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-indigo-400 mb-1">Key Value Drivers</div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                <li>Zero Tenant Downtime</li>
                <li>Qualifies as OpEx Maintenance</li>
                <li>10-15 Year Renewable Lifecycle</li>
                <li>Instant Section 179 Tax Deductions</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SOP 3 - EMAIL PERSONALIZATION */}
      {activeTab === 'email-cadence' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">SOP 3: Email Outreach Cadence</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Target Daily Volume: 60-80 emails • 15%+ open rate benchmark • 3%+ reply rate.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEmailTemplate('templateA')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    emailTemplate === 'templateA' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Template A (Preventative)
                </button>
                <button
                  onClick={() => setEmailTemplate('templateB')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    emailTemplate === 'templateB' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Template B (Zero Downtime)
                </button>
              </div>
            </div>

            {/* Email Preview Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
              <div className="border-b border-slate-800 pb-3 space-y-1">
                <div><span className="text-slate-500">From:</span> <span className="text-indigo-300">Aasav Ravi (Executive Lead) &lt;outreach@lasavo.com&gt;</span></div>
                <div><span className="text-slate-500">To:</span> <span className="text-white">Marcus Vance &lt;m.vance@gatewayindustrial.com&gt;</span></div>
                <div><span className="text-slate-500">Subject:</span> <span className="text-emerald-300 font-bold">
                  {emailTemplate === 'templateA'
                    ? "Preventative flat roof restoration for Gateway Industrial's Nashua facility"
                    : "Zero-downtime EPDM lifecycle extension - 140 Route 101A, Nashua"}
                </span></div>
              </div>

              <div className="text-slate-300 leading-relaxed whitespace-pre-line font-sans text-xs">
                {emailTemplate === 'templateA' ? (
                  `Hi Marcus,

I hope this email finds you well.

I'm reaching out on behalf of Lasavo for RoofRestore5x. We're currently working with commercial asset managers across Nashua to restore aging flat roofs before upcoming seasonal weather shifts.

Our GIS thermal audits show your facility at 140 Route 101A has approximately 65,000 sq ft of commercial flat roofing.

Unlike traditional tear-offs that disrupt tenant operations and cost $15–$25/sq ft, our engineered liquid membrane restoration systems:
• Extend your roof lifecycle by 10 to 15 years at 50% to 60% lower cost.
• Qualify as 100% operational expense (OpEx) for immediate tax deduction.
• Guarantee zero business downtime for your tenants.

Would you be open to a 10-minute briefing this week, or may I schedule a complimentary thermal moisture assessment scan for your building?

Best regards,

Aasav Ravi
Executive Lead, Lasavo Commercial Sales | RoofRestore5x`
                ) : (
                  `Hi Marcus,

With freezing temperatures approaching along the industrial corridors in Nashua, seam separation and membrane degradation on commercial roofs become major liability risks.

Rather than committing $200,000+ in CapEx for a complete tear-off, RoofRestore5x applies elastomeric liquid restoration coatings directly over existing EPDM/TPO membranes.

Key Advantages for Gateway Industrial Logistics LLC:
1. 50-60% Savings vs Full Replacement
2. No Operational Interruption (No heavy machinery or noise)
3. 15-Year Renewable System Warranty

Are you available for a brief 10-minute briefing or a complimentary thermal moisture scan next Tuesday or Thursday?

Warm regards,

Aasav Ravi
Executive Lead, Lasavo Commercial Sales | RoofRestore5x`
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Outbound Analytics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white">SOP 3 Email Performance Metrics</h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Open Rate (Target: 15%+)</span>
                <span className="text-emerald-400 font-bold">19.2%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="text-slate-400">Reply Rate (Target: 3%+)</span>
                <span className="text-emerald-400 font-bold">4.8%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SOP 4 & 6 - ESCALATIONS & EOD REPORTS */}
      {activeTab === 'escalations-eod' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Escalation Alert Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  🚨
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-300">Section 6 High-Ticket Deal Escalation Trigger</h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Any opportunity exceeding <strong>$150,000</strong> in contract value is automatically escalated to Founder <strong className="text-amber-300">Aasav Ravi</strong> for joint enterprise closing support.
                  </p>

                  <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-amber-500/20 text-xs space-y-1.5">
                    <div className="font-bold text-white">Escalated Deal: Casco Bay Marine Cold Storage LLC (Portland, ME)</div>
                    <div className="text-slate-400">Roof Area: 95,000 sq ft • Est. Contract Value: <strong className="text-emerald-400">$210,000</strong></div>
                    <div className="text-amber-300 font-medium">Status: Escalated to Aasav Ravi for custom terms & joint proposal presentation.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Deal Revenue Calculator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Section 5.3 High-Ticket Deal Potential Calculator</h3>

              <div className="mb-6">
                <label className="text-xs text-slate-400 block mb-2">Adjust Project Contract Value:</label>
                <input
                  type="range"
                  min="50000"
                  max="400000"
                  step="10000"
                  value={dealCalculatorValue}
                  onChange={(e) => setDealCalculatorValue(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="text-center font-bold text-2xl text-white mt-2">
                  ${dealCalculatorValue.toLocaleString()} Gross Contract
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Upfront Intake Fee</div>
                  <div className="text-lg font-bold text-white mt-1">${calcIntakeFee.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Lasavo Commission ({(calcRate * 100).toFixed(0)}%)</div>
                  <div className="text-lg font-bold text-indigo-400 mt-1">${calcCommission.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 bg-emerald-500/5">
                  <div className="text-emerald-400 text-xs font-semibold">Total Lasavo Earnings</div>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1">${calcTotalEarnings.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* EOD Report Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Daily 5:00 PM EST EOD Report to Aasav Ravi</h3>
                <span className="text-xs text-indigo-400 font-mono">Automated SOP 6</span>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {eodReportText}
              </pre>
            </div>
          </div>

          {/* 12-Month Sales Forecast Model */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">12-Month Projected Sales & Revenue Model</h3>
            <p className="text-slate-400 text-xs">
              Based on Section 5 hybrid compensation model & 8% lead-to-audit, 25% audit-to-close benchmarks.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-indigo-300">Q1 Forecast</div>
                <div className="text-xs text-slate-400 mt-1">30 Audits • 6 Closed Deals</div>
                <div className="text-sm font-bold text-white mt-1">$420,000 Gross Volume</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-purple-300">Q2 Forecast</div>
                <div className="text-xs text-slate-400 mt-1">45 Audits • 10 Closed Deals</div>
                <div className="text-sm font-bold text-white mt-1">$850,000 Gross Volume</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-pink-300">Q3 Forecast</div>
                <div className="text-xs text-slate-400 mt-1">60 Audits • 14 Closed Deals</div>
                <div className="text-sm font-bold text-white mt-1">$1,350,000 Gross Volume</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-emerald-300">Q4 Forecast</div>
                <div className="text-xs text-slate-400 mt-1">50 Audits • 12 Closed Deals</div>
                <div className="text-sm font-bold text-white mt-1">$1,100,000 Gross Volume</div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Annual Total Projection</div>
                <div className="text-xl font-extrabold text-white mt-1">$3,720,000 Volume</div>
                <div className="text-xs text-emerald-300 mt-1">185 Audits • 42 Closed Deals</div>
                <div className="text-xs text-slate-400 mt-2">Unlocks Tier 3 10.0% Commission Accelerator + $20,000 Annual Volume Bonus!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI MODEL WORKBENCH (Kimi AI & Free APIs) */}
      {activeTab === 'ai-playground' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                SOP Section 5 • Low Cost AI Model Integration
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Kimi AI & Free AI SDR Agent Workbench</h2>
              <p className="text-xs text-slate-400 mt-1">
                Execute live prompt engineering with <strong>Kimi K3 (Moonshot AI)</strong>, <strong>OpenRouter Free Tier</strong>, or <strong>Google Gemini Flash</strong> for zero/cheap outbound campaigns.
              </p>
            </div>

            <button
              onClick={() => setIsApiKeyOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
            >
              <span>⚙️ Configure {aiProvider.toUpperCase()} Key</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">Quick Agent SOP Prompt Templates:</label>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setPlaygroundPrompt('Generate a JSON lead record for a 95,000 sq ft industrial logistics warehouse in Nashua NH with EPDM roof type, estimated deal value, and VP Facilities contact info.')}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl transition"
              >
                🔍 Lead Identification Prompt
              </button>
              <button
                onClick={() => setPlaygroundPrompt('Draft a 3-sentence high-converting cold email to Marcus Vance (VP Asset Management) offering a free thermal moisture audit for Gateway Industrial.')}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl transition"
              >
                ✉️ Cold Email Pitch Prompt
              </button>
              <button
                onClick={() => setPlaygroundPrompt('Write a phone voice script to counter the objection: "We prefer full tear-off and replacement rather than fluid-applied coating."')}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl transition"
              >
                📞 Objection Rebuttal Script
              </button>
            </div>
          </div>

          {/* Prompt Form */}
          <div className="space-y-3">
            <textarea
              rows={4}
              value={playgroundPrompt}
              onChange={e => setPlaygroundPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
              placeholder="Enter custom SDR prompt for Kimi AI / Free Model..."
            />

            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500">
                Active Provider: <strong className="text-amber-400 font-bold uppercase">{aiProvider}</strong> (Free / Cheap Ingestion Mode)
              </span>

              <button
                onClick={handleQueryAIPlayground}
                disabled={isQueryingAI}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center space-x-2"
              >
                {isQueryingAI ? (
                  <span>Querying {aiProvider.toUpperCase()}...</span>
                ) : (
                  <span>Execute AI Agent Prompt 🚀</span>
                )}
              </button>
            </div>
          </div>

          {/* Result Output */}
          {playgroundResult && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px] text-slate-500 pb-2 border-b border-slate-900">
                <span className="text-emerald-400 font-bold">LIVE AI MODEL OUTPUT TELEMETRY</span>
                <span>Response Time: ~0.4s</span>
              </div>
              <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {playgroundResult}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* API Key Modal */}
      <APIKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        onSaveKeys={({ provider }) => setAiProvider(provider)}
      />
    </div>
  );
}
