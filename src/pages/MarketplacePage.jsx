import React, { useEffect, useState, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { getAssestsWriters, getAssestsOriginalIps } from '../services/marketplaceService';
import Sidebar from '../components/Sidebar';
import Gallery from '../components/Gallery';
import Navbar from '../components/Navbar';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';

const MarketplacePage = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('writers');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchMoreData();
  }, [selectedCategory, axiosInstance]);

  const fetchMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await (selectedCategory === 'writers'
        ? getAssestsWriters(axiosInstance, page)
        : getAssestsOriginalIps(axiosInstance, page));
      setData(prevData => [...prevData, ...response.data]);
      setPaginationInfo(response.pagination);
      setPage(prevPage => prevPage + 1);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
      <Navbar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', mt: 8 }}>
        {/* <Sidebar paginationInfo={paginationInfo} /> */}
        <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant={selectedCategory === 'writers' ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory('writers')}
              sx={{ mr: 2 }}>
              Writers
            </Button>
            <Button variant={selectedCategory === 'originalIps' ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory('originalIps')}>
              Original IPs
            </Button>
          </Box>
          <Gallery
            data={data}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            handleCardClick={handleCardClick}
          />
        </Box>
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
