import { useState } from 'react';
import { ArrowRight, Calendar, Menu, X } from 'lucide-react';
import logo from '../images/logo.png';
import { openInvolvedTab } from '@/lib/involvedTab';

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

  const openRsvp = () => {
    openInvolvedTab('rsvp', { scrollTo: 'rsvp-form' });
    onNavigate('involved');
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <button
        type="button"
        onClick={openRsvp}
        className="w-full bg-amber-500 hover:bg-amber-400 text-brand-900 transition-colors"
      >
        <span className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center sm:justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2 min-w-0">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="font-semibold truncate">Free Interest Meeting</span>
            <span className="hidden md:inline text-brand-900/80">December 2026 · 6 p.m. · Date and location coming soon</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-brand-900 text-white text-xs font-semibold px-3 py-1">
            RSVP <ArrowRight className="w-3 h-3" />
          </span>
        </span>
      </button>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left"
            aria-label="Carmel Academy. Built to Belong. Built to Become."
          >
            <img
              src={logo}
              alt=""
              className="h-[4.5rem] md:h-20 w-auto shrink-0"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
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
            className="lg:hidden p-2 rounded-lg transition-colors text-neutral-700 hover:bg-neutral-100"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-4 space-y-1 bg-white">
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
