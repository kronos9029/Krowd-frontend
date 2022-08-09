import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// material
import { Button, Container, Stack, Card, TableContainer, TableBody } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// hooks
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD, PATH_DETAILS } from '../../routes/paths';
// @types
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Scrollbar from 'components/Scrollbar';
import { UserListHead } from 'components/_dashboard/user/list';
import { Link } from 'react-router-dom';

// material
import { Table, Avatar, TableRow, TableCell, Typography, TablePagination } from '@mui/material';

// routes
// ----------------------------------------------------------------------
import SearchNotFound from '../../components/SearchNotFound';
import { getUserList } from 'redux/slices/krowd_slices/user';

const TABLE_HEAD = [
  { id: 'id', label: 'Tên', alignRight: true },
  { id: 'title', label: 'Doanh nghiệp', alignRight: false },
  { id: 'phoneNum', label: 'SĐT', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

const handleRequestSort = (property: string) => {};
// ----------------------------------------------------------------------

export default function UserOfBusiness() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { UserKrowd } = useSelector((state: RootState) => state.userKrowd);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Page title="Quản lý thành viên | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Người sở hữu dự án"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.projectsBusiness.newProjectOwner}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới thành viên
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
                  rowCount={1}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {UserKrowd.listOfUser
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { lastName, firstName, image, business, role, phoneNum, email, id } =
                        row;
                      const isItemSelected = selected.indexOf(firstName) !== -1;
                      if (role?.name === 'PROJECT_OWNER') {
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell width={'200px'} component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Link to={PATH_DETAILS} style={{ textDecoration: 'none' }}>
                                  <Avatar alt={firstName} src={image} />
                                </Link>
                                <Typography variant="subtitle2">{`${firstName} ${lastName}`}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                              <Typography>{business?.name}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                              <Typography>{phoneNum}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                              <Typography>{email}</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={UserKrowd.numOfUser}
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
