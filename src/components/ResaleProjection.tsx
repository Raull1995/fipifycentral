import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Calculator } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResaleProjection: React.FC = () => {
  const { vehicleData } = useApi();
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [projectedValue, setProjectedValue] = useState(0);
  const [savings, setSavings] = useState(0);
  const [chartData, setChartData] = useState<any>(null);

  const calculateHistoricalProjection = (currentValue: number, years: number) => {
    const historicalPrices = [
      currentValue * 1.08, // 1 year ago
      currentValue * 1.04, // 6 months ago
      currentValue * 1.02, // 3 months ago
      currentValue, // current
    ];

    const totalChange = (historicalPrices[3] - historicalPrices[0]) / historicalPrices[0];
    const annualRate = totalChange;

    const projectedValues = [...historicalPrices];
    let lastValue = currentValue;

    for (let i = 1; i <= years * 2; i++) {
      lastValue = lastValue * (1 + (annualRate / 2));
      projectedValues.push(lastValue);
    }

    return projectedValues;
  };

  useEffect(() => {
    if (!vehicleData?.valor) return;

    const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
    const years = parseFloat(selectedPeriod);
    const projectionValues = calculateHistoricalProjection(currentValue, years);
    const projected = projectionValues[projectionValues.length - 1];
    
    setProjectedValue(projected);
    setSavings(currentValue - projected);

    const labels = [];
    const now = new Date();
    
    for (let i = 12; i >= 0; i -= 3) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
    }

    for (let i = 3; i <= years * 12; i += 3) {
      const date = new Date(now);
      date.setMonth(date.getMonth() + i);
      labels.push(date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Valor do Veículo',
          data: projectionValues,
          borderColor: '#00FFFF',
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          tension: 0.4,
        },
      ],
    });
  }, [vehicleData, selectedPeriod]);

  if (!vehicleData || !vehicleData.valor) return null;

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
          <Calculator className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Projeção de Valor de Revenda</h2>
      </div>

      <div className="mb-6">
        <label htmlFor="period" className="block text-sm font-medium text-text/80 mb-2 font-orbitron">
          Prazo para Venda
        </label>
        <select
          id="period"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="form-select"
        >
          <option value="0.5">6 meses</option>
          <option value="1">1 ano</option>
          <option value="2">2 anos</option>
          <option value="3">3 anos</option>
          <option value="5">5 anos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-text/80 mb-1">Valor Projetado</p>
          <p className="text-2xl font-bold text-text">{formatCurrency(projectedValue)}</p>
        </div>

        <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-text/80 mb-1">Diferença de Valor</p>
          <p className="text-2xl font-bold text-text">{formatCurrency(Math.abs(savings))}</p>
        </div>
      </div>

      {chartData && (
        <div className="mt-6">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `Valor: ${formatCurrency(context.parsed.y)}`,
                  },
                  backgroundColor: 'rgba(46, 46, 46, 0.9)',
                  titleColor: '#F8F8FF',
                  bodyColor: '#F8F8FF',
                  borderColor: '#8A2BE2',
                  borderWidth: 1,
                },
              },
              scales: {
                y: {
                  grid: {
                    color: 'rgba(138, 43, 226, 0.1)',
                  },
                  ticks: {
                    callback: (value) => formatCurrency(value as number),
                    color: '#F8F8FF',
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(138, 43, 226, 0.1)',
                  },
                  ticks: {
                    color: '#F8F8FF',
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ResaleProjection;