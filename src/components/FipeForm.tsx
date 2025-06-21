import React, { useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { Search } from 'lucide-react';

const FipeForm: React.FC = () => {
  const {
    brands,
    models,
    years,
    selectedBrand,
    selectedModel,
    selectedYear,
    loading,
    error,
    hasConsulted,
    premiumConsultationCount,
    fetchBrands,
    fetchModels,
    fetchYears,
    fetchVehicleData,
    setSelectedBrand,
    setSelectedModel,
    setSelectedYear
  } = useApi();

  const isThankYouPage = window.location.pathname === '/obrigado';

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchModels(selectedBrand);
      setSelectedModel('');
      setSelectedYear('');
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      fetchYears(selectedBrand, selectedModel);
      setSelectedYear('');
    }
  }, [selectedModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrand && selectedModel && selectedYear) {
      fetchVehicleData(selectedBrand, selectedModel, selectedYear);
    }
  };

  // Determine if form should be disabled
  const isFormDisabled = isThankYouPage ? premiumConsultationCount >= 1 : hasConsulted;

  return (
    <div className="bg-accent rounded-xl shadow-neon border border-primary/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Search className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-orbitron font-semibold text-text">
          {isThankYouPage ? 'Consulta Premium' : 'Consulta FIPE'}
        </h2>
      </div>

      {isThankYouPage && premiumConsultationCount >= 1 && (
        <div className="bg-yellow-900/20 text-yellow-400 p-4 rounded-lg mb-6 border border-yellow-800">
          <p className="text-sm font-medium">
            Você já utilizou sua consulta premium. Para fazer mais consultas, entre em contato conosco.
          </p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg mb-6 border border-red-800">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="brand" className="block text-sm font-orbitron font-medium text-text mb-2">
            Marca do Veículo
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="form-select"
            disabled={loading || brands.length === 0 || isFormDisabled}
            required
          >
            <option value="">Selecione uma marca</option>
            {brands.map((brand) => (
              <option key={brand.codigo} value={brand.codigo}>
                {brand.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-orbitron font-medium text-text mb-2">
            Modelo
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="form-select"
            disabled={loading || !selectedBrand || models.length === 0 || isFormDisabled}
            required
          >
            <option value="">Selecione um modelo</option>
            {models.map((model) => (
              <option key={model.codigo} value={model.codigo}>
                {model.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="year" className="block text-sm font-orbitron font-medium text-text mb-2">
            Ano do Veículo
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-select"
            disabled={loading || !selectedModel || years.length === 0 || isFormDisabled}
            required
          >
            <option value="">Selecione um ano</option>
            {years.map((year) => (
              <option key={year.codigo} value={year.codigo}>
                {year.nome}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={loading || !selectedBrand || !selectedModel || !selectedYear || isFormDisabled}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Consultando...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Consultar Agora</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FipeForm;