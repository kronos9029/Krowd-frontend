import React, { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';

import { useParams } from 'react-router';
import { Button, Grid } from '@mui/material';
import {
  getAllPaymentList,
  getAllPaymentListRevenue
} from '../../../redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectName', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'packageName', label: 'GÓI DỰ ÁN', align: 'left' },
  { id: 'investedQuantity', label: 'SỐ LƯỢNG', align: 'left' },
  { id: 'fromWalletName', label: 'NGUỒN TIỀN', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' }
];
const TABLE_HEAD_REVENUE = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectName', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'packageName', label: 'KỲ', align: 'left' },
  { id: 'fromWalletName', label: 'NGUỒN TIỀN', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'description', label: 'MÔ TẢ GIAO DỊCH', align: 'center' },
  { id: '', label: '', align: 'left' }
];

export default function PaymentProjectTable() {
  const { paymentListState, paymentListRevenueState } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const { isLoading, listOfInvestmentPayment: list, numOfPayment } = paymentListState;
  const {
    isLoadingPeriodRevenue,
    listOfPeriodRevenuePayment: listPeriodRevenue,
    numOfPayment: numberOfRevenue
  } = paymentListRevenueState;
  const [openStage, setOpenStage] = useState('INVESTMENT');
  const [pageIndex2, setPageIndex2] = useState(1);
  const [pageSize2, setPageSize2] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getAllPaymentList(pageIndex, 5));
    dispatch(getAllPaymentListRevenue(pageIndex2, 5));
  }, [dispatch, pageIndex, pageIndex2]);

  const handleClickOpenStage = () => {
    setOpenStage('INVESTMENT');
  };
  const handleCloseOpenStage = () => {
    setOpenStage('PERIOD_REVENUE');
  };
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'projectName',
            value: _item.projectName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'packageName',
            value: _item.packageName,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'investedQuantity',
            value: `${_item.investedQuantity} Gói`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'fromWalletName',
            value: _item.fromWalletName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'amount',
            value: _item.amount,
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.DATE
          },
          {
            name: 'status',
            value: _item.status === 'SUCCESS' ? 'Mua thành công' : 'Mua thất bại',
            type: DATA_TYPE.TEXT,
            textColor: _item.status === 'SUCCESS' ? 'rgb(102, 187, 106)' : 'red'
          }
        ]
      };
    });
  };
  const getData2 = (): RowData[] => {
    if (!listPeriodRevenue) return [];
    return listPeriodRevenue.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'projectName',
            value:
              (_item.projectName === 'Dự án không còn tồn tại' && 'Dự án không còn tồn tại') ||
              _item.projectName,

            type: DATA_TYPE.TEXT,
            textColor:
              (_item.projectName === 'Dự án không còn tồn tại' && 'red') ||
              (_item.projectName === 'Dự án không còn tồn tại' ? 'red' : 'black')
          },
          {
            name: 'stageName',
            value: _item.stageName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'fromWalletName',
            value: _item.fromWalletName,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'amount',
            value: _item.amount,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value: _item.status === 'SUCCESS' ? 'Thành công' : 'Thất bại',
            type: DATA_TYPE.TEXT,
            textColor: _item.status === 'SUCCESS' ? 'rgb(102, 187, 106)' : 'red'
          }
        ]
      };
    });
  };
  return (
    <>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Grid md={7} lg={7}></Grid>
        <Grid md={5} lg={5}>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
            <Grid>
              <Button variant="outlined" onClick={handleClickOpenStage}>
                DANH SÁCH THANH TOÁN DỰ ÁN
              </Button>
            </Grid>
            <Grid>
              <Button variant="outlined" onClick={handleCloseOpenStage}>
                DANH SÁCH DOANH THU THEO KỲ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openStage === 'INVESTMENT' ? (
        <KrowdTable
          headingTitle="THANH TOÁN DỰ ÁN"
          header={TABLE_HEAD}
          getData={getData}
          isLoading={isLoading}
          // viewPath={PATH_DASHBOARD.business.details}
          paging={{
            pageIndex: pageIndex,
            pageSize: pageSize,
            numberSize: numOfPayment,

            handleNext() {
              setPageIndex(pageIndex + 1);
            },
            handlePrevious() {
              setPageIndex(pageIndex - 1);
            }
          }}
        />
      ) : (
        <KrowdTable
          headingTitle="DOANH THU THEO KỲ"
          header={TABLE_HEAD_REVENUE}
          getData={getData2}
          isLoading={isLoadingPeriodRevenue}
          paging={{
            pageIndex: pageIndex2,
            pageSize: pageSize2,
            numberSize: numberOfRevenue,

            handleNext() {
              setPageIndex2(pageIndex2 + 1);
            },
            handlePrevious() {
              setPageIndex2(pageIndex2 - 1);
            }
          }}
          // viewPath={PATH_DASHBOARD.business.details}
        />
      )}
    </>
  );
}
