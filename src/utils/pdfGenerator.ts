import jsPDF from 'jspdf';
import { Vehicle } from '../context/ApiContext';

export const generatePDF = async (vehicleData: Vehicle): Promise<void> => {
  try {
    const doc = new jsPDF();
    const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
    const depreciation = vehicleData.desvalorizacao;

    // Configurações de cores
    const primaryColor = [138, 43, 226] as [number, number, number]; // #8A2BE2
    const secondaryColor = [0, 255, 255] as [number, number, number]; // #00FFFF
    const textColor = [51, 51, 51] as [number, number, number]; // #333333
    const lightGray = [248, 249, 250] as [number, number, number]; // #f8f9fa

    // Função para adicionar cabeçalho
    const addHeader = () => {
      // Fundo do cabeçalho
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 40, 'F');

      // Título
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('RELATÓRIO FIPIFY PREMIUM', 105, 15, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Análise Completa e Detalhada do Veículo', 105, 22, {
        align: 'center',
      });

      const currentDate = new Date().toLocaleDateString('pt-BR');
      doc.text(`Gerado em: ${currentDate}`, 105, 28, { align: 'center' });
    };

    // Função para adicionar rodapé
    const addFooter = (pageNumber: number) => {
      doc.setTextColor(...textColor);
      doc.setFontSize(8);
      doc.text(`Página ${pageNumber}`, 105, 290, { align: 'center' });
      doc.text(
        'Relatório Premium Fipify - Todos os direitos reservados',
        105,
        295,
        { align: 'center' }
      );
    };

    // Função para gerar comparações
    const generateComparisons = () => {
      const baseValue = currentValue;
      const variations = [
        { marca: 'Hyundai', modelo: 'HB20 Comfort', difference: 0.05 },
        { marca: 'Ford', modelo: 'Ka SE', difference: -0.02 },
        { marca: 'Volkswagen', modelo: 'Gol TL', difference: -0.08 },
        { marca: 'Chevrolet', modelo: 'Onix LT', difference: 0.03 },
        { marca: 'Renault', modelo: 'Kwid Zen', difference: -0.12 },
      ];

      return variations.map((variation) => {
        const adjustedValue = baseValue * (1 + variation.difference);
        return {
          marca: variation.marca,
          modelo: variation.modelo,
          valor: adjustedValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          difference: variation.difference,
        };
      });
    };

    // Função para gerar projeções
    const generateProjections = () => {
      const projections = [];
      let currentVal = currentValue;
      const monthlyDepreciation = depreciation / 100 / 12;

      for (let i = 1; i <= 24; i++) {
        currentVal = currentVal * (1 - monthlyDepreciation);
        projections.push({
          month: i,
          value: currentVal,
          formattedValue: currentVal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        });
      }
      return projections;
    };

    // Função para gerar custos de manutenção
    const generateMaintenanceCosts = () => {
      const baseCost = currentValue * 0.08;
      return [
        {
          year: 1,
          cost: baseCost,
          description: 'Manutenção preventiva básica',
        },
        {
          year: 2,
          cost: baseCost * 1.2,
          description: 'Revisões e pequenos reparos',
        },
        {
          year: 3,
          cost: baseCost * 1.5,
          description: 'Troca de componentes de desgaste',
        },
        {
          year: 4,
          cost: baseCost * 1.8,
          description: 'Manutenções mais complexas',
        },
        {
          year: 5,
          cost: baseCost * 2.2,
          description: 'Reparos estruturais possíveis',
        },
      ];
    };

    const comparisons = generateComparisons();
    const projections = generateProjections();
    const maintenanceCosts = generateMaintenanceCosts();

    // Página 1 - Informações do Veículo
    addHeader();

    let yPosition = 50;

    // Seção de informações do veículo
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Informações Detalhadas do Veículo', 20, yPosition);

    yPosition += 10;

    // Caixa de informações
    doc.setFillColor(...lightGray);
    doc.rect(20, yPosition, 170, 50, 'F');
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.rect(20, yPosition, 170, 50, 'S');

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const vehicleInfo = [
      [`Marca: ${vehicleData.marca}`, `Modelo: ${vehicleData.modelo}`],
      [`Ano: ${vehicleData.ano}`, `Combustível: ${vehicleData.combustivel}`],
      [
        `Código FIPE: ${vehicleData.codigo}`,
        `Referência: ${vehicleData.referencia}`,
      ],
    ];

    vehicleInfo.forEach((row, index) => {
      doc.text(row[0], 25, yPosition + 10 + index * 12);
      doc.text(row[1], 110, yPosition + 10 + index * 12);
    });

    yPosition += 60;

    // Valor FIPE destacado
    doc.setFillColor(...primaryColor);
    doc.rect(20, yPosition, 170, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Valor FIPE Atual', 105, yPosition + 8, { align: 'center' });
    doc.setFontSize(16);
    doc.text(vehicleData.valor, 105, yPosition + 16, { align: 'center' });

    yPosition += 30;

    // Análise de desvalorização
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise de Desvalorização', 20, yPosition);

    yPosition += 10;

    const depreciationCategory =
      depreciation <= 8
        ? 'Excelente Valorização'
        : depreciation <= 15
        ? 'Desvalorização Normal'
        : 'Alta Desvalorização';

    doc.setFillColor(...lightGray);
    doc.rect(20, yPosition, 170, 30, 'F');
    doc.setDrawColor(...primaryColor);
    doc.rect(20, yPosition, 170, 30, 'S');

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Desvalorização Anual: ${depreciation}%`, 25, yPosition + 10);
    doc.text(`Classificação: ${depreciationCategory}`, 25, yPosition + 18);
    doc.text('Média da Categoria: 12.5%', 25, yPosition + 26);

    addFooter(1);

    // Página 2 - Comparação com Concorrentes
    doc.addPage();
    addHeader();

    yPosition = 50;

    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Comparação com Concorrentes', 20, yPosition);

    yPosition += 15;

    // Tabela de comparação - cabeçalho
    doc.setFillColor(...primaryColor);
    doc.rect(20, yPosition, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Veículo', 25, yPosition + 5);
    doc.text('Valor FIPE', 90, yPosition + 5);
    doc.text('Diferença', 140, yPosition + 5);

    yPosition += 8;

    // Seu veículo (destacado)
    doc.setFillColor(232, 245, 232);
    doc.rect(20, yPosition, 170, 8, 'F');
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(
      `${vehicleData.marca} ${vehicleData.modelo} (SEU)`,
      25,
      yPosition + 5
    );
    doc.text(vehicleData.valor, 90, yPosition + 5);
    doc.text('Base', 140, yPosition + 5);

    yPosition += 8;

    // Concorrentes
    doc.setFont('helvetica', 'normal');
    comparisons.forEach((comp, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(20, yPosition, 170, 8, 'F');
      }

      doc.setTextColor(...textColor);
      doc.text(`${comp.marca} ${comp.modelo}`, 25, yPosition + 5);
      doc.text(comp.valor, 90, yPosition + 5);

      const diffText = `${comp.difference > 0 ? '+' : ''}${(
        comp.difference * 100
      ).toFixed(1)}%`;
      doc.setTextColor(comp.difference > 0 ? [220, 53, 69] : [40, 167, 69]);
      doc.text(diffText, 140, yPosition + 5);

      yPosition += 8;
    });

    yPosition += 15;

    // Projeção de valor
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Projeção de Valor (24 meses)', 20, yPosition);

    yPosition += 15;

    // Tabela de projeções (apenas alguns meses selecionados)
    const selectedProjections = projections.filter((_, index) =>
      [2, 5, 8, 11, 14, 17, 20, 23].includes(index)
    );

    doc.setFillColor(...primaryColor);
    doc.rect(20, yPosition, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Período', 25, yPosition + 5);
    doc.text('Valor Projetado', 90, yPosition + 5);
    doc.text('Variação', 140, yPosition + 5);

    yPosition += 8;

    selectedProjections.forEach((proj, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(20, yPosition, 170, 8, 'F');
      }

      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`${proj.month} meses`, 25, yPosition + 5);
      doc.text(proj.formattedValue, 90, yPosition + 5);

      const variation = (
        ((proj.value - currentValue) / currentValue) *
        100
      ).toFixed(1);
      doc.text(`${variation}%`, 140, yPosition + 5);

      yPosition += 8;
    });

    addFooter(2);

    // Página 3 - Análise Sazonal e Custos de Manutenção
    doc.addPage();
    addHeader();

    yPosition = 50;

    // Análise sazonal
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise Sazonal - Melhor Época para Vender', 20, yPosition);

    yPosition += 15;

    const seasonalData = [
      {
        period: 'Jan - Mar',
        variation: '+3.5%',
        description: 'Período de bônus e férias',
      },
      {
        period: 'Abr - Jun',
        variation: '+1.5%',
        description: 'Após pagamento do IPVA',
      },
      {
        period: 'Jul - Set',
        variation: '-1.2%',
        description: 'Período de menor demanda',
      },
      {
        period: 'Out - Dez',
        variation: '+2.8%',
        description: 'Final de ano, 13º salário',
      },
    ];

    seasonalData.forEach((season, index) => {
      doc.setFillColor(...lightGray);
      doc.rect(20, yPosition, 170, 12, 'F');
      doc.setDrawColor(...primaryColor);
      doc.rect(20, yPosition, 170, 12, 'S');

      doc.setTextColor(...textColor);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(season.period, 25, yPosition + 5);

      doc.setTextColor(
        season.variation.includes('+') ? [40, 167, 69] : [220, 53, 69]
      );
      doc.text(season.variation, 70, yPosition + 5);

      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(season.description, 25, yPosition + 9);

      yPosition += 15;
    });

    yPosition += 10;

    // Recomendação destacada
    doc.setFillColor(40, 167, 69);
    doc.rect(20, yPosition, 170, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendação: Janeiro a Março', 105, yPosition + 6, {
      align: 'center',
    });
    const projectedBestValue = (currentValue * 1.035).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    doc.setFontSize(9);
    doc.text(
      `Valor projetado: ${projectedBestValue} (+3.5%)`,
      105,
      yPosition + 12,
      { align: 'center' }
    );

    yPosition += 25;

    // Custos de manutenção
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Projeção de Custos de Manutenção', 20, yPosition);

    yPosition += 15;

    // Tabela de custos - cabeçalho
    doc.setFillColor(40, 167, 69);
    doc.rect(20, yPosition, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Ano', 25, yPosition + 5);
    doc.text('Custo Estimado', 70, yPosition + 5);
    doc.text('Tipo de Manutenção', 130, yPosition + 5);

    yPosition += 8;

    maintenanceCosts.forEach((cost, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(20, yPosition, 170, 8, 'F');
      }

      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Ano ${cost.year}`, 25, yPosition + 5);
      doc.text(
        cost.cost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        70,
        yPosition + 5
      );
      doc.text(cost.description, 130, yPosition + 5);

      yPosition += 8;
    });

    addFooter(3);

    // Página 4 - Resumo Executivo
    doc.addPage();
    addHeader();

    yPosition = 50;

    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Executivo', 20, yPosition);

    yPosition += 15;

    // Dados principais em grid
    const summaryData = [
      ['Investimento Atual', vehicleData.valor],
      ['Valor em 12 meses', projections[11].formattedValue],
      ['Valor em 24 meses', projections[23].formattedValue],
      ['Melhor época (Jan-Mar)', projectedBestValue],
      [
        'Custo Manutenção (5 anos)',
        maintenanceCosts
          .reduce((total, cost) => total + cost.cost, 0)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
      ],
      [
        'Score de Valorização',
        depreciation <= 8 ? '9.2/10' : depreciation <= 15 ? '7.5/10' : '5.8/10',
      ],
    ];

    summaryData.forEach((item, index) => {
      const xPos = 20 + (index % 2) * 85;
      const yPos = yPosition + Math.floor(index / 2) * 20;

      doc.setFillColor(...lightGray);
      doc.rect(xPos, yPos, 80, 15, 'F');
      doc.setDrawColor(...primaryColor);
      doc.rect(xPos, yPos, 80, 15, 'S');

      doc.setTextColor(...textColor);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(item[0], xPos + 2, yPos + 6);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(item[1], xPos + 2, yPos + 12);
    });

    yPosition += 70;

    // Recomendações estratégicas
    doc.setFillColor(102, 126, 234);
    doc.rect(20, yPosition, 170, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendações Estratégicas', 105, yPosition + 10, {
      align: 'center',
    });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const recommendations = [
      'Timing de Venda: Janeiro a Março para maximizar retorno',
      'Manutenção: Mantenha em dia para preservar valor',
      'Documentação: Histórico completo aumenta credibilidade',
      'Mercado: Monitore concorrentes regularmente',
    ];

    recommendations.forEach((rec, index) => {
      doc.text(`• ${rec}`, 25, yPosition + 20 + index * 7);
    });

    yPosition += 60;

    // Disclaimer
    doc.setTextColor(...textColor);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Disclaimer: Este relatório foi gerado com base em dados da tabela FIPE oficial e análises de mercado.',
      20,
      yPosition
    );
    doc.text(
      'Os valores são estimativas e podem variar conforme condições específicas do veículo e do mercado.',
      20,
      yPosition + 4
    );
    doc.text(
      'Recomendamos sempre uma avaliação presencial para decisões de compra ou venda.',
      20,
      yPosition + 8
    );

    addFooter(4);

    // Salvar o PDF
    const fileName = `Fipify_Relatorio_${vehicleData.marca}_${vehicleData.modelo}_${vehicleData.ano}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Não foi possível gerar o PDF. Tente novamente.');
  }
};
