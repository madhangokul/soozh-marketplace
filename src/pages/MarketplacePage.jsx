import React, { useEffect, useState, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { getAssestsWriters, getAssestsOriginalIps } from '../services/marketplaceService';
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import Navbar from '../components/Navbar';  // Import Navbar component
import Gallery from '../components/Gallery';
import HomeIcon from '@mui/icons-material/Home';  // Import Home icon
import { IconButton, Typography } from '@mui/material';  // Import MUI components
import { useNavigate } from 'react-router-dom';  // Import for navigation

const MarketplacePage = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('writers');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();  // For navigation to home

  useEffect(() => {
    // Reset state when the category changes
    setData([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchMoreData(1);  // Fetch the first page of the new category
  }, [selectedCategory]);

  const fetchMoreData = async (pageNumber = page) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await (selectedCategory === 'writers'
        ? getAssestsWriters(axiosInstance, pageNumber)
        : getAssestsOriginalIps(axiosInstance, pageNumber));

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

  const handleCardClick = (item) => {
    setSelectedData(item);
    setDialogOpen(true);
  };

  return (
    <>
      <Navbar>
        {/* Add the Home icon and "Marketplace" text in the Navbar */}
        <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Marketplace
        </Typography>
      </Navbar>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', mt: 8 }}>
        <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Box display="flex" justifyContent="center" mt={2}>
            {/* Category switch buttons */}
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
          />
        </Box>

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
