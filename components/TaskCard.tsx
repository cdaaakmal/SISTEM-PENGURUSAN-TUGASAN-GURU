
import React, { useState } from 'react';
import { Task, TaskCategory } from '../types';
import { Calendar, Tag, Briefcase, UserCog, Trash2, AlertTriangle, X, Check } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const getCategoryColor = (category: TaskCategory) => {
  switch (category) {
    case TaskCategory.KURIKULUM: return 'bg-blue-100 text-blue-700 border-blue-200';
    case TaskCategory.HEM: return 'bg-green-100 text-green-700 border-green-200';
    case TaskCategory.KOKURIKULUM: return 'bg-orange-100 text-orange-700 border-orange-200';
    case TaskCategory.PENTADBIRAN: return 'bg-purple-100 text-purple-700 border-purple-200';
    case TaskCategory.ULUL_ALBAB: return 'bg-teal-100 text-teal-700 border-teal-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, isAdmin }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col relative">
      
      {/* Confirmation Overlay */}
      {isConfirming && (
        <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="bg-red-100 p-3 rounded-full mb-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="text-slate-800 font-bold uppercase mb-2">ADAKAH ANDA PASTI?</h4>
          <p className="text-slate-500 text-xs mb-6 uppercase">TINDAKAN INI AKAN MEMADAM TUGASAN INI SECARA KEKAL.</p>
          <div className="flex space-x-3 w-full">
            <button 
              onClick={() => setIsConfirming(false)}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-1" /> BATAL
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-1" /> PADAM
            </button>
          </div>
        </div>
      )}

      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getCategoryColor(task.category)}`}>
            {task.category.replace('PENGURUSAN ', '')}
          </span>
          <div className="flex items-center text-slate-400 text-xs font-medium uppercase">
            <Calendar className="w-3 h-3 mr-1" />
            {task.year}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight flex items-start uppercase">
          <Briefcase className="w-5 h-5 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
          {task.title}
        </h3>

        <div className="mb-3 pl-7">
           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
             <UserCog className="w-3 h-3 mr-1.5" />
             {task.role}
           </span>
        </div>
        
        {task.description && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 pl-7 uppercase">
            {task.description}
          </p>
        )}
      </div>
      
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center">
          <Tag className="w-3.5 h-3.5 mr-2" />
          <span className="font-mono uppercase">#{task.id}</span>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsConfirming(true)}
            className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
            title="PADAM TUGASAN"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
