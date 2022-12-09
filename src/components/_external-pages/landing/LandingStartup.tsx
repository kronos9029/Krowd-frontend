// material
import { alpha, useTheme, styled } from '@mui/material/styles';
//React
import searchFill from '@iconify/icons-eva/search-fill';

import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
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
  Chip,
  OutlinedInput,
  ListItemIcon
} from '@mui/material';
//Languages
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
//Project
import { ProjectCard } from '../project';
import {
  getProjectListWithFilter,
  getListAllProjectLanding,
  getListAllProjectMostTransactionLanding
} from 'redux/slices/krowd_slices/project';
import { getFieldList } from 'redux/slices/krowd_slices/field';
//Icon
import { Icon } from '@iconify/react';
import barChartOutlined from '@iconify/icons-ant-design/bar-chart-outlined';
import caretDownFilled from '@iconify/icons-ant-design/caret-down-filled';
import caretUpFilled from '@iconify/icons-ant-design/caret-up-filled';
import fileProtectOutlined from '@iconify/icons-ant-design/file-protect-outlined';
//Temp
import { BlogPostsSearch, BlogPostsSort } from 'components/_dashboard/project';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import LoadingScreen from 'components/LoadingScreen';
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
      value: 'CALLING_FOR_INVESTMENT',
      label: 'Đang kêu gọi đầu tư'
    }
  ],

  en: [
    {
      value: 'CALLING_FOR_INVESTMENT',
      label: 'Calling for investment'
    }
  ]
};

// ----------------------------------------------------------------------

export default function LandingStartUp() {
  const [filters, setFilters] = useState('CALLING_FOR_INVESTMENT');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const { projectListLanding, listAllProjectLandingMostTransaction } = useSelector(
    (state: RootState) => state.project
  );

  const { isLoadingProjectListLanding } = projectListLanding;
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { businessLists } = useSelector((state: RootState) => state.business);

  const [openHighLight, setOpenHighLight] = useState(false);
  const [openRevenue, setOpenRevenue] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedFilter, setSelectFilter] = useState<
    {
      filterId: string | null;
      filterName: string | null;
      filterType: string;
    }[]
  >([]);
  const [selectedInvestmentTargetCapital, setSelectInvestmentTargetCapital] = useState('0');
  const [FieldID, setFieldId] = useState<string[]>([]);
  const [BusinessID, setBusinessID] = useState('');

  const handleClearAll = () => {
    setSelectFilter([]);
    dispatch(getProjectListWithFilter([], '', '0', ''));
  };
  const handleChangeSort = (value?: string) => {
    if (value) {
      setFilters(value);
      dispatch(
        getProjectListWithFilter(FieldID, BusinessID, selectedInvestmentTargetCapital, value)
      );
    }
  };
  useEffect(() => {
    dispatch(getProjectListWithFilter([], '', '0', ''));
    dispatch(getListAllProjectLanding());
    dispatch(getListAllProjectMostTransactionLanding());
  }, [dispatch]);
  const getHighLight = () => {
    dispatch(getBusinessList());
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
  const handleInputChange = (newValue: {
    filterId: string | null;
    filterName: string | null;
    filterType: string;
  }) => {
    const index = selectedFilter.findIndex((value) => value.filterId === newValue.filterId);
    let newFilter = [];
    if (index === -1) {
      if (newValue.filterType === 'BUSINESS') {
        const removeIndex = selectedFilter.findIndex((value) => value.filterType === 'BUSINESS');
        if (removeIndex !== -1) selectedFilter.splice(removeIndex, 1, newValue);
        else selectedFilter.push(newValue);
      } else if (newValue.filterType === 'TARGET') {
        const removeIndex = selectedFilter.findIndex((value) => value.filterType === 'TARGET');
        if (removeIndex !== -1) selectedFilter.splice(removeIndex, 1, newValue);
        else selectedFilter.push(newValue);
      } else if (newValue.filterType === 'FIELD') {
        selectedFilter.push(newValue);
      }
    } else {
      selectedFilter.splice(index, 1);
    }

    newFilter = [...selectedFilter];
    setSelectFilter(newFilter);

    const fieldIds = selectedFilter
      .filter((_value) => _value.filterType === 'FIELD')
      .map((_value) => _value.filterId) as Array<string>;

    const businessId =
      selectedFilter.find((_value) => _value.filterType === 'BUSINESS')?.filterId ?? '';

    const targetNumber =
      selectedFilter.find((_value) => _value.filterType === 'TARGET')?.filterId ?? '0';
    setFieldId(fieldIds);
    setBusinessID(businessId);
    setSelectInvestmentTargetCapital(targetNumber);
    dispatch(getProjectListWithFilter(fieldIds, businessId, targetNumber, ''));
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
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {listAllProjectLandingMostTransaction.listOfProject.map((p) => (
            <ProjectCard key={p.id} row={p} />
          ))}
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
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={3}>
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
        <Box sx={{ backgroundColor: '#f7f7f7' }}>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <Grid container sx={{ backgroundColor: '#f7f7f7' }}>
              <Grid container sx={{ py: 3, ml: 3 }}>
                {fieldList &&
                  fieldList.listOfField.map((f) => {
                    const isSelected = selectedFilter.findIndex((value) => value.filterId === f.id);
                    return (
                      <List key={f.id} component="div" disablePadding>
                        <ListItemButton
                          onClick={() =>
                            handleInputChange({
                              filterId: f.id,
                              filterName: f.name,
                              filterType: 'FIELD'
                            })
                          }
                        >
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
        {/* Business */}
        <Box sx={{ backgroundColor: '#f7f7f7' }} width={1200}>
          <Collapse in={openHighLight} timeout="auto" unmountOnExit>
            <Grid container sx={{ backgroundColor: '#f7f7f7' }}>
              <Grid container sx={{ py: 3, ml: 3 }}>
                {businessLists &&
                  businessLists.listOfBusiness.map((b) => {
                    const isSelected = selectedFilter.findIndex((value) => value.filterId === b.id);
                    return (
                      <List key={b.id} component="div" disablePadding>
                        <ListItemButton
                          onClick={() =>
                            handleInputChange({
                              filterId: b.id,
                              filterName: b.name,
                              filterType: 'BUSINESS'
                            })
                          }
                        >
                          <Box width={200} display={'flex'} alignItems={'center'}>
                            <ListItemIcon>
                              <img style={{ width: 50, height: 50 }} src={b.image} />
                            </ListItemIcon>{' '}
                            <ListItemText
                              primary={b.name}
                              sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                            />
                          </Box>
                        </ListItemButton>
                      </List>
                    );
                  })}
              </Grid>
            </Grid>
          </Collapse>
        </Box>

        <Box sx={{ backgroundColor: '#f7f7f7' }} mt={1} mb={3}>
          <Grid container>
            <Collapse in={openRevenue} timeout="auto" unmountOnExit>
              <Grid container sx={{ backgroundColor: '#f7f7f7' }}>
                <Grid container sx={{ py: 3, ml: 3 }} md={4} lg={4}>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleInputChange({
                          filterId: '500000000',
                          filterName: '500,000,000đ +',
                          filterType: 'TARGET'
                        })
                      }
                    >
                      {' '}
                      <ListItemText
                        primary={'500,000,000đ'}
                        // sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                      />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleInputChange({
                          filterId: '750000000',
                          filterName: '750,000,000đ +',
                          filterType: 'TARGET'
                        })
                      }
                    >
                      <ListItemText
                        primary={'750,000,000đ'}
                        // sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                      />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleInputChange({
                          filterId: '1000000000',
                          filterName: '1,000,000,000đ +',
                          filterType: 'TARGET'
                        })
                      }
                    >
                      <ListItemText primary={'1,000,000,000đ'} />
                    </ListItemButton>
                  </List>
                </Grid>

                <Grid sx={{ py: 3, ml: 3 }} md={2} lg={2}>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleInputChange({
                          filterId: '2000000000',
                          filterName: '2,000,000,000đ +',
                          filterType: 'TARGET'
                        })
                      }
                    >
                      <ListItemText
                        primary={'2,000,000,000đ'}
                        // sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                      />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleInputChange({
                          filterId: '2500000000',
                          filterName: '2,500,000,000đ +',
                          filterType: 'TARGET'
                        })
                      }
                    >
                      <ListItemText
                        primary={'2,500,000,000đ'}
                        // sx={{ color: isSelected !== -1 ? 'primary.main' : 'text.secondary' }}
                      />
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

        {selectedFilter.length > 0 && (
          <Box mt={1} mb={3} display="flex" sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              {selectedFilter.map((v, i) => (
                <Chip key={`${v.filterId}`} label={v.filterName} />
              ))}
            </Stack>
            <Button onClick={handleClearAll}>
              <Chip label={'Xóa bộ lọc'} />
            </Button>
          </Box>
        )}
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {isLoadingProjectListLanding && (
            <Box sx={{ pt: 7 }}>
              <LoadingScreen />
              <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem', pt: 7 }}>
                KROWD đang tải dữ liệu, vui lòng đợi giây lát...
              </Typography>
            </Box>
          )}
          {!isLoadingProjectListLanding && projectListLanding.listOfProject.length > 0 ? (
            projectListLanding.listOfProject
              .slice(0, 9)
              .map((p) => <ProjectCard key={p.id} row={p} />)
          ) : (
            <>
              {!isLoadingProjectListLanding &&
                projectListLanding.listOfProject &&
                projectListLanding.listOfProject.length === 0 && (
                  <Box sx={{ padding: '60px' }} display="flex">
                    <Box sx={{ p: 1 }}>
                      <Icon width={40} height={40} icon={searchFill} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                      <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Không tìm thấy giao dịch <br />
                        <Typography>Hãy thử sử dụng các bộ lọc ít điều kiện hơn</Typography>
                      </Typography>
                    </Box>
                  </Box>
                )}
            </>
          )}
        </Grid>
      </Container>
    </RootStyle>
  );
}
