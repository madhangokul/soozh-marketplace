import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // Upvote icon
import ClapIcon from '@mui/icons-material/EmojiEmotions'; // Clap icon

const OriginalIpCard = ({ item, isExpanded, handleCardClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="expand-card"  // Add this class to the card for consistent styling
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.2)',  // Outline effect
        backdropFilter: 'blur(10px)',  // Glassmorphism effect
        background: 'rgba(255, 255, 255, 0.1)',  // Transparent background for glassmorphism
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  // Subtle shadow
        cursor: 'pointer',
        height: isExpanded ? '400px' : '250px',  // Toggle height based on expansion state
        overflow: 'hidden',  // Prevent content overflow when collapsed
        transition: 'height 0.3s ease',  // Smooth transition for height
        '&:hover': {
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',  // Slight lift on hover
        }
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
          height: 150,  // Fixed height for the image
          objectFit: 'cover',
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
        }}
      />

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1 }}>
        {isExpanded ? (
          // Expanded View
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <IconButton sx={{ color: 'white' }}>
                <ThumbUpIcon /> <Typography variant="body2" sx={{ ml: 1 }}>{item.upvotes?.length || 0}</Typography>
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <ClapIcon /> <Typography variant="body2" sx={{ ml: 1 }}>{item.claps?.length || 0}</Typography>
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>LogLine:</strong> {item.logLine}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>Genre:</strong> {item.genre}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>Format:</strong> {item.format}</Typography>
            {/* Add other details here */}
          </>
        ) : (
          // Collapsed View
          <Typography gutterBottom variant="h6" sx={{ color: 'white' }}>
            {item.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OriginalIpCard;
