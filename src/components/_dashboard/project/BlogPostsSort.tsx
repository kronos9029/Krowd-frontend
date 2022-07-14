// material
import { MenuItem, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type BlogPostsSortProps = {
  query: string;
  options: { value: string; label: string }[];
  onSort: (value?: string) => void;
};

export default function BlogPostsSort({ query, options, onSort }: BlogPostsSortProps) {
  return (
    <TextField select size="small" value={query} onChange={(e) => onSort(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          Sort By: {''}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
