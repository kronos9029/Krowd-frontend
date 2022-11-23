import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme } from '@mui/material/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getProjectListInvestedById } from 'redux/slices/krowd_slices/project';

// ----------------------------------------------------------------------

export default function AppNewInvoice() {
  const theme = useTheme();
  const { InvestedProjectDetails } = useSelector((state: RootState) => state.project);
  const { listOfProject } = InvestedProjectDetails;
  // useEffect(() => {
  //   dispatch(getProjectListInvestedById(localStorage.getItem('projectId') ?? ''));
  // }, [dispatch]);
  return (
    <Card>
      <CardHeader title="Gói bạn đã đầu tư" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 620 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gói đã mua</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Tổng tiền </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>Ngày mua</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfProject &&
                listOfProject?.investmentRecords.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{`${row.packageName}`}</TableCell>
                    <TableCell>Bạn đã mua {row.quantity} gói</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>{fCurrency(row.totalPrice)}</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>{row.createDate}</TableCell>

                    {/* <TableCell>
                      <Label
                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'in_progress' && 'warning') ||
                          (row.status === 'out_of_date' && 'error') ||
                          'success'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
    </Card>
  );
}
