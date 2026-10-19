import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import OurApproach from '@/pages/OurApproach';
import OurStory from '@/pages/OurStory';
import Families from '@/pages/Families';
import Beyond from '@/pages/Beyond';
import GetInvolved from '@/pages/GetInvolved';

type Page = 'home' | 'approach' | 'story' | 'families' | 'beyond' | 'involved';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'approach':
        return <OurApproach onNavigate={setCurrentPage} />;
      case 'story':
        return <OurStory onNavigate={setCurrentPage} />;
      case 'families':
        return <Families onNavigate={setCurrentPage} />;
      case 'beyond':
        return <Beyond onNavigate={setCurrentPage} />;
      case 'involved':
        return <GetInvolved onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
