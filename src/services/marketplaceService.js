// src/services/marketplaceService.js
export const getMarketplaceWelcome = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export const getAssestsWriters = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get('/assets/writers?page=1&limit=20');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export const getAssestsOriginalIps = async (axiosInstance) => {
  try {
    const response = await axiosInstance.get('/assets/originalips?page=1&limit=20');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
