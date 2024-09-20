import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip, Chip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description'; // Icon for Originals Count
import WorkIcon from '@mui/icons-material/Work'; // Icon for Worked In Count
import LinkIcon from '@mui/icons-material/Link'; // Icon for public profile link

const WritersCard = ({ item, handleCardClick, isExpanded }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className={`flip-card ${isExpanded ? 'expanded' : ''}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        },
        cursor: 'pointer',
        position: 'relative', // This is necessary for badge positioning
      }}
      onClick={() => handleCardClick(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Top-right badges for Originals Count and Worked In Count */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
        <Tooltip title="Originals Count">
          <Chip
            icon={<DescriptionIcon sx={{ fontSize: 18 }} />}
            label={item.originalsCount || 0}
            size="small"
            color="primary"
            sx={{ backgroundColor: 'black', color: 'white' }}
          />
        </Tooltip>
        <Tooltip title="Worked In Count">
          <Chip
            icon={<WorkIcon sx={{ fontSize: 18 }} />}
            label={item.workedInCount || 0}
            size="small"
            color="secondary"
            sx={{ backgroundColor: 'black', color: 'white' }}
          />
        </Tooltip>
      </Box>

      {/* Image */}
      <Box
        component="img"
        src={item.profilePath || 'https://via.placeholder.com/150'}
        alt={item.fullName || 'Unnamed'}
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
          {item.fullName || 'Unknown Writer'}
        </Typography>

        {/* Location */}
        {hover && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {item.location || 'Unknown Location'}
          </Typography>
        )}
      </CardContent>

      {/* Expanded Card with Additional Details */}
      {isExpanded && (
        <CardContent sx={{ background: 'rgba(0, 0, 0, 0.6)', color: 'white', flexGrow: 1 }}>
          {/* Public Profile Link */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LinkIcon sx={{ color: 'white', mr: 1 }} />
            <Typography variant="body2">
              <a
                href={`https://justwrite.soozh.app/p/${item.pubProfileLink}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(144, 202, 249, 0.9)', textDecoration: 'none' }}
              >
                Public Profile
              </a>
            </Typography>
          </Box>

          {/* Website */}
          {item.website && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Website:</strong> {item.website}
            </Typography>
          )}

          {/* Languages */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Languages:</strong>{' '}
            {item.languages.map((lang) => lang.value).join(', ') || 'None'}
          </Typography>

          {/* Worked In Count */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Worked In:</strong> {item.workedInCount || 0} projects
          </Typography>

          {/* Originals Count */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Originals Created:</strong> {item.originalsCount || 0}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default WritersCard;
