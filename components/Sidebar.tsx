
import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Search, PlusCircle, GraduationCap, PieChart, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileOpen, setIsMobileOpen, isAdmin }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'DASHBOARD UTAMA', icon: LayoutDashboard, public: true },
    { id: 'SEARCH', label: 'SEMAKAN TUGASAN', icon: Search, public: true },
    { id: 'STATISTICS', label: 'STATISTIK', icon: PieChart, public: true },
    { id: 'ADD_TASK', label: 'TAMBAH DATA', icon: PlusCircle, public: false },
    { id: 'SETTINGS', label: 'PENGURUSAN DATA', icon: Settings, public: false },
  ];

  const handleNavClick = (view: string) => {
    setView(view as ViewState);
    setIsMobileOpen(false);
  };

  const filteredItems = menuItems.filter(item => item.public || isAdmin);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo / Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <GraduationCap className="w-8 h-8 text-primary-600 mr-3" />
            <span className="font-bold text-lg text-slate-800 tracking-tight uppercase">SPTG SISTEM</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors uppercase
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded p-3">
              <p className="text-xs text-slate-500 font-medium uppercase">VERSI SISTEM</p>
              <p className="text-xs text-slate-400">V1.0.4 (BETA)</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
