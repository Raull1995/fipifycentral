import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent/50 text-text/80 py-8 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-text/80 text-sm font-orbitron">Seu carro, nossa inteligência artificial. Seu futuro, nossa missão.</p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/privacy" className="text-text/60 hover:text-text transition-colors text-sm font-orbitron">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-text/60 hover:text-text transition-colors text-sm font-orbitron">
              Termos de Uso
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary/20 text-center">
          <p className="text-sm text-text/60 font-orbitron">&copy; {new Date().getFullYear()} Fipify. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;