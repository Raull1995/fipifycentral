const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNWRlNjFhYi01OWU5LTRkY2YtYTNiYS1jZGVmYTIxMjJhZDAiLCJlbWFpbCI6InJhdWxzaWx2YWEyQGdtYWlsLmNvbSIsImlhdCI6MTc0NzE3MzE1OH0.0VjSiQwL7eZUkxkWWO1p0yJ5sIMkpz7UgMlyw3D3iUc";
const BASE_URL = "https://parallelum.com.br/fipe/api/v1/carros";

const headers = {
  "Authorization": `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json"
};

export const apiService = {
  getBrands: async () => {
    try {
      const response = await fetch(`${BASE_URL}/marcas`, { headers });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  getModels: async (brandId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos`, { headers });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.modelos;
    } catch (error) {
      console.error("Error fetching models:", error);
      throw error;
    }
  },

  getYears: async (brandId: string, modelId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos`, { headers });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching years:", error);
      throw error;
    }
  },

  getVehicleData: async (brandId: string, modelId: string, yearId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`, { headers });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return {
        ...data,
        // Ensure all required fields are present with fallback values
        Marca: data.Marca || '',
        Modelo: data.Modelo || '',
        AnoModelo: data.AnoModelo || '',
        Valor: data.Valor || 'R$ 0,00',
        Combustivel: data.Combustivel || '',
        CodigoFipe: data.CodigoFipe || '',
        MesReferencia: data.MesReferencia || ''
      };
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      throw error;
    }
  },

  generateCSV: (vehicleData: any) => {
    // Generate projected values for next 12 months
    const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
    const depreciation = vehicleData.desvalorizacao / 100;
    
    let csvContent = "Mês,Valor Projetado,Custo por km\n";
    let currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      
      // Calculate projected value with compounded monthly depreciation
      const monthlyDepreciation = depreciation / 12;
      const projectedValue = currentValue * Math.pow(1 - monthlyDepreciation, i + 1);
      
      // Calculate a simulated cost per km (random but related to value)
      const costPerKm = (projectedValue / 50000 + 0.5 + (Math.random() * 0.1)).toFixed(2);
      
      csvContent += `${month}/${year},${projectedValue.toFixed(2)},${costPerKm}\n`;
    }
    
    return csvContent;
  }
};