import React, { useEffect, useState, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { getAssestsWriters, getAssestsOriginalIps } from '../services/marketplaceService';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Dialog,
  DialogContent,
} from '@mui/material';

const placeholderImage = 'https://via.placeholder.com/150';

const MarketplacePage = () => {
  const axiosInstance = useContext(AxiosContext);
  const [writers, setWriters] = useState([]);
  const [originalIps, setOriginalIps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('writers');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selectedCategory === 'writers') {
          const data = await getAssestsWriters(axiosInstance);
          setWriters(data);
        } else {
          const data = await getAssestsOriginalIps(axiosInstance);
          setOriginalIps(data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance, selectedCategory]);

  const handleCardClick = (data) => {
    setSelectedData(data);
    setDialogOpen(true);
  };

  const handleCategorySwitch = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box>
      <Typography variant="h1" align="center" gutterBottom>
        Marketplace
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color={selectedCategory === 'writers' ? 'primary' : 'default'}
          onClick={() => handleCategorySwitch('writers')}
          sx={{ marginRight: 2, transition: 'background-color 0.5s', width: '200px' }}
        >
          Writers
        </Button>
        <Button
          variant="contained"
          color={selectedCategory === 'originalIps' ? 'primary' : 'default'}
          onClick={() => handleCategorySwitch('originalIps')}
          sx={{ transition: 'background-color 0.5s', width: '200px' }}
        >
          Original IPs
        </Button>
      </Box>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '20px',
        marginTop: '20px'
      }}>
        {loading
          ? Array.from(new Array(20)).map((_, index) => (
              <Skeleton variant="rectangular" height={200} width={200} sx={{ borderRadius: '16px' }} key={index} />
            ))
          : selectedCategory === 'writers'
          ? writers.map((writer, index) => (
              <CardComponent item={writer} handleCardClick={handleCardClick} key={index} />
            ))
          : originalIps.map((ip, index) => (
              <CardComponent item={ip} handleCardClick={handleCardClick} key={index} />
            ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const CardComponent = ({ item, handleCardClick }) => (
  <Card
    sx={{
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      '&:hover .overlay': {
        opacity: 1,
      },
    }}
    onClick={() => handleCardClick(item)}
  >
    <img
      src={item.userDetails?.profile_path?.value || item.poster || placeholderImage}
      alt={item.userDetails?.fullName?.value || item.name}
      style={{ height: '100%', objectFit: 'cover', width: '100%' }}
    />
    <Box
      className="overlay"
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background:
          'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
        color: 'white',
        opacity: 0,
        transition: 'opacity 0.3s',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      <Typography variant="body2">
        {item.userDetails?.location?.value || item.language}
      </Typography>
    </Box>
    <CardContent
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '5px',
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle1">
        {item.userDetails?.fullName?.value || item.name}
      </Typography>
    </CardContent>
  </Card>
);

export default MarketplacePage;
