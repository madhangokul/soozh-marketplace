import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CardComponent = ({ item, handleCardClick }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={() => handleCardClick(item)}>
    <img
      src={item.userDetails?.profile_path?.value || item.poster || 'https://via.placeholder.com/150'}
      alt={item.userDetails?.fullName?.value || item.name}
      style={{ width: '100%', height: 150, objectFit: 'cover' }}
    />
    <CardContent>
      <Typography gutterBottom variant="h6">{item.userDetails?.fullName?.value || item.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {item.userDetails?.location?.value || item.language}
      </Typography>
    </CardContent>
  </Card>
);

export default CardComponent;
