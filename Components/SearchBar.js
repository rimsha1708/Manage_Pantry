// components/SearchBar.js
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    return (
        <TextField
            label="Search Pantry Items"
            onChange={(e) => onSearch(e.target.value)}
            variant="outlined"
            fullWidth
        />
    );
};

export default SearchBar;
