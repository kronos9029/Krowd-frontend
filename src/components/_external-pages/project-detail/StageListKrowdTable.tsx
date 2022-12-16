import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../../table/krowd-table/KrowdTable';

import { Typography, Container } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { Project1 } from '../../../@types/krowd/project';
import { fCurrency } from 'utils/formatNumber';
const TABLE_HEAD = [
  { id: 'name', label: 'GIAI ĐOẠN', align: 'center' },
  { id: 'Optimistic_Expected_Amount', label: 'LẠC QUAN', align: 'center' },
  { id: 'Normal_Expected_Amount', label: 'BÌNH THƯỜNG', align: 'center' },
  { id: 'Pessimistic_Expected_Amount', label: 'BI QUAN', align: 'center' },
  { id: 'Optimistic_Expected_Ratio', label: 'LẠC QUAN(%)', align: 'center' },
  { id: 'Normal_Expected_Ratio', label: 'BÌNH THƯỜNG(%)', align: 'center' },
  { id: 'Pessimistic_Expected_Ratio', label: 'BI QUAN(%)', align: 'center' },
  { id: 'startDate', label: 'NGÀY BẮT ĐẦU', align: 'center' },
  { id: 'endDate', label: 'NGÀY KÊT THÚC', align: 'center' }
];
const TABLE_HEAD2 = [
  { id: 'name', label: 'GIAI ĐOẠN', align: 'center' },
  { id: 'paidAmount', label: 'ĐÃ THANH TOÁN', align: 'center' },
  { id: 'sharedAmount', label: 'DOANH THU CHIA SẺ', align: 'center' },
  { id: 'Optimistic_Expected_Amount', label: 'BẠN NHẬN ĐƯỢC', align: 'center' },
  { id: 'startDate', label: 'NGÀY CẬP NHẬT', align: 'center' },
  { id: 'Optimistic_Expected_Amount', label: '', align: 'center' }
];

export default function StageListKrowdTable({ project }: { project: Project1 }) {
  const { isLoading, projectStageList } = useSelector((state: RootState) => state.stage);
  const { listOfStage: list } = projectStageList;
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'name',
            value: `${_item.name} `,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Optimistic_Expected_Amount',
            value: fCurrency(_item.optimisticExpectedAmount)
              ? fCurrency(_item.optimisticExpectedAmount)
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'Normal_Expected_Amount',
            value: fCurrency(_item.normalExpectedAmount)
              ? fCurrency(_item.normalExpectedAmount)
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'Pessimistic_Expected_Amount',
            value: fCurrency(_item.pessimisticExpectedAmount)
              ? fCurrency(_item.pessimisticExpectedAmount)
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'Optimistic_Expected_Ratio',
            value: _item.optimisticExpectedRatio
              ? `${_item.optimisticExpectedRatio}%`
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'Normal_Expected_Ratio',
            value: _item.normalExpectedRatio ? `${_item.normalExpectedRatio}%` : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'Pessimistic_Expected_Ratio',
            value: _item.pessimisticExpectedRatio
              ? `${_item.pessimisticExpectedRatio}%`
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'stateDate',
            value: _item.startDate.toString().substring(0, 10),
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'endDate',
            value: _item.endDate.toString().substring(0, 10),
            type: DATA_TYPE.NUMBER
          }
        ]
      };
    });
  };
  const getData2 = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'name',
            value: `${_item.name} `,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'paidAmount',
            value: fCurrency(_item.paidAmount) ? fCurrency(_item.paidAmount) : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'sharedAmount',
            value: fCurrency(_item.sharedAmount) ? fCurrency(_item.sharedAmount) : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'receivableAmount',
            value: fCurrency(_item.receivedAmount)
              ? fCurrency(_item.receivedAmount)
              : 'Chưa cập nhật',
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'updateDate',
            value: _item.updateDate.toString().substring(0, 10),
            type: DATA_TYPE.NUMBER
          }
        ]
      };
    });
  };

  return (
    <>
      {projectID?.status === 'ACTIVE' ? (
        <>
          <KrowdTable
            headingTitle="Danh sách thống kê các kỳ"
            header={TABLE_HEAD2}
            getData={getData2}
            isLoading={isLoading}
          />
          <Typography sx={{ my: 2, color: 'rgb(252, 152, 11)' }} variant="body2">
            * DOANH THU CHIA SẺ là số tiền sẽ được chia đều cho các nhà đầu tư cùng tham gia dự án
          </Typography>
          <Typography sx={{ my: 2, color: 'rgb(252, 152, 11)' }} variant="body2">
            * DOANH THU CHIA SẺ nhận được sẽ tương ứng với giá trị gói mà bạn đầu tư
          </Typography>
        </>
      ) : (
        <>
          <KrowdTable
            headingTitle="Danh sách thống kê các kỳ"
            header={TABLE_HEAD}
            getData={getData}
            isLoading={isLoading}
          />
          <Typography sx={{ my: 2 }} variant="body2">
            * Đơn vị doanh thu VND và tỉ lệ sẽ là phần trăm (%)
          </Typography>
          <Typography sx={{ my: 2 }} variant="body2">
            * Số liệu chỉ mang tính chất tham khảo
          </Typography>
        </>
      )}
    </>
  );
}
