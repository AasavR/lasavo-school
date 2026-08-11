import React, { useState } from 'react';
import { BOARDS, GRADES, SAMPLE_CURRICULUM, TEACHERS_MAP } from '../data/curriculumData';

export default function CurriculumBrowser({ 
  currentBoard, 
  currentGrade, 
  onSelectBoard, 
  onSelectGrade, 
  onStartClass 
}) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');

  // Categories of grades
  const primaryGrades = GRADES.filter(g => g.category.includes('Primary'));
  const middleGrades = GRADES.filter(g => g.category.includes('Middle'));
  const secGrades = GRADES.filter(g => g.category.includes('Secondary') && !g.category.includes('Sr.'));
  const srSecGrades = GRADES.filter(g => g.category.includes('Sr. Secondary'));

  // Fetch subjects for current grade & board
  const gradeKey = currentGrade; // e.g. 'class-10'
  const curriculumForGrade = SAMPLE_CURRICULUM[gradeKey] || SAMPLE_CURRICULUM['class-10'];
  const subjectsList = curriculumForGrade[currentBoard] || curriculumForGrade['CBSE'] || [];

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Board & Grade Selector Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-400">NCERT Aligned Curriculum</span>
            <h2 className="text-2xl font-bold text-white">Select Academic Board & Class</h2>
            <p className="text-xs text-slate-400 mt-1">tailored for CBSE & ICSE Class 1st to Class 12th</p>
          </div>

          {/* Board Selector */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            {BOARDS.map(b => (
              <button
                key={b.id}
                onClick={() => onSelectBoard(b.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                  currentBoard === b.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Selection Grid */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-300">Choose Grade / Class:</div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {GRADES.map(g => (
              <button
                key={g.id}
                onClick={() => onSelectGrade(g.id)}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center ${
                  currentGrade === g.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-lg scale-105'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{g.name}</span>
                <span className="text-[9px] opacity-70 font-normal mt-0.5">{g.category.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Available Subjects & NCERT Modules */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              {currentBoard} • {GRADES.find(g => g.id === currentGrade)?.name || 'Class 10'} Modules
            </h3>
            <p className="text-xs text-slate-400">Select a subject chapter to launch the 2-Way AI Avatar classroom video/audio session.</p>
          </div>

          <div className="flex space-x-2 text-xs">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-3 py-1.5 rounded-xl border transition ${
                selectedSubjectFilter === 'all'
                  ? 'bg-slate-800 border-slate-700 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Subjects ({subjectsList.length})
            </button>
          </div>
        </div>

        {subjectsList.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
            No specific modules custom-loaded for {currentGrade} ({currentBoard}) yet. Loading default Class 10 NCERT modules...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {subjectsList.map(subj => {
              const teacher = TEACHERS_MAP[subj.teacherId] || TEACHERS_MAP.math;

              return (
                <div key={subj.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xl">
                        {subj.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{subj.subjectName}</h4>
                        <span className="text-[10px] text-indigo-400 font-semibold">{subj.code} • Aligned with NCERT Textbook</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800 text-xs">
                      <img src={teacher.image} alt={teacher.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-slate-300 font-semibold">{teacher.name}</span>
                    </div>
                  </div>

                  {/* Chapters List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subj.chapters.map(ch => (
                      <div key={ch.id} className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 flex flex-col justify-between transition group">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                              ⏱️ {ch.duration}
                            </span>
                            <span className="text-[10px] text-slate-500">{ch.ncertRef}</span>
                          </div>

                          <h5 className="text-xs font-bold text-white mb-1.5 group-hover:text-indigo-300 transition">
                            {ch.title}
                          </h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-3 line-clamp-3">
                            {ch.summary}
                          </p>
                        </div>

                        <button
                          onClick={() => onStartClass(subj, ch, teacher)}
                          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow transition active:scale-95 flex items-center justify-center space-x-2"
                        >
                          <span>🎥 Join AI Video Class</span>
                          <span className="text-[10px] font-normal opacity-80">(or Audio)</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
