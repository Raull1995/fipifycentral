import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-primary/20">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
          </div>
          <span className="font-orbitron font-bold text-3xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fipify
            </span>
          </span>
        </Link>
        
        <div className="hidden md:block">
          <p className="text-sm font-orbitron text-text/80">
            A plataforma inteligente para avaliar o valor do seu carro
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;