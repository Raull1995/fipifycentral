import React from 'react';
import { useApi } from '../context/ApiContext';
import TeaserResults from './TeaserResults';

const ResultsSection: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData || !vehicleData.valor) {
    return null;
  }

  return <TeaserResults />;
};

export default ResultsSection;