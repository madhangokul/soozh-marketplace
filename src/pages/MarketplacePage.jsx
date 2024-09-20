import React, { useEffect, useState, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import FilterComponent from '../components/FilterComponent';  // Import FilterComponent
import WritersCard from '../components/WritersCard';
import OriginalIpCard from '../components/OriginalIpCard';
import { getAssestsWriters, getAssestsOriginalIps } from '../services/marketplaceService';

const MarketplacePage = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('writers');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    languages: [],
    assetsLanguages: [],
    assetsAvailable: [],
    genres: [],
    formats: []
  });

  useEffect(() => {
    // Fetch filter options from the backend
    const fetchFilterOptions = async () => {
      try {
        const response = await axiosInstance.get('/marketplace/assets/originalips/filters');
        setFilterOptions(response.data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    // Reset state when the category or filters change
    setData([]); // Clear previous data
    setPage(1);  // Reset page to 1
    setHasMore(true); // Reset hasMore to true
    setLoading(true); // Show loading initially
    fetchMoreData(1, filters, searchQuery); // Fetch the first page of the new category or filters
  }, [selectedCategory, filters, searchQuery]);

  const fetchMoreData = async (pageNumber = page, filters = {}, searchQuery = '') => {
    if (loading || !hasMore) return;

    setLoading(true); // Prevent multiple simultaneous requests

    try {
      const response = await (selectedCategory === 'writers'
        ? getAssestsWriters(axiosInstance, pageNumber)
        : getAssestsOriginalIps(axiosInstance, pageNumber, filters, searchQuery)); // Pass filters and search query

      const newData = response.data;

      // Append new data to the existing data array
      setData((prevData) => [...prevData, ...newData]);

      // Update pagination state
      const { pagination } = response;
      setHasMore(pagination.hasMore); // Check if there's more data to load
      setPage((prevPage) => prevPage + 1); // Increment the page

    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false); // Stop further requests on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCardClick = (item) => {
    setSelectedData(item);
    setDialogOpen(true);
  };

  // Handle filters and search query from FilterComponent
  const applyFilters = (newFilters, searchQuery) => {
    setFilters(newFilters);
    setSearchQuery(searchQuery);
    setHasMore(true);  // Reset hasMore for new data
    setData([]);  // Clear previous data
    fetchMoreData(1, newFilters, searchQuery);  // Fetch new data starting from page 1
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', mt: 8, flexDirection: 'column' }}>
        {/* Filters */}
        { selectedCategory == "originalIps" &&
          <FilterComponent applyFilters={applyFilters} filterOptions={filterOptions} />}

        {/* Category switch buttons */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant={selectedCategory === 'writers' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('writers')}
            sx={{ mr: 2 }}
          >
            Writers
          </Button>
          <Button
            variant={selectedCategory === 'originalIps' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('originalIps')}
          >
            Original IPs
          </Button>
        </Box>

        {/* Gallery Component */}
        <Gallery
          data={data}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          handleCardClick={handleCardClick}
          CardComponent={selectedCategory === 'writers' ? WritersCard : OriginalIpCard}
        />

        {/* JSON Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default MarketplacePage;
