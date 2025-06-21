import React, { createContext, useState, useContext, ReactNode } from 'react';
import { apiService } from '../services/apiService';

export interface Vehicle {
  marca: string;
  modelo: string;
  ano: string;
  valor: string;
  combustivel: string;
  codigo: string;
  referencia: string;
  desvalorizacao: number;
}

interface ApiContextType {
  brands: Array<{ codigo: string; nome: string }>;
  models: Array<{ codigo: string; nome: string }>;
  years: Array<{ codigo: string; nome: string }>;
  selectedBrand: string;
  selectedModel: string;
  selectedYear: string;
  vehicleData: Vehicle | null;
  loading: boolean;
  error: string | null;
  isPremium: boolean;
  hasConsulted: boolean;
  premiumConsultationCount: number;
  fetchBrands: () => Promise<void>;
  fetchModels: (brandId: string) => Promise<void>;
  fetchYears: (brandId: string, modelId: string) => Promise<void>;
  fetchVehicleData: (brandId: string, modelId: string, yearId: string) => Promise<void>;
  setSelectedBrand: (brandId: string) => void;
  setSelectedModel: (modelId: string) => void;
  setSelectedYear: (yearId: string) => void;
  setIsPremium: (value: boolean) => void;
  resetConsultation: () => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Array<{ codigo: string; nome: string }>>([]);
  const [models, setModels] = useState<Array<{ codigo: string; nome: string }>>([]);
  const [years, setYears] = useState<Array<{ codigo: string; nome: string }>>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [hasConsulted, setHasConsulted] = useState<boolean>(false);
  const [premiumConsultationCount, setPremiumConsultationCount] = useState<number>(0);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await apiService.getBrands();
      setBrands(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar marcas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (brandId: string) => {
    if (!brandId) return;
    setLoading(true);
    try {
      const data = await apiService.getModels(brandId);
      setModels(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar modelos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchYears = async (brandId: string, modelId: string) => {
    if (!brandId || !modelId) return;
    setLoading(true);
    try {
      const data = await apiService.getYears(brandId, modelId);
      setYears(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar anos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleData = async (brandId: string, modelId: string, yearId: string) => {
    if (!brandId || !modelId || !yearId) return;
    
    // Check if user is on thank you page (premium access)
    const isThankYouPage = window.location.pathname === '/obrigado';
    
    if (isThankYouPage) {
      // On thank you page, limit to 1 consultation
      if (premiumConsultationCount >= 1) {
        setError('Você já utilizou sua consulta premium. Para fazer mais consultas, entre em contato conosco.');
        return;
      }
    } else {
      // On home page, limit to 1 free consultation
      if (hasConsulted) {
        setError('Você já fez uma consulta gratuita. Para fazer mais consultas, adquira o acesso premium.');
        return;
      }
    }
    
    setLoading(true);
    try {
      const data = await apiService.getVehicleData(brandId, modelId, yearId);
      
      // Calculate a random depreciation value between 5-12% for demo purposes
      const depreciation = Math.round((Math.random() * 7 + 5) * 10) / 10;
      
      // Transform API response to match our Vehicle interface
      const transformedData: Vehicle = {
        marca: data.Marca || data.marca,
        modelo: data.Modelo || data.modelo,
        ano: data.AnoModelo?.toString() || data.ano,
        valor: data.Valor || data.valor,
        combustivel: data.Combustivel || data.combustivel,
        codigo: data.CodigoFipe || data.codigo,
        referencia: data.MesReferencia || data.referencia,
        desvalorizacao: depreciation
      };
      
      setVehicleData(transformedData);
      
      if (isThankYouPage) {
        setPremiumConsultationCount(prev => prev + 1);
      } else {
        setHasConsulted(true);
      }
      
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do veículo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetConsultation = () => {
    setHasConsulted(false);
    setVehicleData(null);
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setError(null);
    setPremiumConsultationCount(0);
  };

  const value = {
    brands,
    models,
    years,
    selectedBrand,
    selectedModel,
    selectedYear,
    vehicleData,
    loading,
    error,
    isPremium,
    hasConsulted,
    premiumConsultationCount,
    fetchBrands,
    fetchModels,
    fetchYears,
    fetchVehicleData,
    setSelectedBrand,
    setSelectedModel,
    setSelectedYear,
    setIsPremium,
    resetConsultation
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};