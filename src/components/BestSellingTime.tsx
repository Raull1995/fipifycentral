import React from 'react';
import { useApi } from '../context/ApiContext';
import { Calendar, TrendingUp } from 'lucide-react';

const BestSellingTime: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData) return null;

  // Simulate best selling periods based on market patterns
  const getBestSellingPeriod = () => {
    const periods = [
      {
        period: 'Janeiro a Março',
        reason: 'Período de bônus e férias, maior demanda por veículos',
        valueIncrease: 3.5
      },
      {
        period: 'Novembro a Dezembro',
        reason: 'Final de ano, 13º salário e preparação para o próximo ano',
        valueIncrease: 2.8
      },
      {
        period: 'Abril a Maio',
        reason: 'Após pagamento do IPVA, mercado mais aquecido',
        valueIncrease: 1.5
      }
    ];

    return periods[0]; // Return the best period
  };

  const bestPeriod = getBestSellingPeriod();
  const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
  const projectedValue = currentValue * (1 + bestPeriod.valueIncrease / 100);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calendar className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Melhor Época para Vender</h2>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-secondary" />
          <h3 className="text-lg font-semibold text-text">Período Recomendado</h3>
        </div>
        
        <p className="text-2xl font-bold text-secondary mb-2">{bestPeriod.period}</p>
        <p className="text-text/80 mb-4">{bestPeriod.reason}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Valor atual</p>
            <p className="text-lg font-semibold text-text">{vehicleData.valor}</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Valor projetado</p>
            <p className="text-lg font-semibold text-secondary">{formatCurrency(projectedValue)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-text">Histórico sazonal:</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg border border-primary/10">
            <span className="text-text">Jan - Mar</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-accent rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-green-400 text-sm">+3.5%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg border border-primary/10">
            <span className="text-text">Abr - Jun</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-accent rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-yellow-400 text-sm">+1.5%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg border border-primary/10">
            <span className="text-text">Jul - Set</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-accent rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-red-400 text-sm">-1.2%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-accent/30 rounded-lg border border-primary/10">
            <span className="text-text">Out - Dez</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-accent rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-blue-400 text-sm">+2.8%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
        <p className="text-sm text-text/80">
          <strong>Dica:</strong> Baseado nos últimos 3 anos, veículos do seu segmento 
          costumam ter maior valorização no primeiro trimestre do ano.
        </p>
      </div>
    </div>
  );
};

export default BestSellingTime;