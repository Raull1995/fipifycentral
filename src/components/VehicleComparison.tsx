import React from 'react';
import { useApi } from '../context/ApiContext';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface ComparisonVehicle {
  marca: string;
  modelo: string;
  ano: string;
  valor: string;
  difference: number;
}

const VehicleComparison: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData || !vehicleData.valor) return null;

  const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;

  // Generate similar vehicles for comparison (simulated data)
  const generateComparisons = (): ComparisonVehicle[] => {
    const baseValue = currentValue;
    const variations = [
      { marca: 'Hyundai', modelo: 'HB20 Comfort', difference: 0.05 },
      { marca: 'Ford', modelo: 'Ka SE', difference: -0.02 },
      { marca: 'Volkswagen', modelo: 'Gol TL', difference: -0.08 }
    ];

    return variations.map(variation => {
      const adjustedValue = baseValue * (1 + variation.difference);
      return {
        marca: variation.marca,
        modelo: variation.modelo,
        ano: vehicleData.ano,
        valor: adjustedValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        difference: variation.difference
      };
    });
  };

  const comparisons = generateComparisons();

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
          <BarChart3 className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Comparação com Veículos Similares</h2>
      </div>

      <div className="mb-4">
        <div className="bg-accent/50 p-4 rounded-lg border border-primary/20 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-text">{vehicleData.marca} {vehicleData.modelo}</p>
              <p className="text-sm text-text/70">{vehicleData.ano} - Seu veículo</p>
            </div>
            <p className="text-lg font-bold text-secondary">{vehicleData.valor}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text/80 mb-3">Concorrentes diretos:</h3>
        {comparisons.map((vehicle, index) => (
          <div key={index} className="bg-accent/30 p-4 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">{vehicle.marca} {vehicle.modelo}</p>
                <p className="text-sm text-text/70">{vehicle.ano}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-text">{vehicle.valor}</p>
                <div className="flex items-center gap-1">
                  {vehicle.difference > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-400" />
                  )}
                  <span className={`text-sm ${vehicle.difference > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {vehicle.difference > 0 ? '+' : ''}{(vehicle.difference * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-sm text-text/80">
          <strong>Análise:</strong> Seu veículo está bem posicionado no mercado. 
          Os valores mostram que você fez uma boa escolha considerando o segmento e ano do veículo.
        </p>
      </div>
    </div>
  );
};

export default VehicleComparison;