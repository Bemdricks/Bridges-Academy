import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Our Approach', page: 'approach' },
  { label: 'Our Story', page: 'story' },
  { label: 'Families', page: 'families' },
  { label: 'Beyond', page: 'beyond' },
  { label: 'Get Involved', page: 'involved' },
];

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left"
            aria-label="Bridges Academy. Built to Belong. Built to Become."
          >
            <img
              src="/logo.png"
              alt=""
              className="h-[4.5rem] md:h-20 w-auto bg-white rounded-lg shrink-0"
            />
            <span className="font-display italic text-brand-800 text-sm sm:text-base leading-tight">
              Built to Belong.<br />Built to Become.
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-neutral-700 hover:text-brand-700 hover:bg-brand-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('families')}
              className="ml-3 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-brand-900 text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              Book a Visit
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-neutral-700 hover:bg-neutral-100"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 py-4 space-y-1 bg-white">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-neutral-700 hover:text-brand-700 hover:bg-brand-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <button
                onClick={() => handleNav('families')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-brand-900 font-semibold rounded-full transition-colors text-sm"
              >
                Book a Visit
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
