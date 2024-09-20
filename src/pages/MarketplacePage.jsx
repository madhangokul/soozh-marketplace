import React, { useEffect, useState, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { Box, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import FilterComponent from '../components/FilterComponent';
import WritersCard from '../components/WritersCard';
import OriginalIpCard from '../components/OriginalIpCard';
import { getAssestsWriters, getAssestsOriginalIps } from '../services/marketplaceService';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const MarketplacePage = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('writers');
  const [expandedCardId, setExpandedCardId] = useState(null); // Track which card is expanded
  const theme = useTheme(); // Get the theme from the ThemeProvider
  const [filterOptions, setFilterOptions] = useState({
    languages: [],
    assetsLanguages: [],
    assetsAvailable: [],
    genres: [],
    formats: []
  });

  useEffect(() => {
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
    setData([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchMoreData(1, filters, searchQuery);
  }, [selectedCategory, filters, searchQuery]);

  const fetchMoreData = async (pageNumber = page, filters = {}, searchQuery = '') => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await (selectedCategory === 'writers'
        ? getAssestsWriters(axiosInstance, pageNumber)
        : getAssestsOriginalIps(axiosInstance, pageNumber, filters, searchQuery));

      const newData = response.data;

      setData((prevData) => [...prevData, ...newData]);

      const { pagination } = response;
      setHasMore(pagination.hasMore);
      setPage((prevPage) => prevPage + 1);

    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle card click to toggle expansion
  const handleCardClick = (item) => {
    if (selectedCategory == 'writers') {
      setExpandedCardId(item.pubProfileLink === expandedCardId ? null : item.pubProfileLink); // Toggle expanded card
    }
    else {
      setExpandedCardId(item._id === expandedCardId ? null : item._id); // Toggle expanded card
    }
  };

  const applyFilters = (newFilters, searchQuery) => {
    setFilters(newFilters);
    setSearchQuery(searchQuery);
    setHasMore(true);
    setData([]);
    fetchMoreData(1, newFilters, searchQuery);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', mt: 8, flexDirection: 'column' }}>
        {selectedCategory === "originalIps" && (
          <FilterComponent applyFilters={applyFilters} filterOptions={filterOptions} />
        )}

        <Box display="flex" justifyContent="center" mt={2} gap={2}>
          <Button
            variant={selectedCategory === 'writers' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('writers')}
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
          >
            Writers
          </Button>
          <Button
            variant={selectedCategory === 'originalIps' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('originalIps')}
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
          >
            Original IPs
          </Button>
        </Box>

        {/* Conditional Rendering of WritersCard or OriginalIpCard */}
        <Gallery
          data={data}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          handleCardClick={handleCardClick}
          CardComponent={(props) => (
            selectedCategory === 'writers' ? (
              <WritersCard
                {...props}
                isExpanded={props.item.pubProfileLink === expandedCardId}  // Determine if the card is expanded
                handleCardClick={handleCardClick}
              />
            ) : (
              <OriginalIpCard
                {...props}
                isExpanded={props.item._id === expandedCardId}  // Determine if the card is expanded
                handleCardClick={handleCardClick}
              />
            )
          )}
        />
      </Box>
    </>
  );
};

export default MarketplacePage;
