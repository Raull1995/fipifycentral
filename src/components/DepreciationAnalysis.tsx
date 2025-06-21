import React from 'react';
import { useApi } from '../context/ApiContext';
import { TrendingDown, Award, AlertTriangle } from 'lucide-react';

const DepreciationAnalysis: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData || !vehicleData.desvalorizacao) return null;

  const getDepreciationCategory = (depreciation: number) => {
    if (depreciation <= 8) {
      return {
        category: 'Boa valorização',
        color: 'text-green-400',
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-800',
        icon: Award,
        description: 'Seu carro desvalorizou menos que a média da categoria'
      };
    } else if (depreciation <= 15) {
      return {
        category: 'Desvalorização normal',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/20',
        borderColor: 'border-yellow-800',
        icon: TrendingDown,
        description: 'Desvalorização dentro do padrão esperado para a categoria'
      };
    } else {
      return {
        category: 'Desvalorização alta',
        color: 'text-red-400',
        bgColor: 'bg-red-900/20',
        borderColor: 'border-red-800',
        icon: AlertTriangle,
        description: 'Desvalorização acima da média da categoria'
      };
    }
  };

  const analysis = getDepreciationCategory(vehicleData.desvalorizacao);
  const IconComponent = analysis.icon;

  // Calculate category average (simulated)
  const categoryAverage = 12.5;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <TrendingDown className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Classificação de Desvalorização</h2>
      </div>

      <div className={`${analysis.bgColor} ${analysis.borderColor} border rounded-lg p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <IconComponent className={`w-6 h-6 ${analysis.color}`} />
          <h3 className={`text-lg font-semibold ${analysis.color}`}>{analysis.category}</h3>
        </div>
        
        <p className="text-text/80 mb-4">{analysis.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text/60 mb-1">Seu veículo</p>
            <p className="text-2xl font-bold text-text">{vehicleData.desvalorizacao}%</p>
          </div>
          <div>
            <p className="text-sm text-text/60 mb-1">Média da categoria</p>
            <p className="text-2xl font-bold text-text/70">{categoryAverage}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-text">Comparativo por período:</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">1 ano</p>
            <p className="font-semibold text-text">{(vehicleData.desvalorizacao / 3).toFixed(1)}%</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">2 anos</p>
            <p className="font-semibold text-text">{(vehicleData.desvalorizacao / 1.5).toFixed(1)}%</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">3 anos</p>
            <p className="font-semibold text-text">{vehicleData.desvalorizacao}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepreciationAnalysis;