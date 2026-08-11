import React, { useState } from 'react';

export default function ParentTMSDashboard({ 
  userProfile, 
  progressData, 
  assignments, 
  onAddAssignment, 
  onToggleAssignment 
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAssignment({
      title: newTitle,
      subject: newSubject,
      dueDate: newDueDate,
      status: 'Pending',
      assignedBy: 'Parent / Teacher'
    });
    setNewTitle('');
  };

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap justify-between items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Parent & Faculty Portal</span>
          <h2 className="text-2xl font-bold text-white">Student Analytics & Teacher Management</h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking learning performance for <strong className="text-indigo-300">{userProfile.studentName}</strong> ({userProfile.grade} • {userProfile.board || 'CBSE'})
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <span>Parent Phone: </span>
          <strong className="text-indigo-400">{userProfile.parentPhone || '+91 98765 43210'}</strong>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
          <div className="text-xs text-slate-400 mb-1">Total Hours Learned</div>
          <div className="text-3xl font-extrabold text-indigo-400">{progressData.totalHoursLearned} hrs</div>
          <div className="text-[10px] text-emerald-400 mt-2">↑ 2.4 hrs this week</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
          <div className="text-xs text-slate-400 mb-1">Study Streak</div>
          <div className="text-3xl font-extrabold text-amber-400">{progressData.streakDays} Days 🔥</div>
          <div className="text-[10px] text-slate-400 mt-2">Active daily attendance</div>
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

      {/* Subject Mastery & Homework Manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Mastery */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Subject NCERT Mastery</h3>
          <div className="space-y-4">
            {Object.entries(progressData.subjectMastery || {}).map(([subj, score]) => (
              <div key={subj}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{subj}</span>
                  <span className="text-indigo-400 font-bold">{score}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
                    style={{ width: `${score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Assignment Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Assign Homework / Homework Generator</h3>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Complete 5 NCERT Trigonometry Exercises"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                <select
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="In 2 days">In 2 days</option>
                  <option value="In 5 days">In 5 days</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition"
            >
              + Assign Homework to Student
            </button>
          </form>
        </div>
      </div>

      {/* Homework Tasks List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 overflow-x-auto">
        <h3 className="text-base font-bold text-white">Assigned Homework & Submission Status</h3>
        
        <table className="w-full text-left text-xs text-slate-300 min-w-[600px]">
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
                <td className="p-3 text-indigo-400 font-medium">{item.subject}</td>
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
                    onClick={() => onToggleAssignment(item)}
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
  );
}
