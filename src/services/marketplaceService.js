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
    const response = await axiosInstance.get(`/marketplace/assets/writers?page=${page}&limit=${limit}`);
    return response.data;  // Assuming the API response includes data and pagination object
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

// services/marketplaceService.js

export const getAssestsOriginalIps = async (axiosInstance, page = 1, filters = {}, search = '') => {
  const queryParams = new URLSearchParams({
    page,
    limit: 20,
    ...filters,  // Filters object will spread into the query
    search,      // Search query
  }).toString();

  try {
    const response = await axiosInstance.get(`/marketplace/assets/originalips?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

