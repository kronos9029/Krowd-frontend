import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon, IconifyIcon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import bookFill from '@iconify/icons-eva/book-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Menu,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getTransactionList } from 'redux/slices/krowd_slices/transaction';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE } from 'components/table/krowd-table/KrowdTable';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type AvatarIconProps = {
  icon: IconifyIcon;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral'
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Avatar>
  );
}

export default function BankingRecentTransitions() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { transactionState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfAccountTransaction: list, numOfAccountTransaction } = transactionState;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getTransactionList(pageIndex, pageSize));
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader title="Giao dịch gần đây" sx={{ mb: 3 }} />
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mô tả giao dịch</TableCell>
                <TableCell>Ngày gửi</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>Số tiền</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(0, 5).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative' }}>
                        <img style={{ width: 40 }} src={`/static/icons/navbar/ic_momo.png`} />{' '}
                      </Box>
                      <Box sx={{ ml: 2 }}>
                        <Typography>Ví momo</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2">
                      {row.createDate.toString().substring(0, 10)}
                    </Typography>
                    <Typography variant="subtitle2">
                      {row.createDate.toString().substring(10, 20)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'right'
                    }}
                  >
                    {fCurrency(row.amount)}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }}></TableCell>
                  <TableCell sx={{ textAlign: 'right' }}></TableCell>
                  <TableCell>
                    <Label
                      variant={isLight ? 'ghost' : 'filled'}
                      color={(row.message === 'Giao dịch thành công.' && 'success') || 'error'}
                    >
                      {row.message}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            href={PATH_DASHBOARD.transaction.list}
            size="small"
            color="inherit"
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            Xem tất cả giao dịch
          </Button>
        </Box>
      </Card>
    </>
  );
}
