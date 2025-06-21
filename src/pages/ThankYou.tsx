import React, { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import FipeForm from '../components/FipeForm';
import VehicleComparison from '../components/VehicleComparison';
import DepreciationAnalysis from '../components/DepreciationAnalysis';
import ResaleProjection from '../components/ResaleProjection';
import BestSellingTime from '../components/BestSellingTime';
import { FileDown, CheckCircle, Gift } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const ThankYou: React.FC = () => {
  const { vehicleData, setIsPremium } = useApi();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    document.title = "Obrigado pela sua compra! - Fipify";
    // Set premium access when user reaches this page
    setIsPremium(true);
  }, [setIsPremium]);

  const handleDownloadPDF = async () => {
    if (!vehicleData) return;
    
    setIsGeneratingPDF(true);
    try {
      await generatePDF(vehicleData);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Success Header */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
              Obrigado pela sua compra!
            </h1>
            <p className="text-white/90 text-lg mb-8 font-orbitron">
              Seu relatório exclusivo está quase pronto. Preencha os dados do seu veículo:
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background -mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* FIPE Form */}
              <div className="lg:w-2/5">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Gift className="w-5 h-5 text-secondary" />
                    </div>
                    <h2 className="text-xl font-semibold text-text font-orbitron">
                      Acesso Premium Liberado
                    </h2>
                  </div>
                  <p className="text-text/80 text-sm">
                    Agora você tem acesso completo a todas as análises avançadas do seu veículo.
                  </p>
                </div>
                <FipeForm />
              </div>
              
              {/* Results or Welcome Message */}
              <div className="lg:w-3/5">
                {vehicleData ? (
                  <div className="space-y-8">
                    {/* PDF Download Button */}
                    <div className="card p-6 text-center">
                      <h3 className="text-xl font-semibold text-text mb-4 font-orbitron">
                        Relatório Completo Disponível
                      </h3>
                      <p className="text-text/80 mb-6">
                        Baixe seu relatório completo em PDF com todas as análises detalhadas do seu {vehicleData.marca} {vehicleData.modelo}.
                      </p>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="btn-primary flex items-center justify-center gap-2 mx-auto"
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Gerando PDF...</span>
                          </>
                        ) : (
                          <>
                            <FileDown className="w-5 h-5" />
                            <span>Baixar Relatório em PDF</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Analysis Cards */}
                    <VehicleComparison />
                    <DepreciationAnalysis />
                    <ResaleProjection />
                    <BestSellingTime />
                  </div>
                ) : (
                  <div className="card p-8 h-full">
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="p-4 bg-primary/10 rounded-full mb-6">
                        <Gift className="w-8 h-8 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-semibold text-text mb-4 font-orbitron">
                        Bem-vindo ao Acesso Premium!
                      </h2>
                      <p className="text-text/80 mb-8 max-w-md">
                        Agora você tem acesso completo a todas as funcionalidades premium. 
                        Consulte seu veículo para ver todas as análises avançadas disponíveis.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="p-4 bg-accent/50 rounded-lg text-center border border-primary/20">
                          <FileDown className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <h3 className="font-medium text-text mb-1 font-orbitron">Relatório em PDF</h3>
                          <p className="text-sm text-text/70">Download completo dos dados</p>
                        </div>
                        
                        <div className="p-4 bg-accent/50 rounded-lg text-center border border-primary/20">
                          <CheckCircle className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <h3 className="font-medium text-text mb-1 font-orbitron">Análises Avançadas</h3>
                          <p className="text-sm text-text/70">Dados exclusivos e projeções</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;