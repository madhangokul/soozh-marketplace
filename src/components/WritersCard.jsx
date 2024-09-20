import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const WritersCard = ({ item, handleCardClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.2)',  // Outline effect
      backdropFilter: 'blur(10px)',  // Glassmorphism effect
      background: 'rgba(255, 255, 255, 0.1)',  // Transparent background for glassmorphism
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  // Subtle shadow
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Smooth transition for hover effect
      '&:hover': {
        transform: 'translateY(-5px)',  // Lift on hover
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',  // Increase shadow on hover
      },
    }}
    onClick={() => handleCardClick(item)}
  >
    {/* Image */}
    <Box
      component="img"
      src={item.userDetails?.profile_path?.value || 'https://via.placeholder.com/150'}
      alt={item.userDetails?.fullName?.value || 'Unnamed'}
      sx={{
        width: '100%',
        height: 250,
        objectFit: 'cover',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      {/* Name */}
      <Typography gutterBottom variant="h6" sx={{ color: 'white' }}>
        {item.userDetails?.fullName?.value || 'Unknown Writer'}
      </Typography>
      {/* Location */}
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        {item.userDetails?.location?.value || 'Unknown Location'}
      </Typography>
    </CardContent>
  </Card>
);

export default WritersCard;
