// material
import { alpha, useTheme, styled } from '@mui/material/styles';
//React
import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import useAuth from 'hooks/useAuth';
import { Link } from 'react-router-dom';
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
  Divider,
  Stack,
  Chip
} from '@mui/material';
//Languages
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
//Project
import { ProjectCard } from '../project';
import { PROJECT_STATUS } from '../../../@types/krowd/project';
import { getProjectList } from 'redux/slices/krowd_slices/project';
import { getFieldList } from 'redux/slices/krowd_slices/field';
//Icon
import { Icon } from '@iconify/react';
import barChartOutlined from '@iconify/icons-ant-design/bar-chart-outlined';
import caretDownFilled from '@iconify/icons-ant-design/caret-down-filled';
import caretUpFilled from '@iconify/icons-ant-design/caret-up-filled';
import fileProtectOutlined from '@iconify/icons-ant-design/file-protect-outlined';
//Temp
import { BlogPostsSearch, BlogPostsSort } from 'components/_dashboard/project';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(4),
    backgroundColor:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none'
  },

  [theme.breakpoints.up('xs')]: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(4),
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
const SORT_OPTIONS_CONFIG = {
  vi: [
    {
      value: 'Mostfunded',
      label: 'Được tài trợ nhiều nhất'
    },
    {
      value: 'Newestfirst',
      label: 'Mới nhất'
    },
    {
      value: 'Mosttraction',
      label: 'Đầu tư nhiều nhất'
    },
    {
      value: 'Closingsoon',
      label: 'Kết thúc'
    }
  ],

  en: [
    {
      value: 'Mostfunded',
      label: 'Most funded'
    },
    {
      value: 'Newestfirst',
      label: 'Newest first'
    },
    {
      value: 'Mosttraction',
      label: 'Most traction'
    },
    {
      value: 'Closingsoon',
      label: 'Closing soon'
    }
  ]
};

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
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
    dispatch(getProjectList());
  }, [dispatch]);

  const [openHighLight, setOpenHighLight] = useState(false);
  const [openRevenue, setOpenRevenue] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedFilter, setSelectFilter] = useState<String[]>([]);
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
  const handleClick = (func: VoidFunction) => {
    func();
  };
  const addToSelectedFilterList = (newValue: String) => {
    const index = selectedFilter.indexOf(newValue);
    let newList = [];
    if (index === -1) {
      newList = [...selectedFilter, newValue];
    } else {
      selectedFilter.splice(index, 1);
      newList = [...selectedFilter];
    }
    setSelectFilter(newList);
    console.log(selectedFilter);
  };
  const handleDelete = (value: String) => {
    const index = selectedFilter.indexOf(value);
    let newList = [];
    selectedFilter.splice(index, 1);
    newList = [...selectedFilter];
    setSelectFilter(newList);
    console.log(selectedFilter);
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 2, textAlign: 'left' } }}>
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
            <Typography color="primary.main">
              <Icon icon={barChartOutlined} width={40} display="inline" />
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

        {/* <Grid container>
          {projectList &&
            projectList.listOfProject
              .filter((value) => value.status === PROJECT_STATUS.CALLING_FOR_INVESTMENT)
              .slice(0, 3)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid> */}
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectList.listOfProject &&
            projectList.listOfProject
              .filter((value) => value.status === PROJECT_STATUS.CALLING_FOR_INVESTMENT)
              .slice(0, 9)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'start', my: 3, pt: 2 }}>
          <Typography color="primary.main">
            <Icon icon={fileProtectOutlined} width={40} display="inline" />
          </Typography>
          <Typography
            fontWeight={400}
            variant="h4"
            sx={{ mb: 1, color: 'text.disabled', marginLeft: '1rem' }}
          >
            {t(`landing_project_highlight.landing_highligh_transaction`)}
            <Link to="/about-us" style={{ textDecoration: 'none' }}>
              {' '}
              {t(`landing_project_highlight.landing_highligh_by_about_us`)}
            </Link>
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
                    sx={{ color: openCategory ? 'primary.main' : 'text.secondary' }}
                    onClick={() => handleClick(getCategory)}
                  >
                    <Typography
                      sx={{
                        color: openCategory ? 'primary.main' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      {t(`landing_project_highlight.landing_highligh_by_category`)}
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
                    sx={{ color: openHighLight ? 'primary.main' : 'text.secondary' }}
                    onClick={() => handleClick(getHighLight)}
                  >
                    <Typography
                      sx={{ color: openHighLight ? 'primary.main' : 'text.secondary' }}
                      mr={0.5}
                    >
                      {t(`landing_project_highlight.landing_highligh_by_highligh`)}
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
                    sx={{ color: openRevenue ? 'primary.main' : 'text.secondary' }}
                    onClick={() => handleClick(getRevenue)}
                  >
                    <Typography
                      sx={{
                        color: openRevenue ? 'primary.main' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      {t(`landing_project_highlight.landing_highligh_by_revenue`)}
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
                    sx={{ color: openMore ? 'primary.main' : 'text.secondary' }}
                    onClick={() => handleClick(getMore)}
                  >
                    <Typography
                      sx={{
                        color: openMore ? 'primary.main' : 'text.secondary'
                      }}
                      mr={0.5}
                    >
                      {t(`landing_project_highlight.landing_highligh_by_more`)}
                    </Typography>
                    {openMore ? (
                      <Icon icon={caretUpFilled} width={15} height={15} />
                    ) : (
                      <Icon icon={caretDownFilled} width={15} height={15} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <BlogPostsSort
                    query={filters}
                    options={
                      currentLanguageCode === 'vi' ? SORT_OPTIONS_CONFIG.vi : SORT_OPTIONS_CONFIG.en
                    }
                    onSort={handleChangeSort}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <Grid container sx={{ backgroundColor: '#f7f7f7' }} mb={5}>
              <Grid container sx={{ py: 3, ml: 3 }}>
                {fieldList &&
                  fieldList.listOfField.map((f) => {
                    const isSelected = selectedFilter.indexOf(f.name);
                    return (
                      <List key={f.id} component="div" disablePadding>
                        <ListItemButton onClick={() => addToSelectedFilterList(f.name)}>
                          <ListItemText
                            primary={f.name}
                            sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                          />
                        </ListItemButton>
                      </List>
                    );
                  })}
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
                    <Typography sx={{ fontWeight: '700' }}>
                      {t(`landing_project_highlight.landing_highligh_business_model`)}
                    </Typography>
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
                      {t(`landing_project_highlight.landing_highligh_valucation_cap`)}
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
                    <Typography sx={{ fontWeight: '700' }}>
                      {t(`landing_project_highlight.landing_highligh_min_investment`)}
                    </Typography>
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
              </Grid>
            </Grid>
          </Collapse>
        </Box>
        {selectedFilter && (
          <Box mt={1} mb={3}>
            <Stack direction="row" spacing={1}>
              {selectedFilter.map((v, i) => (
                <Chip key={i} label={v} onDelete={handleDelete} />
              ))}
            </Stack>
          </Box>
        )}
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectList.listOfProject &&
            projectList.listOfProject
              .filter((value) => value.status === PROJECT_STATUS.CALLING_FOR_INVESTMENT)
              .slice(0, 9)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>
      </Container>
    </RootStyle>
  );
}
