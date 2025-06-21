import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Premium from './pages/Premium';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Header from './components/Header';
import Footer from './components/Footer';
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <ApiProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/obrigado" element={<ThankYou />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;