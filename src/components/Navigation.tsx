import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'about' | 'browse' | 'submissions' | 'author-guidelines' | 'open-access' | 'publishing-ethics' | 'reviewer-guidelines' | 'privacy-policy' | 'copyright-licensing' | 'terms-conditions' | 'accessibility' | 'contact') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'ABOUT CMJ',
      hasDropdown: true,
      page: null,
      submenu: [
        { label: 'ABOUT THE JOURNAL', page: 'about' as const },
      ],
    },
    { label: 'BROWSE CONTENT', hasDropdown: false, page: null, submenu: [] },
    { label: 'SUBMISSIONS', hasDropdown: false, page: 'submissions' as const, submenu: [] },
    {
      label: 'AUTHOR GUIDELINES',
      hasDropdown: true,
      page: null,
      submenu: [
        { label: 'INSTRUCTIONS FOR AUTHORS', page: 'author-guidelines' as const },
      ],
    },
    {
      label: 'JOURNAL POLICIES',
      hasDropdown: true,
      page: null,
      submenu: [
        { label: 'OPEN ACCESS POLICY', page: 'open-access' as const },
        { label: 'PUBLISHING ETHICS', page: 'publishing-ethics' as const },
        { label: 'REVIEWER GUIDELINES', page: 'reviewer-guidelines' as const },
        { label: 'COPYRIGHT & LICENSING', page: 'copyright-licensing' as const },
        { label: 'TERMS & CONDITIONS', page: 'terms-conditions' as const },
        { label: 'ACCESSIBILITY', page: 'accessibility' as const },
      ],
    },
    { label: 'CONTACT', hasDropdown: false, page: 'contact' as const, submenu: [] },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 relative">
      <div className="mx-auto px-12" style={{ maxWidth: '1500px' }}>
        <ul className="flex gap-6 py-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => item.page && onNavigate(item.page)}
                className={`flex items-center gap-1 hover:text-[#4195A3] transition-colors font-medium text-sm ${
                  item.submenu?.some((sub) => sub.page === currentPage || (currentPage === 'home' && sub.page === 'about')) || item.page === currentPage
                    ? 'text-[#4195A3]'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={16} />}
              </button>

              {item.hasDropdown && openDropdown === item.label && item.submenu && item.submenu.length > 0 && (
                <div className="absolute top-full left-0 mt-0 bg-white shadow-lg border border-gray-200 min-w-[200px] z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      type="button"
                      onClick={() => !(subItem as { disabled?: boolean }).disabled && subItem.page && onNavigate(subItem.page)}
                      disabled={(subItem as { disabled?: boolean }).disabled}
                      className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                        (subItem as { disabled?: boolean }).disabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-[#4195A3] hover:text-white'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
