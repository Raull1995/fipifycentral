import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { Fuel, Hash, Calendar, Car, Clock, Zap, Shield, FileText, BarChart3, TrendingUp, Award } from 'lucide-react';

const TeaserResults: React.FC = () => {
  const { vehicleData } = useApi();
  const [showTeaser, setShowTeaser] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!vehicleData) return;

    // Show teaser for 8 seconds, then fade out
    const teaserTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowTeaser(false);
      }, 500); // Wait for fade out animation
    }, 8000);

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(teaserTimer);
      clearInterval(countdownTimer);
    };
  }, [vehicleData]);

  if (!vehicleData || !vehicleData.valor) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;

  if (showTeaser) {
    return (
      <div className={`transition-all duration-500 ${fadeOut ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-text font-orbitron">Prévia dos Resultados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-text font-orbitron">Informações Básicas</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Car className="text-secondary" size={18} />
                  <div>
                    <p className="text-text/60">Veículo:</p>
                    <p className="font-semibold text-text">{vehicleData.marca} {vehicleData.modelo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-secondary" size={18} />
                  <div>
                    <p className="text-text/60">Ano:</p>
                    <p className="font-semibold text-text">{vehicleData.ano}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-text/60">Valor FIPE:</p>
                  <p className="text-3xl font-bold text-secondary animate-pulse">{vehicleData.valor}</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6 animate-fade-in-delay">
              <h3 className="text-xl font-bold mb-4 text-text font-orbitron">Análise Rápida</h3>
              <div className="space-y-4">
                <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
                  <p className="text-text/80 mb-2">Desvalorização anual:</p>
                  <p className="text-2xl font-bold text-text">{vehicleData.desvalorizacao}%</p>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
                  <p className="text-text/80 mb-2">Classificação:</p>
                  <p className="text-lg font-semibold text-secondary">
                    {vehicleData.desvalorizacao <= 8 ? 'Boa valorização' : 
                     vehicleData.desvalorizacao <= 15 ? 'Normal' : 'Alta desvalorização'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm text-text/80">Carregando análise completa...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <FileText className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-text mb-4 font-orbitron">
              Relatório Completo em PDF
            </h2>
            <p className="text-text/80 text-lg mb-6">
              Desbloqueie a análise completa do seu <strong>{vehicleData.marca} {vehicleData.modelo}</strong> 
              com dados exclusivos e projeções detalhadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-text mb-4 font-orbitron">O que você vai receber:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Histórico completo de preços (5 anos)</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Comparação com 3 veículos similares</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Projeção de valor para 24 meses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Melhor época para vender</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Classificação de desvalorização</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90">Análise de custos de manutenção</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-text/90"><strong>Relatório em PDF para download</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-accent/50 p-6 rounded-lg border border-primary/20">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <p className="text-4xl font-bold font-orbitron">R$ 50</p>
                </div>
                <p className="text-text/60 text-sm">Pagamento único</p>
              </div>

              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-semibold text-sm">OFERTA LIMITADA</span>
                </div>
                <p className="text-red-300 text-sm">Esta oferta expira em:</p>
                <p className="text-red-400 font-bold text-xl font-mono">{formatTime(timeLeft)}</p>
              </div>

              <a
                href="https://pay.kiwify.com.br/KMn3hCh"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-orbitron text-lg text-center"
              >
                Comprar Relatório Completo
              </a>

              <p className="text-center text-text/60 text-xs mt-3">
                ✓ Pagamento seguro • ✓ Acesso imediato • ✓ Garantia de 7 dias
              </p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <p className="text-center text-text/80 text-sm">
              <strong>Exclusivo:</strong> Mais de 15 dados técnicos que você não encontra em outros lugares. 
              Análise feita por IA especializada em mercado automotivo brasileiro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaserResults;