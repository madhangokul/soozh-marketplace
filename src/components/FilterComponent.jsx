import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, TextField, useMediaQuery, useTheme, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { debounce } from 'lodash';

// Styled components for responsiveness
const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const FilterItem = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  minWidth: 300,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

const FilterComponent = ({ applyFilters, filterOptions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For mobile responsiveness

  // States for selected filters
  const [filters, setFilters] = useState({
    language: [],
    assetsLanguage: [],
    assetsAvailable: [],
    genre: [],
    format: [],
  });

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for filter visibility
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle filter change
  const handleFilterChange = (filterKey, values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: values,
    }));
    handleApplyFilters({ ...filters, [filterKey]: values }, searchQuery); // Call with debounce
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    handleApplyFilters(filters, event.target.value); // Call with debounce
  };

  // Debounced apply filters function
  const handleApplyFilters = debounce((newFilters, searchQuery) => {
    applyFilters(newFilters, searchQuery);
  }, 250);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Render the multi-select dropdowns
  const renderMultiSelect = (label, filterKey, options) => (
    <FilterItem>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        size="small"  // Smaller select size
        value={filters[filterKey]}
        onChange={(event) => handleFilterChange(filterKey, event.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={filters[filterKey].indexOf(option) > -1} />
            {option}
          </MenuItem>
        ))}
      </Select>
    </FilterItem>
  );

  return (
    <Box>
      {/* Search box */}
      <SearchBox
        variant="outlined"
        placeholder='Search by "Title, Description or Anything"'
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      {/* Filter Section */}
      {isMobile && (
        <Button variant="outlined" onClick={toggleExpand} sx={{ marginBottom: 2 }}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} Filters
        </Button>
      )}

      <Collapse in={isExpanded || !isMobile}>
        <FilterBox>
          {renderMultiSelect('Language', 'language', filterOptions.languages)}
          {renderMultiSelect('Assets Language', 'assetsLanguage', filterOptions.assetsLanguages)}
          {renderMultiSelect('Assets Available', 'assetsAvailable', filterOptions.assetsAvailable)}
          {renderMultiSelect('Genre', 'genre', filterOptions.genres)}
          {renderMultiSelect('Format', 'format', filterOptions.formats)}
        </FilterBox>
      </Collapse>
    </Box>
  );
};

export default FilterComponent;
