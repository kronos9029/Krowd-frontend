import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link, Link as RouterLink } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';

// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  Box,
  Divider
} from '@mui/material';
import { fDate } from 'utils/formatTime';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'components/@material-extend';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getAllProject, getProjectId } from 'redux/slices/krowd_slices/project';
// routes
import { PATH_DASHBOARD, PATH_DETAILS } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UserListHead } from '../../../../components/_dashboard/user/list';
import { Project1, ProjectStatus } from '../../../../@types/krowd/project';
import ProjectMoreMenu from './ProjectMoreMenu';
// import ProjectMoreMenu from 'components/_dashboard/e-commerce/product-details/ProjectMoreMenu';
// import { ShopTagFiltered } from 'components/_dashboard/e-commerce/projectKrowd';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: true },
  { id: 'title', label: 'Tên', alignRight: false },
  { id: 'priority', label: 'Thứ tự ưu tiên', alignRight: false }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: Project1[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProjectOfBusinessDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  //   const { projectList } = useSelector((state: RootState) => state.project);
  const { activeProjectId: project } = useSelector((state: RootState) => state.project);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // API
  useEffect(() => {
    dispatch(getAllProject('ADMIN'));
  }, [dispatch]);

  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId, 'ADMIN'));
  };

  // Sort filter
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const getEntityList = (
    type:
      | 'PITCH'
      | 'EXTENSION'
      | 'DOCUMENT'
      | 'ALBUM'
      | 'ABOUT'
      | 'HIGHLIGHT'
      | 'UPDATE'
      | 'MEDIA'
      | 'FAQ'
      | 'REVIEW'
  ) => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
  const {
    pitchs,
    extensions,
    documents,
    abouts,
    album,
    highlights,
    updates,
    medias,
    faqs,
    reviews
  } = {
    pitchs: getEntityList('PITCH'),
    updates: getEntityList('UPDATE'),
    extensions: getEntityList('EXTENSION'),
    medias: getEntityList('MEDIA'),
    faqs: getEntityList('FAQ'),
    reviews: getEntityList('REVIEW'),
    documents: getEntityList('DOCUMENT'),
    abouts: getEntityList('ABOUT'),
    album: [
      projectID!.image,
      ...getEntityList('ALBUM')!
        .map((_image) => _image.link)
        .filter(notEmpty)
    ],
    highlights: getEntityList('HIGHLIGHT')
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pitchs!.length) : 0;

  return (
    <Page title="Chi tiết dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết dự án"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới dự án
            </Button>
          }
        />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={5} sx={{ mb: 5, pr: 5 }}>
              <img alt="logo" src={project?.image} />
            </Grid>
            <Grid item xs={12} sm={7} sx={{ mb: 5 }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Doanh thu chia sẻ
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: '27px', color: '#19c157', fontWeight: 'boild' }}
                >
                  {project?.sharedRevenue} (%)
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Thành viên đã tham gia
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.multiplier} (Thành viên)
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Hệ số nhân
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.multiplier}x
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Thời hạn
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.duration} (tháng)
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box sx={{ textAlign: { sm: 'right' }, mb: 3, mt: 3 }}>
                {/* <Label color="success" sx={{ textTransform: 'uppercase', mb: 2 }}>
                  {project?.status}
                </Label> */}
                <Typography variant="subtitle1">
                  Giấy phép kinh doanh: {project?.businessLicense}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Tên doanh nghiệp
                </Typography>
                {project?.business.name}
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Địa chỉ:
                </Typography>
                {project?.address}
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>
          </Grid>
        </Card>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>PITCH</Typography>

            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {pitchs &&
                        pitchs.length > 0 &&
                        pitchs.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'250px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {pitchs && pitchs?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>UPDATE</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {updates &&
                        updates.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {updates && updates?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>HIGHLIGHT</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {highlights &&
                        highlights.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {highlights && highlights?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>DOCUMENT</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {documents &&
                        documents.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {documents && documents?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>MEDIA</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {medias &&
                        medias.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {medias && medias?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>FAQ</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {faqs &&
                        faqs.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {faqs && faqs?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>REVIEW</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {reviews &&
                        reviews.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {reviews && reviews?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ py: 4 }}>ABOUT</Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={1}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {abouts &&
                        abouts.map((row) => {
                          const { id, title, description, content, link, priority } = row;
                          const isItemSelected = selected.indexOf(title) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="left" spacing={2}>
                                  <Typography variant="subtitle2">{id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle2">{title}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell width={'450px'} component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{priority}</Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {abouts && abouts?.length === 0 && (
                        <TableRow>
                          <TableCell width={'150px'}></TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
        <Typography sx={{ py: 4 }}>EXTENSION</Typography>
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={1}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {extensions &&
                    extensions.map((row) => {
                      const { id, title, description, content, link, priority } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell width={'450px'} component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="left" spacing={2}>
                              <Typography variant="subtitle2">{id}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell width={'450px'} component="th" scope="row" padding="none">
                            <Stack direction="row" spacing={2}>
                              <Typography variant="subtitle2">{title}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell width={'450px'} component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{priority}</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {extensions && extensions?.length === 0 && (
                    <TableRow>
                      <TableCell width={'150px'}></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <img src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
