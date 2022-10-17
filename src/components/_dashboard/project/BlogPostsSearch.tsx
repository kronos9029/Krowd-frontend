import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Link as RouterLink } from 'react-router-dom';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  BoxProps
} from '@mui/material';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// @types
import { Post } from '../../../@types/blog';
//
import SearchNotFound from '../../SearchNotFound';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { REACT_APP_API_URL } from 'config';
import { dispatch, RootState, useSelector } from 'redux/store';
import { ALL_Project, Project1 } from '../../../@types/krowd/project';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  height: 50,
  padding: 5,
  borderRadius: 4,
  '& .MuiAutocomplete-root': {
    width: 300,
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.easeInOut,
    //   duration: theme.transitions.duration.shorter
    // }),
    '&.Mui-focused': {
      '& .MuiAutocomplete-inputRoot': {
        // boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      // borderWidth: `2px !important`,
      border: 'none',
      borderColor: `#314459 !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-of-type)': {
      borderBottom: `solid 3px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

export default function BlogPostsSearch({ sx }: BoxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const linkTo = (title: string) => `${PATH_PAGE.details}/${paramCase(title)}`;

  const { projectListLanding } = useSelector((state: RootState) => state.project);
  const { listOfProject } = projectListLanding;
  const { translate: t } = useLocales();
  const handleChangeSearch = async (value: string) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get(`${REACT_APP_API_URL}/projects?name=${searchQuery}`);
        setSearchResults(response.data.results);
        console.log(response);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleChangeSearch(searchQuery);
  }, []);
  return (
    <RootStyle
      sx={{
        ...(!searchQuery && {
          '& .MuiAutocomplete-noOptions': {
            display: 'none'
          }
        }),
        ...sx
      }}
    >
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={listOfProject}
        // options={searchResults}
        onInputChange={(event, value) => handleChangeSearch(value)}
        getOptionLabel={(post: ALL_Project) => post.name}
        noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t(`landing_project_search.landing_project_search_placeholder`)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        width: 20,
                        height: 20
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, post, { inputValue }) => {
          const { name } = post;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li {...props}>
              <Link to={linkTo(post.id)} component={RouterLink} underline="none">
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="subtitle2"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Link>
            </li>
          );
        }}
      />
    </RootStyle>
  );
}
