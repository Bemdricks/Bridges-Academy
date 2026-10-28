import { MapPin, Mail } from 'lucide-react';
import logo from '../images/logo-white.png';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-brand-900 text-white">
      {/* Interest form CTA strip */}
      <div className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-2xl text-brand-900">Is Carmel the right fit for your family?</p>
            <p className="text-brand-800 mt-1">Tell us a little about your family. It takes about a minute.</p>
          </div>
          <button
            onClick={() => handleNav('families')}
            className="flex-shrink-0 px-8 py-3.5 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-colors text-sm"
          >
            Join the Interest List
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <span className="rounded-xl p-2 shrink-0 inline-flex">
                <img src={logo} alt="Carmel Academy" className="h-16 md:h-[4.5rem] w-auto" />
              </span>
            </div>
            <p className="text-brand-400 text-sm leading-relaxed max-w-sm">
              A new K–3 school in the Stockbridge area of Henry County, Georgia. Opening August 2027.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-brand-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-300 flex-shrink-0" />
                <span>Stockbridge area, Henry County, Georgia</span>
              </div>
              <div className="flex items-center gap-2 text-brand-400 text-sm">
                <Mail className="w-4 h-4 text-brand-300 flex-shrink-0" />
                <span>info@carmelacademy.school</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Approach', page: 'approach' as Page },
                { label: 'Our Story', page: 'story' as Page },
                { label: 'Families', page: 'families' as Page },
                { label: 'Beyond', page: 'beyond' as Page },
                { label: 'Get Involved', page: 'involved' as Page },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="text-brand-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Take Action</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('families')} className="text-brand-400 hover:text-white text-sm transition-colors">
                  Join the Interest List
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('families')} className="text-brand-400 hover:text-white text-sm transition-colors">
                  Book a Visit
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('involved')} className="text-brand-400 hover:text-white text-sm transition-colors">
                  RSVP – Interest Meeting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('involved')} className="text-brand-400 hover:text-white text-sm transition-colors">
                  Partner With Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('involved')} className="text-brand-400 hover:text-white text-sm transition-colors">
                  Join Our Team
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-400 text-xs">
            &copy; {new Date().getFullYear()} Carmel Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-brand-500 hover:text-white text-xs transition-colors">Staff</a>
            <p className="text-brand-400 text-xs">
              Stockbridge &bull; McDonough &bull; Locust Grove &bull; Henry County, GA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
