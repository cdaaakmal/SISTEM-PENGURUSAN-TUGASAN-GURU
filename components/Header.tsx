
import React from 'react';
import { Menu, UserCircle, LogIn, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title, isAdmin, onLoginClick, onLogoutClick }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 mr-4 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 truncate uppercase">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${isAdmin ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
          {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />}
          <span className="text-xs font-bold hidden sm:block uppercase">
            {isAdmin ? 'PENTADBIR' : 'TETAMU'}
          </span>
        </div>

        {isAdmin ? (
          <button 
            onClick={onLogoutClick}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="LOG KELUAR"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={onLoginClick}
            className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="LOG MASUK PENTADBIR"
          >
            <LogIn className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
