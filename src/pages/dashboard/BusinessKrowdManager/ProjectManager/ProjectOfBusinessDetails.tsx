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
  Divider,
  TextField
} from '@mui/material';
import { fDate } from 'utils/formatTime';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'components/@material-extend';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getAllProject, getProjectId, getProjectList } from 'redux/slices/krowd_slices/project';
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
import { Project1 } from '../../../../@types/krowd/project';
import ProjectMoreMenu from './ProjectMoreMenu';
import { styled } from '@mui/system';
import parse from 'html-react-parser';
import { SeoIllustration } from 'assets';
import eyeFill from '@iconify/icons-eva/eye-fill';
import BlogNewPostPreview from 'components/_dashboard/project/BlogNewPostPreview';

// import ProjectMoreMenu from 'components/_dashboard/e-commerce/product-details/ProjectMoreMenu';
// import { ShopTagFiltered } from 'components/_dashboard/e-commerce/projectKrowd';

// ----------------------------------------------------------------------

const TABLE_HEAD = {
  normal: [
    { id: '', align: 'center' },
    { id: 'id', label: 'ID', align: 'left' },
    { id: 'title', label: 'TÊN', align: 'left' },
    { id: 'priority', label: 'THỨ TỰ', align: 'center' },
    { id: '', label: 'THAO TÁC', align: 'center' },
    { id: '', align: 'center' }
  ],
  null: [
    { id: 'id', label: 'ID', align: 'left' },
    { id: 'title', label: 'TÊN', align: 'left' },
    { id: 'priority', label: 'THỨ TỰ', align: 'center' },
    { id: '', label: 'THAO TÁC', align: 'center' },
    { id: '', align: 'center' }
  ]
};

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
  const FixQL = styled('div')(() => ({
    '.ql-align-center': {
      textAlign: 'center'
    },
    '.ql-align-right': {
      textAlign: 'right'
    },
    '.ql-align-justify': {
      textAlign: 'justify'
    },
    blockquote: {
      background: '#f9f9f9',
      borderLeft: '10px solid #ccc',
      margin: '1.5em 10px',
      padding: '0.5em 10px',
      quotes: '201C 201D 2018 2019'
    },
    'blockquote:before': {
      color: '#ccc',
      content: 'open-quote',
      fontSize: '4em',
      lineHeight: '0.1em',
      marginRight: '0.25em',
      verticalAlign: '-0.4em'
    },
    'blockquote p': {
      display: 'inline'
    },
    '.ql-video': {
      width: '100%',
      height: '500px'
    }
  }));
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
    dispatch(getProjectList());
  }, [dispatch, project?.projectEntity]);

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
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };
  const handleClosePreview = () => {
    setOpen(false);
  };
  return (
    <Page title="Quản lý | Chi tiết dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
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
              <Box
                sx={{
                  my: 3,
                  display: 'flex',
                  justifyContent: 'end'
                }}
              >
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleOpenPreview}
                  endIcon={<Icon icon={eyeFill} />}
                >
                  Xem trước nội dung
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <HeaderBreadcrumbs
          sx={{ pt: 10 }}
          heading="Trình bày về dự án"
          links={[]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectEntity}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới tiêu điểm
            </Button>
          }
        />
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={pitchs && pitchs?.length !== 0 ? TABLE_HEAD.normal : TABLE_HEAD.normal}
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
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>

                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{id}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{title}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal" align="center">
                          <TextField
                            value={priority}
                            variant="standard"
                            onChange={(value) => {}}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center">
                          <ProjectMoreMenu
                            onView={() => handleGetProjectById(id)}
                            // onDelete={() => handleDeleteBusinessById(id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {pitchs && pitchs?.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có bất kỳ tiêu đề nào có sẵn để hiển thị
              </h5>
            </Box>
          )}
        </Scrollbar>
        <Divider sx={{ my: 8 }} />
        <HeaderBreadcrumbs
          sx={{ pt: 5 }}
          heading="Nổi bật"
          links={[]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectHighLight}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới nổi bật
            </Button>
          }
        />
        {highlights &&
          highlights.length > 0 &&
          highlights.map((v, i) => {
            return (
              <Box key={i} pb={10}>
                <Box pb={5} display={'flex'}>
                  <Typography variant="h4" color={'#666'} height={50}>
                    Điểm nổi bật
                    <Box width={'33%'}>
                      <Divider variant="fullWidth" sx={{ my: 1, opacity: 0.1 }} />
                    </Box>
                  </Typography>
                </Box>
                <Typography variant="h6" color={'text.secondary'} fontWeight={100}>
                  {<FixQL>{parse(v.content)}</FixQL>}
                </Typography>
              </Box>
            );
          })}
        <Scrollbar>
          {highlights && highlights?.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có bất kỳ chủ đề nổi bật nào có sẵn để hiển thị
              </h5>
            </Box>
          )}
        </Scrollbar>
        <Divider sx={{ my: 5 }} />
        <HeaderBreadcrumbs
          sx={{ pt: 5 }}
          heading="Thông tin mở rộng"
          links={[]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectExtension}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới thông tin mở rộng
            </Button>
          }
        />
        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD.normal}
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
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>

                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{id}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{title}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal" align="center">
                          <Typography variant="subtitle2">{priority}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <ProjectMoreMenu
                            onView={() => handleGetProjectById(id)}
                            // onDelete={() => handleDeleteBusinessById(id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {extensions && extensions?.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có thông tin mở rộng nào có sẵn để hiển thị
              </h5>
            </Box>
          )}
        </Scrollbar>{' '}
        <Divider sx={{ my: 8 }} />
        <HeaderBreadcrumbs
          sx={{ pt: 5 }}
          heading="Tài liệu"
          links={[]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectDocument}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới tài liệu
            </Button>
          }
        />
        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD.normal}
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
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>

                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{id}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal">
                          <Typography variant="subtitle2">{title}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal" align="center">
                          <Typography variant="subtitle2">{priority}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <ProjectMoreMenu
                            onView={() => handleGetProjectById(id)}
                            // onDelete={() => handleDeleteBusinessById(id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {documents && documents?.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có bất kỳ tài liệu nào có sẵn để hiển thị
              </h5>
            </Box>
          )}
        </Scrollbar>
        <Divider sx={{ my: 8 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <HeaderBreadcrumbs
              sx={{ pt: 5 }}
              heading="Truyền thông"
              links={[]}
              action={
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.projectsBusiness.newProjectMedia}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Tạo mới kênh truyền thông
                </Button>
              }
            />
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD.normal}
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
                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                              align="justify"
                              sx={{ bgcolor: '#ffffff' }}
                            ></TableCell>
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
                            <TableCell align="center">
                              <ProjectMoreMenu
                                onView={() => handleGetProjectById(id)}
                                // onDelete={() => handleDeleteBusinessById(id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                              align="justify"
                              sx={{ bgcolor: '#ffffff' }}
                            ></TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {medias && medias?.length === 0 && (
                <Box>
                  <img
                    src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                    style={{ margin: '0px auto', padding: '1rem' }}
                  />
                  <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                    Không có bất kỳ chủ đề nào có sẵn để hiển thị
                  </h5>
                </Box>
              )}
            </Scrollbar>
          </Grid>
          <Grid item xs={12} md={6}>
            <HeaderBreadcrumbs
              sx={{ pt: 5 }}
              heading="Câu hỏi thường gặp"
              links={[]}
              action={
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.projectsBusiness.newProjectFAQ}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Tạo mới câu hỏi
                </Button>
              }
            />
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD.normal}
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
                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                              align="justify"
                              sx={{ bgcolor: '#ffffff' }}
                            ></TableCell>
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
                            <TableCell align="center">
                              <ProjectMoreMenu
                                onView={() => handleGetProjectById(id)}
                                // onDelete={() => handleDeleteBusinessById(id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="normal"
                              align="justify"
                              sx={{ bgcolor: '#ffffff' }}
                            ></TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {faqs && faqs?.length === 0 && (
                <Box>
                  <img
                    src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                    style={{ margin: '0px auto', padding: '1rem' }}
                  />
                  <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                    Không có bất kỳ chủ đề nào có sẵn để hiển thị
                  </h5>
                </Box>
              )}
            </Scrollbar>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8 }} />
        <HeaderBreadcrumbs sx={{ pt: 5 }} heading="Về doanh nghiệp" links={[]} />
        <Scrollbar>
          {abouts && abouts?.length === 0 && (
            <Box>
              <SeoIllustration
                sx={{
                  p: 3,
                  width: 360,
                  margin: '0px auto'
                }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có thông tin nào về doanh nghiệp
              </h5>
            </Box>
          )}
        </Scrollbar>
        <Grid container>
          <Grid xs={12} sm={4} md={5} lg={4}>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(0, 3)
                .map((ab, i) => (
                  <Box key={i}>
                    <Typography py={1} color={'text.disabled'} variant="body1">
                      {ab.title}
                    </Typography>
                    <Typography fontWeight={700} variant="body1">
                      {ab.content}
                    </Typography>
                  </Box>
                ))}
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={4}>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(3, 5)
                .map((ab, i) => (
                  <Box key={i}>
                    <Typography py={1} color={'text.disabled'} variant="body1">
                      {ab.title}
                    </Typography>
                    <Typography fontWeight={700} variant="body1">
                      {ab.content}
                    </Typography>
                  </Box>
                ))}

            <Box display={'flex'} gap={4}>
              <Typography py={1} color={'text.disabled'} variant="body1">
                Truyền thông
              </Typography>
              {abouts &&
                abouts
                  .filter((ab) => ab.title === 'Truyền thông')
                  .map((ab, i) => (
                    <Box key={i} display={'flex-inline'}>
                      <Link to="#" target="_blank">
                        <img src={`static/icons/social/${ab.content}.png`} style={{ width: 20 }} />
                      </Link>
                    </Box>
                  ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 8 }} />
        <Typography sx={{ py: 4 }}>UPDATE</Typography>
        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD.normal}
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
              </TableBody>
            </Table>
          </TableContainer>
          {updates && updates?.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <h5 style={{ textAlign: 'center', padding: '1rem' }}>
                Không có bất kỳ chủ đề nào có sẵn để hiển thị
              </h5>
            </Box>
          )}
        </Scrollbar>
        <BlogNewPostPreview isOpenPreview={open} onClosePreview={handleClosePreview} />
      </Container>
    </Page>
  );
}
