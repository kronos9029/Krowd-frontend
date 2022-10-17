// material
import { MenuItem, TextField, Typography } from '@mui/material';
import { RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------

type BlogPostsSortProps = {
  query: string;
  options: { value: string; label: string }[];
  onSort: (value?: string) => void;
};

export default function BlogPostsSort({ query, options, onSort }: BlogPostsSortProps) {
  const { projectListLanding } = useSelector((state: RootState) => state.project);
  const { listOfProject } = projectListLanding;
  // const handleChangeSearch = async (value: string) => {
  //   try {
  //     setSearchQuery(value);
  //     if (value) {
  //       const response = await axios.get(`${REACT_APP_API_URL}/projects?name=${searchQuery}`);
  //       setSearchResults(response.data.results);
  //       console.log(response);
  //     } else {
  //       setSearchResults([]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <TextField select size="small" value={query} onChange={(e) => onSort(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
