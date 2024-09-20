import React from 'react';
import { Box, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardComponent from './CardComponent';

const Gallery = ({ data, fetchMoreData, hasMore, handleCardClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust grid layout based on screen size
  
  return (
    <Box sx={{ flex: '1 1 auto', overflowY: 'auto', padding: 2 }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Grid container spacing={2}>
            {Array.from({ length: isMobile ? 1 : 3 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
            ))}
          </Grid>
        }
        endMessage={<p style={{ textAlign: 'center' }}><b>No more records</b></p>}
        style={{ overflow: 'visible' }}
      >
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}> {/* Responsive grid */}
              <CardComponent item={item} handleCardClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default Gallery;
