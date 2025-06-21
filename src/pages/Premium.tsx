import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import { apiService } from '../services/apiService';
import { CreditCard, FileDown, Lock, BarChart, TrendingUp, Database } from 'lucide-react';

const Premium: React.FC = () => {
  const { vehicleData, setIsPremium } = useApi();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    document.title = "AutoValor - Exportar Dados";
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsPaid(true);
      setIsPremium(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDownloadCSV = () => {
    if (!vehicleData) return;
    const csvContent = apiService.generateCSV(vehicleData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `AutoValor_${vehicleData.marca}_${vehicleData.modelo}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!vehicleData && !isPaid) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Consulte um veículo primeiro</h2>
          <p className="text-gray-600 mb-6">
            Para exportar os dados completos, você precisa primeiro consultar um veículo na página inicial.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {isPaid ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <span className="inline-block p-4 rounded-full bg-green-100 mb-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold mb-2">Acesso Liberado!</h2>
              <p className="text-gray-600">
                Você agora tem acesso a todos os dados detalhados do seu veículo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Dados do Veículo</h3>
                {vehicleData && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600">Veículo:</p>
                      <p className="font-semibold">{vehicleData.marca} {vehicleData.modelo}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ano:</p>
                      <p className="font-semibold">{vehicleData.ano}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Valor FIPE:</p>
                      <p className="font-semibold">{vehicleData.valor}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Desvalorização Anual:</p>
                      <p className="font-semibold">{vehicleData.desvalorizacao}%</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Exportar Dados Completos</h3>
                <p className="text-gray-600 mb-6">
                  Baixe o arquivo CSV com todas as informações detalhadas do seu veículo.
                </p>
                <button 
                  onClick={handleDownloadCSV}
                  className="btn-secondary flex items-center justify-center mx-auto"
                >
                  <FileDown className="mr-2" size={20} />
                  Baixar Dados Completos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-2"></div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Dados Completos do Seu Veículo</h2>
                <p className="text-gray-600">
                  Por apenas R$ 50, tenha acesso a todas as informações detalhadas em um único arquivo
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">O Que Você Recebe</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <BarChart size={16} />
                      </span>
                      <div>
                        <p className="font-medium">Histórico de Preços</p>
                        <p className="text-sm text-gray-600">Variação de preços dos últimos 5 anos</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <TrendingUp size={16} />
                      </span>
                      <div>
                        <p className="font-medium">Análise de Mercado</p>
                        <p className="text-sm text-gray-600">Comparação com 10 modelos similares</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <Database size={16} />
                      </span>
                      <div>
                        <p className="font-medium">Dados Exclusivos</p>
                        <p className="text-sm text-gray-600">Informações não disponíveis em outros lugares</p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <strong>Exclusivo:</strong> Receba também projeções de custos de manutenção e valor de revenda para os próximos 24 meses.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <CreditCard className="mr-2 text-blue-600" />
                    Pagamento
                  </h3>
                  
                  <form onSubmit={handlePayment}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                          Nome no cartão
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-input"
                          placeholder="Nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-1">
                          Número do cartão
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-gray-700 font-medium mb-1">
                            Validade
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            className="form-input"
                            placeholder="MM/AA"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-gray-700 font-medium mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="form-input"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 text-sm text-gray-600">
                        <Lock size={16} className="mr-2" />
                        <span>Pagamento seguro com criptografia SSL</span>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          type="submit" 
                          className="btn-premium w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processando...' : 'Pagar R$ 50,00'}
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-2">
                          Pagamento único, sem mensalidade
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;