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

// src/services/marketplaceService.js

export const getAssestsWriters = async (axiosInstance, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/assets/writers?page=${page}&limit=${limit}`);
    return response.data;  // Assuming the API response includes data and pagination object
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export const getAssestsOriginalIps = async (axiosInstance, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/assets/originalips?page=${page}&limit=${limit}`);
    console.log(response.data)
    return response.data;  // Assuming the API response includes data and pagination object
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
