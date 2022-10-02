import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import {
  getAllPaymentList,
  getAllPaymentListRevenue,
  getWalletTransactionList
} from 'redux/slices/krowd_slices/transaction';
import { useParams } from 'react-router';
import { Button, Grid } from '@mui/material';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectName', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'packageName', label: 'GÓI DỰ ÁN', align: 'left' },
  { id: 'investedQuantity', label: 'SỐ LƯỢNG', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' }
];

export default function PaymentProjectTable() {
  const { paymentListState, paymentListRevenueState } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const { isLoading, paymentList: list } = paymentListState;
  const { isLoadingPeriodRevenue, paymentListPeriodRevenue: listPeriodRevenue } =
    paymentListRevenueState;
  const [openStage, setOpenStage] = useState('INVESTMENT');

  useEffect(() => {
    dispatch(getAllPaymentList());
    dispatch(getAllPaymentListRevenue());
  }, [dispatch]);

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
  return (
    <>
      <Grid
        container
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={5}
      >
        <Grid lg={8}></Grid>
        <Grid lg={4}>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
            <Grid>
              <Button variant="outlined" onClick={handleClickOpenStage}>
                DANH SÁCH THANH TOÁN
              </Button>
            </Grid>
            <Grid>
              <Button variant="outlined" onClick={handleCloseOpenStage}>
                DOANH THU THEO KỲ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openStage === 'INVESTMENT' ? (
        <KrowdTable
          headingTitle="DANH SÁCH THANH TOÁN"
          header={TABLE_HEAD}
          getData={getData}
          isLoading={isLoading}
          // viewPath={PATH_DASHBOARD.business.details}
        />
      ) : (
        <KrowdTable
          headingTitle="DANH SÁCH DOANH THU THEO KỲ"
          header={TABLE_HEAD}
          getData={getData2}
          isLoading={isLoadingPeriodRevenue}
          // viewPath={PATH_DASHBOARD.business.details}
        />
      )}
    </>
  );
}
