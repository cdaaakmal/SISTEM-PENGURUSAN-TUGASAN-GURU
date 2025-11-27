
import React, { useState } from 'react';
import { INITIAL_TEACHERS, INITIAL_TASKS, AVAILABLE_YEARS } from './constants';
import { Teacher, Task, ViewState, TaskCategory } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import { Search, User, Filter, AlertCircle, BarChart3, Users, BookOpen, PlusCircle, Layers, ListChecks, Printer, Settings, Plus, Save, Trash2, Lock, X, LogIn } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const App: React.FC = () => {
  // Application State
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [availableYears, setAvailableYears] = useState<number[]>(AVAILABLE_YEARS);
  
  // Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginPassword, setLoginPassword] = useState<string>('');
  
  // Search/Filter State
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [statsTeacherId, setStatsTeacherId] = useState<string>(''); 
  
  // Settings State
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newYearInput, setNewYearInput] = useState('');
  
  // UI State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Auth Logic
  const handleLogin = () => {
    if (loginPassword === '1234') {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setLoginPassword('');
      alert('LOG MASUK BERJAYA! MOD PENTADBIR DIAKTIFKAN.');
    } else {
      alert('KOD AKSES SALAH!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (view === 'ADD_TASK' || view === 'SETTINGS') {
      setView('DASHBOARD');
    }
    alert('LOG KELUAR BERJAYA.');
  };

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchYear = task.year === selectedYear;
    const matchTeacher = selectedTeacherId ? task.teacherId === selectedTeacherId : true;
    return matchYear && matchTeacher;
  });

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>, shouldRedirect: boolean = true) => {
    const newTask: Task = {
      ...newTaskData,
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    
    // Auto switch context to the added task
    setSelectedTeacherId(newTask.teacherId);
    setSelectedYear(newTask.year);

    if (shouldRedirect) {
      setView('SEARCH');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (!isAdmin) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddTeacher = () => {
    if (!newTeacherName.trim()) return;
    const newTeacher: Teacher = {
      id: (teachers.length + 1).toString(),
      name: newTeacherName.toUpperCase(),
      position: 'GURU AKADEMIK',
      department: 'AKADEMIK'
    };
    setTeachers([...teachers, newTeacher]);
    setNewTeacherName('');
    alert('GURU BERJAYA DITAMBAH!');
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (!isAdmin) return;
    if (window.confirm('ADAKAH ANDA PASTI MAHU MEMADAM GURU INI? SEMUA TUGASAN BERKAITAN TIDAK AKAN DIPADAM TETAPI AKAN KEHILANGAN RUJUKAN GURU.')) {
      setTeachers(prev => prev.filter(t => t.id !== teacherId));
    }
  };

  const handleAddYear = () => {
    const year = parseInt(newYearInput);
    if (isNaN(year) || year < 2000 || year > 2100) {
      alert('SILA MASUKKAN TAHUN YANG SAH.');
      return;
    }
    if (!availableYears.includes(year)) {
      const updatedYears = [...availableYears, year].sort((a, b) => b - a);
      setAvailableYears(updatedYears);
      setSelectedYear(year);
      alert(`TAHUN ${year} BERJAYA DITAMBAH!`);
    } else {
      alert('TAHUN SUDAH WUJUD.');
    }
    setNewYearInput('');
  };

  const generatePDF = () => {
    if (!selectedTeacherId) return;

    const teacher = teachers.find(t => t.id === selectedTeacherId);
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(`SENARAI TUGASAN GURU ${selectedYear}`, 14, 22);
    
    // Teacher Info
    doc.setFontSize(12);
    doc.text(`NAMA GURU: ${teacher?.name || ''}`, 14, 32);
    doc.text(`JAWATAN: ${teacher?.position || ''}`, 14, 38);

    // Prepare table data
    const tableRows: any[] = [];
    const categoryOrder = [
      TaskCategory.PENTADBIRAN,
      TaskCategory.KURIKULUM,
      TaskCategory.HEM,
      TaskCategory.KOKURIKULUM,
      TaskCategory.ULUL_ALBAB
    ];

    categoryOrder.forEach(category => {
      const categoryTasks = filteredTasks.filter(t => t.category === category);
      if (categoryTasks.length > 0) {
        // Category Header Row
        tableRows.push([{ content: category, colSpan: 3, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } }]);
        
        categoryTasks.forEach((task, index) => {
          tableRows.push([
            index + 1,
            task.title,
            task.role
          ]);
        });
      }
    });

    autoTable(doc, {
      startY: 45,
      head: [['BIL', 'UNIT/JAWATANKUASA', 'JAWATAN']],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 60 }
      }
    });

    doc.save(`TUGASAN_${teacher?.name.replace(/\s+/g, '_')}_${selectedYear}.pdf`);
  };

  // Dashboard Stats
  const stats = {
    totalTeachers: teachers.length,
    totalTasks: tasks.length,
    tasksThisYear: tasks.filter(t => t.year === selectedYear).length
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-8">
        {/* Top Controls for Dashboard */}
        <div className="flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800 uppercase">TINJAUAN KESELURUHAN {selectedYear}</h2>
           <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 outline-none text-sm font-bold text-slate-700 uppercase"
              >
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
           </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
            <div className="p-4 rounded-full bg-blue-50 text-blue-600 mr-4">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">JUMLAH GURU</p>
              <p className="text-3xl font-bold text-slate-800">{stats.totalTeachers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
            <div className="p-4 rounded-full bg-indigo-50 text-indigo-600 mr-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">JUMLAH TUGASAN</p>
              <p className="text-3xl font-bold text-slate-800">{stats.totalTasks}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
            <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 mr-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">SESI {selectedYear}</p>
              <p className="text-3xl font-bold text-slate-800">{stats.tasksThisYear}</p>
            </div>
          </div>
        </div>

        {/* Main Action Area */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 uppercase">SISTEM PENGURUSAN TUGASAN</h2>
            <p className="text-blue-100 mb-6 text-lg uppercase">
              SILA PILIH MENU SEMAKAN UNTUK MELIHAT AGIHAN TUGAS GURU MENGIKUT TAHUN SEMASA.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setView('SEARCH')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center shadow-md uppercase"
              >
                <Search className="w-5 h-5 mr-2" />
                SEMAK TUGASAN GURU
              </button>
              {isAdmin && (
                <button 
                  onClick={() => setView('ADD_TASK')}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center uppercase"
                >
                  + MASUKKAN DATA
                </button>
              )}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white opacity-10 rounded-full" />
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    // Individual Chart Data
    let chartData: any[] = [];
    let teacherTasks: Task[] = [];
    
    if (statsTeacherId) {
      teacherTasks = tasks.filter(t => t.teacherId === statsTeacherId && t.year === selectedYear);
      const categoryCounts = teacherTasks.reduce((acc, task) => {
        const catName = task.category.replace('PENGURUSAN ', '');
        acc[catName] = (acc[catName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      chartData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    
    const categoryOrder = [
      TaskCategory.PENTADBIRAN,
      TaskCategory.KURIKULUM,
      TaskCategory.HEM,
      TaskCategory.KOKURIKULUM,
      TaskCategory.ULUL_ALBAB
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800 uppercase">STATISTIK & ANALISIS {selectedYear}</h2>
           <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 outline-none text-sm font-bold text-slate-700 uppercase"
              >
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
           </div>
        </div>

        {/* Individual Breakdown Section - Centered */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
             <div className="flex items-center mb-6">
                <div className="p-2 bg-orange-50 rounded-lg mr-3">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 uppercase">PECAHAN TUGAS MENGIKUT BIDANG</h3>
                  <p className="text-xs text-slate-500 uppercase">ANALISIS TERPERINCI INDIVIDU.</p>
                </div>
             </div>

             <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">PILIH GURU UNTUK ANALISIS</label>
                <select
                  value={statsTeacherId}
                  onChange={(e) => setStatsTeacherId(e.target.value)}
                  className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm uppercase"
                >
                  <option value="">-- SILA PILIH GURU --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
             </div>

             <div className="h-[500px] w-full bg-slate-50 rounded-xl border border-slate-100 p-4 flex items-center justify-center relative">
                {statsTeacherId ? (
                   chartData.length > 0 ? (
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} 
                            interval={0}
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip 
                             cursor={{fill: '#f8fafc'}}
                             contentStyle={{
                              backgroundColor: '#fff', 
                              borderRadius: '8px', 
                              border: '1px solid #e2e8f0',
                              textTransform: 'uppercase',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                   ) : (
                     <div className="text-center p-6 text-slate-400 uppercase text-xs font-medium">
                        TIADA DATA TUGASAN UNTUK GURU INI PADA TAHUN {selectedYear}
                     </div>
                   )
                ) : (
                   <div className="text-center p-6 text-slate-400 uppercase text-xs font-medium">
                      SILA PILIH GURU DARI SENARAI DI ATAS
                   </div>
                )}
             </div>
          </div>

          {/* Detailed List Card (Appears when teacher is selected) */}
          {statsTeacherId && teacherTasks.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
                  <ListChecks className="w-5 h-5 mr-3 text-slate-500" />
                  <h3 className="font-bold text-slate-800 uppercase">SENARAI PENUH AGIHAN TUGAS</h3>
              </div>
              <div className="p-6 space-y-6">
                  {categoryOrder.map(cat => {
                    const catTasks = teacherTasks.filter(t => t.category === cat);
                    if (catTasks.length === 0) return null;
                    return (
                      <div key={cat}>
                          <h5 className="text-xs font-bold text-primary-600 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3 flex items-center">
                            {cat.replace('PENGURUSAN ', '')}
                            <span className="ml-2 bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-[10px] border border-primary-100">
                              {catTasks.length}
                            </span>
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {catTasks.map(task => (
                              <div key={task.id} className="flex flex-col p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-xs font-bold text-slate-700 uppercase mb-1">{task.role}</span>
                                <span className="text-xs text-slate-500 uppercase leading-relaxed">{task.title}</span>
                              </div>
                            ))}
                          </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    if (!isAdmin) return null; // Should be handled by router/view state, but failsafe here

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h2 className="text-xl font-bold text-slate-800 uppercase">PENGURUSAN DATA</h2>
          <p className="text-slate-500 text-sm uppercase">TAMBAH DATA GURU DAN TAHUN UNTUK SISTEM.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Teacher Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-primary-50 rounded-lg mr-3">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-bold text-slate-800 uppercase">TAMBAH GURU BARU</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">NAMA PENUH GURU</label>
                <input 
                  type="text"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value.toUpperCase())}
                  placeholder="CONTOH: MOHD ALI BIN ABU"
                  className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none uppercase"
                />
              </div>
              <button 
                onClick={handleAddTeacher}
                disabled={!newTeacherName.trim()}
                className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                SIMPAN DATA GURU
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-3">SENARAI GURU SEDIA ADA ({teachers.length})</p>
              <div className="h-48 overflow-y-auto bg-slate-50 rounded-lg border border-slate-200 p-2 space-y-1">
                {teachers.map((t, i) => (
                  <div key={t.id} className="flex justify-between items-center text-xs text-slate-600 px-3 py-2 bg-white rounded border border-slate-100 uppercase hover:bg-slate-50">
                    <span>{i + 1}. {t.name}</span>
                    <button
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                      title="PADAM GURU"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Year Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <div className="flex items-center mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-emerald-50 rounded-lg mr-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 uppercase">TAMBAH SESI TAHUN</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">TAHUN</label>
                <input 
                  type="number"
                  value={newYearInput}
                  onChange={(e) => setNewYearInput(e.target.value)}
                  placeholder="CONTOH: 2027"
                  className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none uppercase"
                />
              </div>
              <button 
                onClick={handleAddYear}
                disabled={!newYearInput}
                className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                TAMBAH TAHUN
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-3">SENARAI TAHUN DALAM SISTEM</p>
              <div className="flex flex-wrap gap-2">
                {availableYears.map(y => (
                  <span key={y} className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    {y}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    // Group tasks by category
    const tasksByCategory = filteredTasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

    const categoryOrder = [
      TaskCategory.PENTADBIRAN,
      TaskCategory.KURIKULUM,
      TaskCategory.HEM,
      TaskCategory.KOKURIKULUM,
      TaskCategory.ULUL_ALBAB
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 uppercase">CARIAN TUGASAN</h2>
            <p className="text-slate-500 text-sm uppercase">PILIH NAMA GURU UNTUK MELIHAT SENARAI TUGAS PADA TAHUN YANG DIPILIH.</p>
          </div>
          <div className="flex gap-2">
            {selectedTeacherId && filteredTasks.length > 0 && (
              <button 
                onClick={generatePDF}
                className="bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors inline-flex items-center shadow-sm uppercase text-sm shrink-0"
              >
                <Printer className="w-4 h-4 mr-2" />
                CETAK PDF
              </button>
            )}
            {isAdmin && (
              <button 
                onClick={() => setView('ADD_TASK')}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center shadow-sm uppercase text-sm shrink-0"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                TAMBAH DATA
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-5">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">
                <User className="w-4 h-4 inline mr-2 text-primary-500" /> 
                PILIH NAMA GURU
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full rounded-lg border-slate-300 border-2 p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white uppercase"
              >
                <option value="">-- SILA PILIH GURU --</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">
                <Filter className="w-4 h-4 inline mr-2 text-primary-500" /> 
                TAHUN
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full rounded-lg border-slate-300 border-2 p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-medium text-slate-700 bg-slate-50 focus:bg-white uppercase"
              >
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex items-center justify-end pb-3 text-slate-500 text-sm uppercase">
               {selectedTeacherId ? (
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium border border-primary-100 uppercase">
                    {filteredTasks.length} TUGASAN DITEMUI UNTUK TAHUN {selectedYear}
                  </span>
               ) : (
                 <span>SILA PILIH GURU UNTUK MEMAPARKAN DATA</span>
               )}
            </div>
          </div>
        </div>

        {/* Results Grouped by Category */}
        <div className="space-y-8">
          {selectedTeacherId ? (
            filteredTasks.length > 0 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {categoryOrder.map(category => {
                  const categoryTasks = tasksByCategory[category] || [];
                  if (categoryTasks.length === 0) return null;

                  return (
                    <div key={category} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                       <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
                         <Layers className="w-5 h-5 mr-3 text-slate-400" />
                         <h3 className="font-bold text-slate-700 uppercase tracking-wide">
                           {category}
                         </h3>
                         <span className="ml-auto bg-white text-slate-500 text-xs font-bold px-2 py-1 rounded border border-slate-200">
                           {categoryTasks.length} REKOD
                         </span>
                       </div>
                       <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/30">
                          {categoryTasks.map(task => (
                            <div key={task.id} className="relative group h-full">
                               <TaskCard task={task} onDelete={handleDeleteTask} isAdmin={isAdmin} />
                            </div>
                          ))}
                       </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 uppercase">TIADA TUGASAN DIREKODKAN</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2 uppercase">
                  GURU INI TIADA TUGASAN UNTUK TAHUN {selectedYear}.
                </p>
                {isAdmin && (
                  <button 
                    onClick={() => setView('ADD_TASK')}
                    className="mt-6 inline-flex items-center text-primary-600 font-medium hover:text-primary-700 px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors uppercase"
                  >
                    + TAMBAH REKOD SEKARANG
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="text-center py-24 bg-slate-100/50 rounded-xl border border-slate-200">
               <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
               <h3 className="text-xl font-semibold text-slate-700 uppercase">PILIH GURU</h3>
               <p className="text-slate-500 mt-2 uppercase">SILA PILIH NAMA GURU DI ATAS UNTUK MELIHAT SENARAI TUGAS.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    switch (view) {
      case 'DASHBOARD': return 'DASHBOARD UTAMA';
      case 'SEARCH': return 'SEMAKAN TUGASAN GURU';
      case 'ADD_TASK': return 'KEMASUKAN DATA';
      case 'STATISTICS': return 'STATISTIK & ANALISIS';
      case 'SETTINGS': return 'PENGURUSAN DATA';
      default: return 'SPTG';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg uppercase flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                AKSES PENTADBIR
              </h3>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-3">
                  <LogIn className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-slate-600 text-sm uppercase font-medium">SILA MASUKKAN KOD AKSES UNTUK MENERUSKAN.</p>
              </div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="KOD AKSES"
                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-primary-600 focus:ring-0 outline-none font-bold text-center tracking-widest text-lg mb-4 transition-colors"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg uppercase transition-colors shadow-lg shadow-primary-600/20"
              >
                LOG MASUK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="print:hidden">
        <Sidebar 
          currentView={view} 
          setView={setView} 
          isMobileOpen={isMobileNavOpen}
          setIsMobileOpen={setIsMobileNavOpen}
          isAdmin={isAdmin}
        />
      </div>

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300 print:ml-0 print:w-full">
        <div className="print:hidden">
          <Header 
            title={getPageTitle()} 
            onMenuClick={() => setIsMobileNavOpen(true)} 
            isAdmin={isAdmin}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onLogoutClick={handleLogout}
          />
        </div>

        <div className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full print:p-0 print:max-w-none">
          {view === 'DASHBOARD' && renderDashboard()}
          {view === 'SEARCH' && renderSearch()}
          {view === 'STATISTICS' && renderStatistics()}
          {view === 'SETTINGS' && renderSettings()}
          {view === 'ADD_TASK' && isAdmin && (
            <TaskForm 
              teachers={teachers} 
              availableYears={availableYears}
              onAddTask={handleAddTask} 
              onCancel={() => setView('SEARCH')} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
