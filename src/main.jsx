
import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc 
} from 'firebase/firestore';

const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: "demo-api-key",
      authDomain: "demo-app.firebaseapp.com",
      projectId: "demo-app",
      storageBucket: "demo-app.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'school-lasavo-platform';

const TEACHERS = [
  {
    id: 'math',
    name: 'Dr. Ananya Sharma',
    title: 'Ph.D. Applied Math (IIT Bombay)',
    subject: 'Mathematics & Calculus',
    avatarBg: 'from-amber-500/20 via-orange-500/10 to-rose-600/20',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    btnColor: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
    description: 'Expert in calculus, trigonometry, linear algebra, and visual problem solving.',
    greeting: 'Namaste! I am Dr. Ananya. What math concept or problem shall we solve together today?',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.1,
    voiceRate: 0.95
  },
  {
    id: 'physics',
    name: 'Prof. Priya Iyer',
    title: 'Senior Quantum Physicist',
    subject: 'Physics & Space Science',
    avatarBg: 'from-cyan-500/20 via-indigo-500/10 to-blue-600/20',
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    btnColor: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
    description: 'Specializes in quantum mechanics, space systems, electromagnetism, and mechanics.',
    greeting: 'Welcome to Physics! I am Prof. Priya. Let us explore the fundamental laws of our universe.',
    image: 'https://images.unsplash.com/photo-1580894732413-80d8f075d9fb?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.05,
    voiceRate: 1.0
  },
  {
    id: 'cs',
    name: 'Aarav Mehta',
    title: 'Ex-AI Lead & Systems Engineer',
    subject: 'Computer Science & AI',
    avatarBg: 'from-emerald-500/20 via-teal-500/10 to-green-600/20',
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    btnColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    description: 'Teaches Python, full-stack web engineering, algorithms, neural networks, and Web3.',
    greeting: 'Hey! I am Aarav. Ready to code, decode algorithms, or build neural networks together?',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    voicePitch: 0.95,
    voiceRate: 1.05
  },
  {
    id: 'english',
    name: 'Kavya Deshmukh',
    title: 'Linguistic Specialist & Author',
    subject: 'English & Creative Writing',
    avatarBg: 'from-purple-500/20 via-pink-500/10 to-rose-600/20',
    accentColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    btnColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500',
    description: 'Helps students master vocabulary, literature analysis, critical essay writing, and public speaking.',
    greeting: 'Hello! I am Kavya. Let us elevate your vocabulary, storytelling, and communication skills.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    voicePitch: 1.15,
    voiceRate: 0.95
  }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userProfile, setUserProfile] = useState({
    studentName: 'Aarav Student',
    grade: 'Grade 9',
    parentName: 'Ravi Kumar',
    parentPhone: '+91 98765 43210',
    enrolledAt: null
  });

  const [activeTab, setActiveTab] = useState('classroom');
  const [selectedTeacher, setSelectedTeacher] = useState(TEACHERS[0]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [statusNotification, setStatusNotification] = useState(null);

  const [progressData, setProgressData] = useState({
    totalHoursLearned: 14.5,
    streakDays: 5,
    quizzesCompleted: 12,
    avgAccuracy: 88,
    subjectMastery: {
      'Mathematics & Calculus': 82,
      'Physics & Space Science': 75,
      'Computer Science & AI': 94,
      'English & Creative Writing': 89
    },
    activities: [
      { id: '1', title: 'Calculus Derivatives Basics', teacher: 'Dr. Ananya Sharma', score: '90%', date: 'Today, 10:30 AM' },
      { id: '2', title: 'Python Loop Architecture', teacher: 'Aarav Mehta', score: '100%', date: 'Yesterday, 4:15 PM' },
      { id: '3', title: 'Newtonian Kinematics Laws', teacher: 'Prof. Priya Iyer', score: '85%', date: '2 days ago' }
    ]
  });

  const [assignments, setAssignments] = useState([
    { id: 'a1', subject: 'Mathematics', title: 'Solve 10 Trigonometric Equations', dueDate: 'Tomorrow', status: 'Pending', assignedBy: 'Dr. Ananya Sharma' },
    { id: 'a2', subject: 'Computer Science', title: 'Build a Python Calculator GUI', dueDate: 'In 3 days', status: 'Completed', assignedBy: 'Aarav Mehta' },
    { id: 'a3', subject: 'Physics', title: 'Vector Equilibrium Worksheet', dueDate: 'In 5 days', status: 'Pending', assignedBy: 'Prof. Priya Iyer' }
  ]);

  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentSubject, setNewAssignmentSubject] = useState('Mathematics');
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('Tomorrow');

  const chatEndRef = useRef(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'userData');
    const unsubProfile = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.isEnrolled) setIsEnrolled(true);
        if (data.profile) setUserProfile(data.profile);
        if (data.progress) setProgressData(data.progress);
      } else {
        setDoc(userDocRef, {
          isEnrolled: false,
          profile: userProfile,
          progress: progressData,
          createdAt: new Date().toISOString()
        }, { merge: true }).catch(err => console.error("Firestore init profile error:", err));
      }
    }, (err) => console.error("Firestore Profile Sync Error:", err));

    const assignmentsColRef = collection(db, 'artifacts', appId, 'users', user.uid, 'assignments');
    const unsubAssignments = onSnapshot(assignmentsColRef, (snapshot) => {
      if (!snapshot.empty) {
        const loaded = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setAssignments(loaded);
      }
    }, (err) => console.error("Firestore Assignments Sync Error:", err));

    return () => {
      unsubProfile();
      unsubAssignments();
    };
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  useEffect(() => {
    setChatHistory([
      { role: 'assistant', content: selectedTeacher.greeting, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    if (!voiceMuted) {
      speakText(selectedTeacher.greeting, selectedTeacher);
    }
  }, [selectedTeacher]);

  const speakText = (text, teacher) => {
    if (!('speechSynthesis' in window) || voiceMuted) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(
      v => v.lang.includes('en-IN') || v.lang.includes('hi-IN') || v.name.toLowerCase().includes('india')
    );

    if (indianVoice) utterance.voice = indianVoice;
    utterance.pitch = teacher.voicePitch || 1.0;
    utterance.rate = teacher.voiceRate || 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleEnrollPayment = async () => {
    showNotification("Initializing ₹100 Lifetime Access Checkout...");

    try {
      let orderData = { id: null, amount: 10000, currency: 'INR' };
      try {
        const response = await fetch('/.netlify/functions/create-razorpay-order', { method: 'POST' });
        if (response.ok) orderData = await response.json();
      } catch (e) {
        console.warn("Backend order creator bypassed. Using client gateway.");
      }

      const options = {
        key: import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_school_lasavo',
        amount: orderData.amount || 10000,
        currency: 'INR',
        name: 'School.lasavo.org',
        description: 'Lifetime Access Enrollment (₹100)',
        image: 'https://placehold.co/120x120/4F46E5/FFFFFF?text=Lasavo',
        order_id: orderData.id || undefined,
        handler: async function (response) {
          if (response.razorpay_payment_id || response) {
            setIsEnrolled(true);
            showNotification("🎉 Payment Successful! Welcome to School.lasavo.org Lifetime Access!");
            
            if (user) {
              const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'userData');
              await setDoc(userDocRef, {
                isEnrolled: true,
                enrolledAt: new Date().toISOString(),
                paymentId: response.razorpay_payment_id || 'demo_tx_' + Date.now()
              }, { merge: true });
            }
          }
        },
        prefill: {
          name: userProfile.studentName,
          email: 'student@lasavo.org',
          contact: userProfile.parentPhone
        },
        theme: { color: '#4F46E5' }
      };

      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        setIsEnrolled(true);
        showNotification("Simulated ₹100 payment successful! Access Granted.");
        if (user) {
          const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'userData');
          await setDoc(userDocRef, { isEnrolled: true, enrolledAt: new Date().toISOString() }, { merge: true });
        }
      }
    } catch (err) {
      console.error('Payment Error:', err);
      showNotification("Payment initialization failed. Please retry.");
    }
  };

  const handleAskKimi = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userPrompt = input;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userPrompt, timestamp: timeString }]);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/kimi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherName: selectedTeacher.name,
          subject: selectedTeacher.subject,
          prompt: userPrompt,
        })
      });

      let aiReply = '';
      if (response.ok) {
        const data = await response.json();
        aiReply = data.reply;
      } else {
        aiReply = `That is a great question in ${selectedTeacher.subject}. Let us analyze it: First, establish the core principle, second, apply practical logic, and third, verify the solution. Would you like a step-by-step example?`;
      }

      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: aiReply, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);

      speakText(aiReply, selectedTeacher);

      if (user) {
        const actColRef = collection(db, 'artifacts', appId, 'users', user.uid, 'activities');
        await addDoc(actColRef, {
          title: `Query on ${selectedTeacher.subject}`,
          teacher: selectedTeacher.name,
          query: userPrompt,
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Kimi Query Error:', err);
      const fallbackMsg = `Great query! In ${selectedTeacher.subject}, we look at how primary principles interact. Let me know if you need specific formulas or code implementations!`;
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackMsg, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      speakText(fallbackMsg, selectedTeacher);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!newAssignmentTitle.trim()) return;

    const newObj = {
      title: newAssignmentTitle,
      subject: newAssignmentSubject,
      dueDate: newAssignmentDueDate,
      status: 'Pending',
      assignedBy: selectedTeacher.name,
      createdAt: new Date().toISOString()
    };

    if (user) {
      const assignmentsColRef = collection(db, 'artifacts', appId, 'users', user.uid, 'assignments');
      await addDoc(assignmentsColRef, newObj);
    } else {
      setAssignments(prev => [...prev, { id: 'temp_' + Date.now(), ...newObj }]);
    }

    setNewAssignmentTitle('');
    showNotification(`New ${newAssignmentSubject} assignment assigned to student!`);
  };

  const toggleAssignmentStatus = async (item) => {
    const updatedStatus = item.status === 'Pending' ? 'Completed' : 'Pending';
    if (user && item.id && !item.id.startsWith('temp_')) {
      const assignDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'assignments', item.id);
      await updateDoc(assignDocRef, { status: updatedStatus });
    } else {
      setAssignments(prev => prev.map(a => a.id === item.id ? { ...a, status: updatedStatus } : a));
    }
    showNotification(`Assignment marked as ${updatedStatus}`);
  };

  const showNotification = (msg) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {statusNotification && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-400 flex items-center space-x-3 animate-fade-in">
          <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="text-xs font-semibold">{statusNotification}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 md:px-8 py-3.5 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-indigo-500/20">
            L
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              School.lasavo.org
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">
              Kimi K3 AI Faculty
            </span>
          </div>
        </div>

        {isEnrolled && (
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('classroom')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'classroom' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏫 Classrooms
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Child Progress
            </button>
            <button
              onClick={() => setActiveTab('tms')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'tms' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 TMS & Homework
            </button>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              setVoiceMuted(!voiceMuted);
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition"
            title={voiceMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {voiceMuted ? '🔇 Muted' : '🔊 Voice On'}
          </button>

          {isEnrolled ? (
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lifetime Member</span>
            </div>
          ) : (
            <button
              onClick={handleEnrollPayment}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Enroll for ₹100
            </button>
          )}
        </div>
      </header>

      {!isEnrolled ? (
        <section className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto my-auto">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Interactive Indian AI Faculty • Kimi K3 Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            World-Class AI School for <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              ₹100 Lifetime Access
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            Learn Mathematics, Physics, Computer Science, and English directly from realistic Indian AI professors. Includes child progress tracking, parent TMS, homework generator, and 24/7 spoken tutoring.
          </p>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl backdrop-blur relative overflow-hidden mb-12">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-2">One-Time Membership</div>
            <div className="flex items-baseline justify-center space-x-1 mb-2">
              <span className="text-5xl font-extrabold text-white">₹100</span>
              <span className="text-slate-400 text-sm font-medium">/ lifetime</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">No recurring subscriptions. Pay once, learn forever.</p>

            <ul className="text-left text-xs text-slate-300 space-y-3 mb-8 border-t border-b border-slate-800 py-5">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Access all 4 Indian AI Professors & Subjects</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Spoken Audio Responses in Realistic Accents</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Child Learning Analytics & Mastery Dashboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Complete Teacher Management System (TMS)</span>
              </li>
            </ul>

            <button
              onClick={handleEnrollPayment}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all transform active:scale-95 text-sm"
            >
              Pay ₹100 via UPI / Card & Join Now
            </button>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Meet Your Indian Faculty</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TEACHERS.map(t => (
                <div key={t.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30 mb-2" />
                  <span className="text-xs font-bold text-slate-200">{t.name}</span>
                  <span className="text-[10px] text-indigo-400 mt-0.5">{t.subject}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {activeTab === 'classroom' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 flex flex-col space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${selectedTeacher.avatarBg} blur-3xl pointer-events-none`} />

                  <div className="relative mb-4">
                    <img 
                      src={selectedTeacher.image} 
                      alt={selectedTeacher.name} 
                      className={`w-40 h-40 rounded-full object-cover border-4 transition-all duration-300 ${
                        isSpeaking ? 'border-emerald-400 shadow-2xl shadow-emerald-500/40 scale-105' : 'border-indigo-500/30 shadow-xl'
                      }`}
                    />

                    {isSpeaking && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg tracking-wider">
                        <span className="w-2 h-2 bg-slate-950 rounded-full animate-ping" />
                        <span>SPEAKING</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-0.5">{selectedTeacher.name}</h2>
                  <p className="text-xs text-slate-400 mb-2">{selectedTeacher.title}</p>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${selectedTeacher.accentColor} bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800 mb-3`}>
                    {selectedTeacher.subject}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs">{selectedTeacher.description}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Select Instructor</h3>
                  <div className="space-y-2">
                    {TEACHERS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTeacher(t)}
                        className={`w-full p-3 rounded-2xl flex items-center space-x-3 transition-all ${
                          selectedTeacher.id === t.id 
                            ? 'bg-indigo-600/20 border border-indigo-500/50 text-white shadow-md' 
                            : 'bg-slate-800/40 border border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="text-left flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{t.name}</div>
                          <div className="text-[10px] opacity-75 truncate">{t.subject}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col h-[650px] shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-bold text-white">{selectedTeacher.subject} Classroom</h3>
                      <p className="text-[11px] text-slate-400">Instructor: {selectedTeacher.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatHistory([{ role: 'assistant', content: selectedTeacher.greeting, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])}
                    className="text-[11px] text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 px-3 py-1 rounded-lg border border-slate-700/60 transition"
                  >
                    Clear Board
                  </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-none' 
                          : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-none'
                      }`}>
                        <div className="text-xs font-semibold mb-1 opacity-75 flex justify-between items-center space-x-4">
                          <span>{msg.role === 'user' ? userProfile.studentName : selectedTeacher.name}</span>
                          <span className="text-[10px] font-normal">{msg.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 border border-slate-700/60 text-slate-300 text-xs px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-md">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200" />
                        <span className="ml-2 text-slate-400">{selectedTeacher.name} is formulating response...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-slate-950/60 border-t border-slate-800">
                  <form onSubmit={handleAskKimi} className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={`Ask ${selectedTeacher.name} a question...`}
                      className="flex-1 bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 shadow-inner"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-all ${
                        isLoading || !input.trim() 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : `${selectedTeacher.btnColor} shadow-indigo-600/20 active:scale-95`
                      }`}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Student Progress Dashboard</h2>
                  <p className="text-xs text-slate-400">Tracking performance for {userProfile.studentName} ({userProfile.grade})</p>
                </div>
                <div className="flex items-center space-x-3 text-xs bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
                  <span>Parent Contact: <strong className="text-indigo-300">{userProfile.parentPhone}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
                  <div className="text-xs text-slate-400 mb-1">Total Hours Learned</div>
                  <div className="text-3xl font-extrabold text-indigo-400">{progressData.totalHoursLearned} hrs</div>
                  <div className="text-[10px] text-emerald-400 mt-2">↑ 2.4 hrs this week</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
                  <div className="text-xs text-slate-400 mb-1">Learning Streak</div>
                  <div className="text-3xl font-extrabold text-amber-400">{progressData.streakDays} Days 🔥</div>
                  <div className="text-[10px] text-slate-400 mt-2">Active consecutive study</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
                  <div className="text-xs text-slate-400 mb-1">Quizzes Completed</div>
                  <div className="text-3xl font-extrabold text-purple-400">{progressData.quizzesCompleted}</div>
                  <div className="text-[10px] text-purple-300 mt-2">100% completion rate</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
                  <div className="text-xs text-slate-400 mb-1">Average Accuracy</div>
                  <div className="text-3xl font-extrabold text-emerald-400">{progressData.avgAccuracy}%</div>
                  <div className="text-[10px] text-emerald-300 mt-2">Top 5% student rank</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold text-white mb-4">Subject Mastery Level</h3>
                  <div className="space-y-4">
                    {Object.entries(progressData.subjectMastery).map(([subj, score]) => (
                      <div key={subj}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">{subj}</span>
                          <span className="text-indigo-400 font-bold">{score}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
                            style={{ width: `${score}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-4">Recent Learning Milestones</h3>
                    <div className="space-y-3">
                      {progressData.activities.map(act => (
                        <div key={act.id} className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-2xl flex justify-between items-center text-xs">
                          <div>
                            <div className="font-semibold text-slate-200">{act.title}</div>
                            <div className="text-[10px] text-slate-400">{act.teacher} • {act.date}</div>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            {act.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tms' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Teacher Management System (TMS)</h2>
                  <p className="text-xs text-slate-400">Assign homework, monitor submission deadlines, and evaluate student progress.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4">Create & Assign New Homework</h3>
                <form onSubmit={handleCreateAssignment} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newAssignmentTitle}
                    onChange={e => setNewAssignmentTitle(e.target.value)}
                    placeholder="Homework task title..."
                    className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={newAssignmentSubject}
                    onChange={e => setNewAssignmentSubject(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-2xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-2xl shadow-lg transition-all"
                  >
                    + Assign Homework
                  </button>
                </form>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
                <h3 className="text-sm font-bold text-white mb-4">Assigned Tasks & Submissions</h3>
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="p-3 rounded-l-xl">Task Title</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Assigned By</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {assignments.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="p-3 font-semibold text-slate-100">{item.title}</td>
                        <td className="p-3 text-indigo-400">{item.subject}</td>
                        <td className="p-3 text-slate-400">{item.assignedBy}</td>
                        <td className="p-3 text-slate-400">{item.dueDate}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleAssignmentStatus(item)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-xl text-[10px] border border-slate-700 transition"
                          >
                            Mark {item.status === 'Pending' ? 'Done' : 'Pending'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}