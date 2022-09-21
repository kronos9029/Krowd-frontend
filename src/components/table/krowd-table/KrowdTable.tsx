import React from 'react';
import { useState } from 'react';
import {
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  CircularProgress,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Container
} from '@mui/material';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Scrollbar from '../../../components/Scrollbar';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link, Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import KrowdTableListHead from '../components/KrowdTableListHead';
import { fCurrency } from '../../../utils/formatNumber';
import eyeFill from '@iconify/icons-eva/eye-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { SeverErrorIllustration } from 'assets';
export enum DATA_TYPE {
  TEXT = 'text',
  CHIP_TEXT = 'chip_text',
  IMAGE = 'image',
  LIST_TEXT = 'list_text',
  NUMBER = 'number',
  WRAP_TEXT = 'wrap_text',
  DATE = 'date',
  CURRENCY = 'currency'
}
export type RowData = {
  id: string;
  items: {
    name: string;
    value: any;
    type: DATA_TYPE;
    textColor?: string;
    textMapColor?: { status: string; color: string }[];
  }[];
};
export type KrowdTableProps = {
  headingTitle: string;
  createNewRecordButton?: { pathTo: string; label: string };
  header: { id: string; label: string; align: string }[];
  getData: () => Array<RowData>;
  viewPath?: string;
  deleteRecord?: (id: string) => void;
  isLoading: boolean;
};

export function KrowdTable({
  headingTitle,
  createNewRecordButton,
  header,
  getData,
  isLoading,
  viewPath,
  deleteRecord
}: KrowdTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const data = getData();
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const dataInPage: RowData[] =
    data && data.length > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

  return (
    <>
      <HeaderBreadcrumbs
        heading={`${headingTitle.toUpperCase()} (${data.length})`}
        links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
        action={
          createNewRecordButton && (
            <Button
              variant="contained"
              component={RouterLink}
              to={createNewRecordButton.pathTo}
              startIcon={<Icon icon={plusFill} />}
            >
              {createNewRecordButton.label}
            </Button>
          )
        }
      />
      {dataInPage.length > 0 ? (
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <KrowdTableListHead
                headLabel={[
                  { id: '__borderHeaderLeft', label: '', align: 'center' },
                  ...header,
                  { id: '__borderHeaderRight', label: '', align: 'center' }
                ]}
              />
              <TableBody>
                {!isLoading &&
                  dataInPage.length > 0 &&
                  dataInPage.map((data, index) => {
                    return (
                      <TableRow hover key={`__${data.id}`} tabIndex={-1} role="checkbox">
                        <TableCell
                          key={'__borderRowLeft'}
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>
                        {data.items.map((_item) => {
                          switch (_item.type) {
                            case DATA_TYPE.TEXT:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography
                                      variant="subtitle2"
                                      noWrap
                                      color={_item.textColor ?? 'text.primary'}
                                    >
                                      {_item.value}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.CURRENCY:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography
                                      variant="subtitle2"
                                      noWrap
                                      sx={{ color: _item.textColor ?? 'text.primary' }}
                                    >
                                      {fCurrency(_item.value)}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.WRAP_TEXT:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2">{_item.value}</Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.NUMBER:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography
                                      variant="subtitle2"
                                      noWrap
                                      mx="auto"
                                      color={_item.textColor ?? 'text.primary'}
                                    >
                                      {_item.value}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.DATE:
                              const date = String(_item.value).split(' ')[0];
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2" noWrap>
                                      {date}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.IMAGE:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar alt={`__${_item.name}__${data.id}`} src={_item.value} />
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.LIST_TEXT:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2" noWrap>
                                      {[..._item.value].map((_o) => _o)}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                            case DATA_TYPE.CHIP_TEXT:
                              return (
                                <TableCell
                                  key={`__${_item.name}__${data.id}`}
                                  component="th"
                                  scope="row"
                                  padding="normal"
                                >
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2" noWrap>
                                      <Chip
                                        label={_item.value}
                                        sx={{
                                          bgcolor:
                                            _item.textMapColor?.find(
                                              (v) => v.status === _item.value
                                            )?.color || 'text.primary',
                                          color: '#ffffff'
                                        }}
                                      />
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              );
                          }
                        })}
                        {viewPath && (
                          <TableCell align="center">
                            <Link to={viewPath + `/${data.id}`}>
                              <Icon
                                icon={eyeFill}
                                width={24}
                                height={24}
                                style={{ margin: '0px auto' }}
                                color={'rgb(255, 127, 80)'}
                              />
                            </Link>
                          </TableCell>
                        )}
                        {deleteRecord && (
                          <TableCell align="center">
                            <Button onClick={() => deleteRecord(data.id)}>
                              <Icon
                                icon={trash2Outline}
                                width={24}
                                height={24}
                                style={{ margin: '0px auto' }}
                                color={'rgb(255, 127, 80)'}
                              />
                            </Button>
                          </TableCell>
                        )}
                        <TableCell
                          key={'__borderRowRight'}
                          component="th"
                          scope="row"
                          padding="normal"
                          align="justify"
                          sx={{ bgcolor: '#ffffff' }}
                        ></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell
                      key={'__borderRowLeft'}
                      component="th"
                      scope="row"
                      padding="normal"
                      align="justify"
                      sx={{ bgcolor: '#ffffff' }}
                    ></TableCell>
                    <TableCell colSpan={6} />
                    <TableCell
                      key={'__borderRowRight'}
                      component="th"
                      scope="row"
                      padding="normal"
                      align="justify"
                      sx={{ bgcolor: '#ffffff' }}
                    ></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && (
            <Box>
              <CircularProgress
                size={100}
                sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
              />
              <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
                Đang tải dữ liệu, vui lòng đợi giây lát...
              </Typography>
            </Box>
          )}
          {!isLoading && dataInPage.length === 0 && (
            <Box>
              <img
                src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
                style={{ margin: '0px auto', padding: '1rem' }}
              />
              <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
                Không có bất kỳ tiêu đề nào có sẵn để hiển thị
              </Typography>
            </Box>
          )}
        </Scrollbar>
      ) : (
        <ErrorProject type="EMPTY" />
      )}

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={(e) => handleChangeRowsPerPage}
      />
    </>
  );
}
export function ErrorProject({ type }: { type: 'EMPTY' | 'UNKNOWN ERROR' }) {
  const content =
    type === 'EMPTY'
      ? {
          title: 'BẠN CHƯA CÓ DỰ ÁN NÀO ĐANG ĐẦU TƯ',
          advise: 'Trở lại trang chủ đầu tư cùng Krowd',
          button: true
        }
      : {
          title: 'Lỗi bất ngờ',
          advise: 'Hãy thử lại sau!!!',
          button: false
        };

  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', py: 10 }}>
        <Typography variant="h6" paragraph>
          {content.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{content.advise}</Typography>

        <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

        {content.button && <Button href="/">Trở về trang chủ</Button>}
      </Box>
    </Container>
  );
}
