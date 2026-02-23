import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Settings, HelpCircle, LogOut, FileText, Shield } from 'lucide-react';
import { User } from '../types/user';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
  onNavigateLogin: () => void;
  onNavigateEditProfile?: () => void;
  onNavigateMySubmissions?: () => void;
  user: User | null;
  onLogout: () => void;
}

export default function Header({ onNavigateHome, onNavigateRegister, onNavigateLogin, onNavigateEditProfile, onNavigateMySubmissions, user, onLogout }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-[#4195A3] text-white">
      <div className="mx-auto px-12 py-5 flex justify-between items-center" style={{ maxWidth: '1500px' }}>
        <button onClick={onNavigateHome} className="text-2xl font-bold tracking-wide hover:text-gray-200 transition-colors">
          CROATIAN MEDICAL JOURNAL
        </button>
        <div className="flex gap-6 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-gray-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-sm">
                  {user.initials || getUserInitials(user.name)}
                </div>
                <span>{user.name}</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                      <span>{user.name}</span>
                      {user.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#4195A3] text-white">
                          <Shield size={12} />
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigateMySubmissions?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FileText size={18} className="text-gray-500" />
                      <span>My Submissions</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigateEditProfile?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings size={18} className="text-gray-500" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        // TODO: Navigate to help page
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <HelpCircle size={18} className="text-gray-500" />
                      <span>Help</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut size={18} className="text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={onNavigateRegister} className="hover:text-gray-200 transition-colors font-medium">
                Register
              </button>
              <button onClick={onNavigateLogin} className="hover:text-gray-200 transition-colors font-medium">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
