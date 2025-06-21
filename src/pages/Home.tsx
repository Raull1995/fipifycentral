import React, { useEffect } from 'react';
import FipeForm from '../components/FipeForm';
import ResultsSection from '../components/ResultsSection';
import { useApi } from '../context/ApiContext';
import { Car, TrendingUp, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const { vehicleData } = useApi();
  
  useEffect(() => {
    document.title = "Fipify - Avaliação Inteligente de Veículos";
  }, []);

  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-primary to-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-orbitron">
              Inteligência Artificial para Avaliar seu Veículo
            </h1>
            <p className="text-text/90 text-lg mb-8 font-orbitron">
              Descubra o valor preciso do seu carro com nossa tecnologia avançada de IA
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-background -mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5">
                <FipeForm />
              </div>
              
              <div className="lg:w-3/5">
                {vehicleData ? (
                  <ResultsSection />
                ) : (
                  <div className="card p-8 h-full">
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="p-4 bg-primary/10 rounded-full mb-6">
                        <Car className="w-8 h-8 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-semibold text-text mb-4 font-orbitron">
                        Consulte Seu Veículo
                      </h2>
                      <p className="text-text/80 mb-8 max-w-md">
                        Utilize nossa IA para obter uma análise detalhada e precisa do valor do seu veículo.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="p-4 bg-accent/50 rounded-lg text-center border border-primary/20">
                          <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <h3 className="font-medium text-text mb-1 font-orbitron">Precisão por IA</h3>
                          <p className="text-sm text-text/70">Análise avançada de dados</p>
                        </div>
                        
                        <div className="p-4 bg-accent/50 rounded-lg text-center border border-primary/20">
                          <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <h3 className="font-medium text-text mb-1 font-orbitron">Confiável</h3>
                          <p className="text-sm text-text/70">Tecnologia de ponta</p>
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

export default Home;