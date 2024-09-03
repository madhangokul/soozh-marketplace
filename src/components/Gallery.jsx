import React from 'react';
import { Box, Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from '@mui/material/Skeleton';
import CardComponent from './CardComponent';

const Gallery = ({ data, fetchMoreData, hasMore, handleCardClick }) => (
  <Box sx={{ flex: '1 1 70%', overflowY: 'auto' }}>
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Skeleton variant="rectangular" height={118} />}
      endMessage={<p style={{ textAlign: 'center' }}><b>No more records</b></p>}
      style={{ overflow: 'visible' }}
    >
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardComponent item={item} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  </Box>
);

export default Gallery;
