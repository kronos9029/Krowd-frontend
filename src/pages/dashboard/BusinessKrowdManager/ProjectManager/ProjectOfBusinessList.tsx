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
  TablePagination
} from '@mui/material';
import { fDate } from 'utils/formatTime';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'components/@material-extend';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import project, { getAllProject, getProjectId } from 'redux/slices/krowd_slices/project';
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
// import ProjectMoreMenu from 'components/_dashboard/e-commerce/product-details/ProjectMoreMenu';
// import { ShopTagFiltered } from 'components/_dashboard/e-commerce/projectKrowd';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'managerId', label: 'Người quản lý', alignRight: false },
  { id: 'business', label: 'Doanh nghiệp', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' }
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

export default function ProjectOfBusinessList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { projectList } = useSelector((state: RootState) => state.project);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const { isLoading, data: ListBusiness, error, isFetching } = getAllBusiness();
  // API
  useEffect(() => {
    dispatch(getAllProject('ADMIN'));
  }, [dispatch]);

  const handleDeleteBusinessById = (activeBussinessId: string) => {
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectList.numOfProject) : 0;

  const filteredUsers = applySortFilter(
    projectList.listOfProject,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách các dự án - Quản lý"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectBusiness}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới dự án
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={projectList.numOfProject}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        image,
                        businessLicense,
                        manager,
                        field,
                        business,
                        createDate,
                        createBy,
                        status
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
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
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Link to={PATH_DETAILS} style={{ textDecoration: 'none' }}>
                                <Avatar alt={name} src={image} />
                              </Link>
                              <Typography variant="subtitle2">{name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                            <Typography>{manager.lastName}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                            <Typography>{business.name}</Typography>
                          </TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell>
                            <ProjectMoreMenu
                              onView={() => handleGetProjectById(id)}
                              // onDelete={() => handleDeleteBusinessById(id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                      <img />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={projectList.numOfProject}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
