export const calculateDeliveryFee = (subCity) => {
  const areaFees = {
    Bole: 100,
    Kazanchis: 80,
    Piassa: 120,
    Sarbet: 110,
    CMC: 150,
  };
  return areaFees[subCity] || 100;
};

export const getEstimatedDeliveryTime = () => {
  return "30–45 min";
};

// Alias export for backward compatibility across components
export const getDeliveryTimeEstimate = getEstimatedDeliveryTime;

export default {
  calculateDeliveryFee,
  getEstimatedDeliveryTime,
  getDeliveryTimeEstimate,
};