// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  Button,
  Divider
} from '@mui/material';
//
import caretDownFilled from '@iconify/icons-ant-design/caret-down-filled';
import caretUpFilled from '@iconify/icons-ant-design/caret-up-filled';
import { orderBy } from 'lodash';

import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getAllProject } from 'redux/slices/krowd_slices/project';
import { Icon } from '@iconify/react';
import { BlogPostsSearch, BlogPostsSort } from 'components/_dashboard/project';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import FieldCard from 'components/FieldCard';
import { Post } from '../../../@types/blog';
import { ProjectCard } from '../project';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(11),
    backgroundColor:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none'
  }
}));

const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];

const SORT_OPTIONS = [
  { value: 'Mostfunded', label: 'Most funded' },
  { value: 'Newestfirst', label: 'Newest first' },
  { value: 'Mosttraction', label: 'Most traction' },
  { value: 'Closingsoon', label: 'Closing soon' }
];

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const [filters, setFilters] = useState('Mostfunded');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const { projectList } = useSelector((state: RootState) => state.project);
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const handleChangeSort = (value?: string) => {
    if (value) {
      setFilters(value);
    }
  };
  useEffect(() => {
    dispatch(getAllProject('INVESTOR'));
  }, [dispatch]);

  const [openHighLight, setOpenHighLight] = React.useState(false);
  const [openRevenue, setOpenRevenue] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);
  const getHighLight = () => {
    setOpenHighLight(!openHighLight);
    setOpenCategory(false);
    setOpenRevenue(false);
    setOpenMore(false);
  };

  const getRevenue = () => {
    setOpenRevenue(!openRevenue);
    setOpenHighLight(false);
    setOpenCategory(false);
    setOpenMore(false);
  };

  const getMore = () => {
    setOpenMore(!openMore);
    setOpenHighLight(false);
    setOpenCategory(false);
    setOpenRevenue(false);
  };

  const getCategory = () => {
    dispatch(getFieldList());
    setOpenCategory(!openCategory);
    setOpenHighLight(false);
    setOpenRevenue(false);
    setOpenMore(false);
  };
  const handleClick = (f: VoidFunction) => {
    f();
  };

  return (
    <RootStyle
      sx={{
        paddingBottom: '1rem'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 2, textAlign: 'left', paddingTop: '3rem' } }}>
          <Typography variant="h2" sx={{ mb: 3, color: 'text.primary' }}>
            {t('highlight_project')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'left', xs: 'center' },
              alignItems: 'middle',
              gap: '10'
            }}
          >
            <Typography>
              <img
                style={{
                  width: '30px',
                  display: 'inline',
                  paddingBottom: '1.5rem'
                }}
                src={'/static/home/profits.png'}
              />
            </Typography>
            <Typography
              fontWeight={400}
              variant="h4"
              sx={{ mb: 1, color: 'text.disabled', marginLeft: '1rem' }}
            >
              {t('highlight_project_description')}
            </Typography>
          </Box>
        </Box>

        <Grid container>
          {projectList &&
            projectList.listOfProject
              .filter((value) => value.status === 2)
              .slice(3)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'end', my: 3, pt: 2 }}>
          <Typography variant="h3">Các cơ hội cho bạn</Typography>
          <Typography color={'text.disabled'} fontWeight={1000} variant="h3" sx={{ ml: 1 }}>
            {projectList && projectList.numOfProject}
          </Typography>
        </Box>

        <Box>
          <Grid container>
            <Grid xs={12} md={2} lg={4}>
              <BlogPostsSearch sx={{ display: 'flex' }} border="none" />
            </Grid>
            <Grid xs={12} md={10} lg={8} p={0.1} textAlign={'center'}>
              <Grid container sx={{ mb: 3 }}>
                <Grid item xs={12} md={2}>
                  <Button
                    sx={{ color: openCategory ? 'blue' : 'black' }}
                    onClick={() => handleClick(getCategory)}
                  >
                    <Typography
                      sx={{
                        color: openCategory ? 'blue' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      Thể loại
                    </Typography>
                    {openCategory ? (
                      <Icon icon={caretUpFilled} width={15} height={15} />
                    ) : (
                      <Icon icon={caretDownFilled} width={15} height={15} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    sx={{ color: openHighLight ? 'blue' : 'black' }}
                    onClick={() => handleClick(getHighLight)}
                  >
                    <Typography
                      sx={{
                        color: openHighLight ? 'blue' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      Nổi bật
                    </Typography>
                    {openHighLight ? (
                      <Icon icon={caretUpFilled} width={15} height={15} />
                    ) : (
                      <Icon icon={caretDownFilled} width={15} height={15} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    sx={{ color: openRevenue ? 'blue' : 'black' }}
                    onClick={() => handleClick(getRevenue)}
                  >
                    <Typography
                      sx={{
                        color: openRevenue ? 'blue' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      Doanh thu
                    </Typography>
                    {openRevenue ? (
                      <Icon icon={caretUpFilled} width={15} height={15} />
                    ) : (
                      <Icon icon={caretDownFilled} width={15} height={15} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    sx={{ color: openMore ? 'blue' : 'black' }}
                    onClick={() => handleClick(getMore)}
                  >
                    <Typography
                      sx={{
                        color: openMore ? 'blue' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      Xem thêm
                    </Typography>
                    {openMore ? (
                      <Icon icon={caretUpFilled} width={15} height={15} />
                    ) : (
                      <Icon icon={caretDownFilled} width={15} height={15} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <Grid container sx={{ backgroundColor: '#f7f7f7' }} mb={5}>
              <Grid container sx={{ py: 3, ml: 3 }}>
                {fieldList && fieldList.map((p) => <FieldCard key={p.id} row={p} />)}
              </Grid>
            </Grid>
          </Collapse>
        </Box>
        <Box>
          <Grid container>
            <Collapse in={openHighLight} timeout="auto" unmountOnExit>
              <Grid container sx={{ backgroundColor: '#f7f7f7' }} mb={5}>
                <Grid container sx={{ py: 3, ml: 3 }}>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="$5M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="$10M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="$20M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="10-24 employees" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="25-49 employees" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Power Founders" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Notable Angel backing" />
                    </ListItemButton>
                  </List>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Box>
        <Box>
          <Grid container>
            <Collapse in={openRevenue} timeout="auto" unmountOnExit>
              <Grid container sx={{ backgroundColor: '#f7f7f7' }} mb={5}>
                <Grid container sx={{ py: 3, ml: 3 }} md={6} lg={6}>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 6 }}>
                      <ListItemText primary="$5M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 4 }}>
                      <ListItemText primary="$10M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 4 }}>
                      <ListItemText primary="$20M+ raised" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 4 }}>
                      <ListItemText primary="$5M+ revenue" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 2 }}>
                      <ListItemText primary="$10M+ revenue" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="$20M+ revenue" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, mr: 1.8 }}>
                      <ListItemText primary="$120M+ revenue" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="$200M+ revenue" />
                    </ListItemButton>
                  </List>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Box>
        <Box>
          <Collapse in={openMore} timeout="auto" unmountOnExit>
            <Grid container sx={{ pb: 3 }}>
              <Grid container sx={{ py: 3, backgroundColor: '#f7f7f7' }} md={6} lg={6}>
                <Grid container sx={{ py: 3 }} xs={5} sm={5} md={5} lg={5}>
                  <List component="div" disablePadding>
                    <Typography sx={{ fontWeight: '700', textAlign: 'center' }}>Impact</Typography>
                    <ListItemButton>
                      <ListItemText primary="Diverse Founders" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Social Impact" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Sustainability" />
                    </ListItemButton>
                  </List>
                </Grid>
                <Divider orientation="vertical">|</Divider>
                <Grid container sx={{ py: 3 }} xs={6} sm={6} md={6} lg={6}>
                  <List component="div" disablePadding>
                    <Typography sx={{ fontWeight: '700' }}>Business model</Typography>
                    <ListItemButton>
                      <ListItemText primary="B2B" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="B2C" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Creator Economy" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="D2C" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Marketplace" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="SaaS" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Subscription" />
                    </ListItemButton>
                  </List>
                </Grid>
              </Grid>
              <Grid container sx={{ py: 3, backgroundColor: '#f7f7f7' }} md={6} lg={6}>
                <Grid container sx={{ py: 3 }} xs={5} sm={5} md={5} lg={5}>
                  <List component="div" disablePadding>
                    <Typography sx={{ fontWeight: '700', textAlign: 'center' }}>
                      Valuation cap
                    </Typography>
                    <ListItemButton>
                      <ListItemText primary="$5M and under" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="$5–10M" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="$10–20M" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="$20M+" />
                    </ListItemButton>
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem>
                  |
                </Divider>
                <Grid container sx={{ py: 3 }} xs={6} sm={6} md={6} lg={6}>
                  <List component="div" disablePadding>
                    <Typography sx={{ fontWeight: '700' }}>Min. investment</Typography>
                    <ListItemButton>
                      <ListItemText primary="$100 and under" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="$101–$250" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="$250+" />
                    </ListItemButton>
                  </List>
                </Grid>
                <Grid container sx={{ py: 3 }} md={12} lg={12}>
                  <List component="div" disablePadding>
                    <Typography sx={{ fontWeight: '700' }}>Company location</Typography>
                    <BlogPostsSearch />
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectList && projectList.listOfProject.map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>
      </Container>
    </RootStyle>
  );
}
