
import React, { useState } from 'react';
import { Teacher, TaskCategory, Task } from '../types';
import { STANDARD_JOB_SCOPE, TASK_ROLES } from '../constants';
import { Save, XCircle, Plus, CheckCircle } from 'lucide-react';

interface TaskFormProps {
  teachers: Teacher[];
  availableYears: number[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>, shouldRedirect?: boolean) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ teachers, availableYears, onAddTask, onCancel }) => {
  const [teacherId, setTeacherId] = useState<string>('');
  const [year, setYear] = useState<number>(availableYears[0] || 2026);
  const [category, setCategory] = useState<TaskCategory>(TaskCategory.KURIKULUM);
  const [title, setTitle] = useState<string>('');
  const [role, setRole] = useState<string>('AJK');
  const [isManualTitle, setIsManualTitle] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleTaskSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value;
    setTitle(selectedTitle);
    
    if (selectedTitle) {
      // 1. Auto-detect category based on selection
      for (const [cat, tasks] of Object.entries(STANDARD_JOB_SCOPE)) {
        if (tasks.includes(selectedTitle)) {
          setCategory(cat as TaskCategory);
          break;
        }
      }

      // 2. Auto-detect Role based on Title Heuristics (Smart Suggestion)
      const t = selectedTitle.toUpperCase();
      let suggestedRole = 'AJK'; // Default fallback

      if (t.includes('NAIB PENGERUSI') || t.includes('TIMBALAN PENGERUSI')) {
        suggestedRole = t.includes('NAIB') ? 'NAIB PENGERUSI' : 'TIMBALAN PENGERUSI';
      } else if (t.includes('PENGERUSI')) {
        suggestedRole = 'PENGERUSI';
      } else if (t.includes('NAIB YANG DIPERTUA')) {
        suggestedRole = 'NAIB YANG DIPERTUA';
      } else if (t.includes('YANG DIPERTUA')) {
        suggestedRole = 'YANG DIPERTUA';
      } else if (t.startsWith('KP ') || t.includes('KETUA PANITIA') || t.includes('KETUA')) {
        suggestedRole = 'KETUA';
      } else if (t.includes('PENOLONG SETIAUSAHA') || t.includes('PEN. SETIAUSAHA')) {
        suggestedRole = 'PENOLONG SETIAUSAHA';
      } else if (t.startsWith('SU ') || t.includes('SETIAUSAHA')) {
        suggestedRole = 'SETIAUSAHA';
      } else if (t.includes('PENOLONG PENYELARAS')) {
        suggestedRole = 'PENOLONG PENYELARAS';
      } else if (t.includes('PENYELARAS')) {
        suggestedRole = 'PENYELARAS';
      } else if (t.includes('BENDAHARI')) {
        suggestedRole = 'BENDAHARI';
      } else if (t.includes('GURU DATA')) {
        suggestedRole = 'GURU DATA';
      } else if (t.includes('PEGAWAI ASET')) {
        suggestedRole = 'PEGAWAI ASET';
      } else if (t.includes('JURU AUDIT')) {
        suggestedRole = 'JURU AUDIT';
      }

      setRole(suggestedRole);
    }
  };

  const validate = () => {
    if (!teacherId || !title) {
      setError('SILA LENGKAPKAN SEMUA MAKLUMAT TERMASUK GURU DAN JAWATAN.');
      return false;
    }
    return true;
  };

  const handleSaveAndExit = () => {
    if (!validate()) return;
    
    onAddTask({
      teacherId,
      year,
      category,
      title: title.toUpperCase(),
      role: role.toUpperCase(),
      description: "" // Removed description field
    }, true);
  };

  const handleSaveAndAddAnother = () => {
    if (!validate()) return;

    onAddTask({
      teacherId,
      year,
      category,
      title: title.toUpperCase(),
      role: role.toUpperCase(),
      description: "" // Removed description field
    }, false);

    // Reset task fields only, keep Teacher and Year
    setTitle('');
    setRole('AJK');
    setIsManualTitle(false);
    setError('');
    setSuccessMessage('DATA BERJAYA DISIMPAN! SILA MASUKKAN TUGASAN SETERUSNYA.');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-primary-600 px-6 py-4 border-b border-primary-700 flex justify-between items-center">
        <h2 className="text-white font-semibold text-lg flex items-center uppercase">
          <Save className="w-5 h-5 mr-2" />
          KEMASUKAN DATA TUGASAN
        </h2>
        <button onClick={onCancel} className="text-primary-100 hover:text-white">
          <XCircle className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 uppercase font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200 uppercase font-bold flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-5 h-5 mr-2" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 uppercase">TAHUN LANTIKAN</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-semibold text-slate-700 uppercase"
            >
              {availableYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Teacher Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 uppercase">NAMA GURU</label>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all uppercase"
            >
              <option value="">-- SILA PILIH GURU --</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Task Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 uppercase">JAWATAN / TUGASAN</label>
          <div className="space-y-2">
            {!isManualTitle ? (
              <select
                value={title}
                onChange={handleTaskSelection}
                className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
              >
                <option value="">-- PILIH JAWATAN DARIPADA SENARAI --</option>
                {Object.entries(STANDARD_JOB_SCOPE).map(([cat, tasks]) => (
                  <optgroup key={cat} label={cat}>
                    {tasks.map(task => (
                      <option key={task} value={task}>{task}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                placeholder="MASUKKAN TAJUK TUGASAN MANUAL..."
                className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
              />
            )}
            
            <button
              type="button"
              onClick={() => {
                setIsManualTitle(!isManualTitle);
                setTitle('');
              }}
              className="text-xs text-primary-600 hover:text-primary-700 underline uppercase"
            >
              {isManualTitle ? "PILIH DARIPADA SENARAI STANDARD" : "JAWATAN TIADA DALAM SENARAI? MASUKKAN MANUAL"}
            </button>
          </div>
        </div>

        {/* Role & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 uppercase">PERANAN / JAWATAN</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
            >
              {TASK_ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 uppercase">KATEGORI</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
            >
              {Object.values(TaskCategory).map(cat => (
                 <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 uppercase flex-1 md:flex-none justify-center md:justify-start"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={handleSaveAndAddAnother}
            className="px-5 py-2.5 text-sm font-medium text-primary-700 bg-primary-100 border border-primary-200 rounded-lg hover:bg-primary-200 flex items-center justify-center uppercase flex-1 md:flex-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            SIMPAN & TAMBAH LAGI
          </button>
          <button
            type="button"
            onClick={handleSaveAndExit}
            className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm flex items-center justify-center uppercase flex-1 md:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            SIMPAN SEBAGAI DATA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
