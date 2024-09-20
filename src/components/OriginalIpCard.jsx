import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const OriginalIpCard = ({ item, handleCardClick }) => {
  const [hover, setHover] = useState(false);

  return (
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <Box
        component="img"
        src={item.poster || 'https://via.placeholder.com/150'}
        alt={item.name}
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
          {item.name}
        </Typography>
        {/* Display Genre and Language on Hover */}
        {hover && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {item.genre} | {item.language}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OriginalIpCard;
