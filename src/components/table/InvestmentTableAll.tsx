import React, { useEffect, useState } from 'react';
import {
  getInvestmentByID,
  getInvestmentProjectID
} from '../../redux/slices/krowd_slices/transaction';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import total from '@iconify/icons-eva/text-outline';
import time from '@iconify/icons-eva/clock-outline';
import done from '@iconify/icons-eva/checkmark-circle-2-outline';
import paytime from '@iconify/icons-eva/close-square-outline';
import warning from '@iconify/icons-eva/trending-up-fill';
import {
  Typography,
  Box,
  Card,
  Divider,
  Dialog,
  DialogContent,
  DialogContentText,
  Button
} from '@mui/material';

import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
import { Container, Stack } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { REACT_APP_API_URL } from 'config';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { fCurrency } from 'utils/formatNumber';
import { LoadingButton } from '@mui/lab';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectId', label: 'DỰ ÁN', align: 'center' },
  { id: 'totalPrice', label: 'TRẠNG THÁI DỰ ÁN', align: 'center' },
  { id: 'packageId', label: 'GÓI', align: 'center' },
  { id: 'packagePrice', label: 'GIÁ GÓI', align: 'center' },
  { id: 'quantity', label: 'SỐ LƯỢNG', align: 'center' },
  { id: 'totalPrice', label: 'TỔNG TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY ĐẦU TƯ', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI ĐẦU TƯ', align: 'center' },
  { id: '', label: 'HỦY ĐẦU TƯ', align: 'center' }
];
const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Thao tác HỦY ĐẦU TƯ cho bạn hủy đầu tư trong vòng 24 tiếng (Tính từ lúc bạn đầu tư dự án)'
  },
  {
    name: 'Bảng biểu thị thông tin giao dịch đầu tư của bạn (Nếu có bất kỳ thắc mắc xin vui lòng liên lạc với bộ phận hỗ trợ của Krowd tại 19007777)'
  }
];
export default function InvestmentTableAll() {
  const { investmentState, investmentDetailState } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const { isLoading, listOfInvestment: list, numOfInvestment, filterCount } = investmentState;
  const { InvestmentDetail } = investmentDetailState;

  const milliSecs = 86400000;
  const [value, setValue] = useState(Date.now());
  const [InvestDate, setInvestDate] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getInvestmentProjectID('', pageIndex, 5));
    setInvestDate(
      Date.parse(
        InvestmentDetail?.createDate.toString().substring(0, 10).split('/').reverse().join('/') ??
          ''
      )
    );
  }, [dispatch, pageIndex, InvestmentDetail?.createDate]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };
  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { Authorization: `Bearer ${token}` };
  }
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const headers = getHeaderFormData();
        await axios
          .put(REACT_APP_API_URL + `/investments/${InvestmentDetail?.id}`, values, {
            headers: headers
          })
          .then(() => {
            enqueueSnackbar('Hủy đầu tư thành công', {
              variant: 'success'
            });
            setOpen(false);
            dispatch(getInvestmentProjectID('', pageIndex, 5));
          })
          .catch(() => {
            enqueueSnackbar(
              'Hủy đầu tư thất bại vui lòng kiểm tra lại. Bạn chỉ được hủy đầu tư trong vòng 24h(Tính từ ngày bạn đầu tư)',
              {
                variant: 'error'
              }
            );
          });
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;
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
            type: DATA_TYPE.TEXT_FORMAT,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          },

          {
            name: 'projectStatus',
            value:
              (_item.projectStatus === 'CLOSED' && 'Đã đóng') ||
              (_item.projectStatus === 'ACTIVE' && 'Đang hoạt động') ||
              (_item.projectStatus === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.projectStatus === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.projectStatus === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.projectStatus === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.projectStatus === 'DENIED' && 'Đã bị từ chối') ||
              (_item.projectStatus === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.projectStatus === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.projectStatus === 'CALLING_FOR_INVESTMENT' && '#14b7cc') ||
              (_item.projectStatus === 'DRAFT' && 'black') ||
              (_item.projectStatus === 'WAITING_FOR_APPROVAL' && '#eacb00') ||
              (_item.projectStatus === 'WAITING_TO_ACTIVATE' && '#4dc0b5') ||
              (_item.projectStatus === 'ACTIVE' && 'green') ||
              (_item.projectStatus === 'WAITING_TO_PUBLISH' && '#f66d9b') ||
              (_item.projectStatus === 'CLOSED' && '#6574cd') ||
              (_item.projectStatus === 'DENIED' && 'red') ||
              (_item.projectStatus === 'CALLING_TIME_IS_OVER' ? 'red' : 'black')
          },
          {
            name: 'packageName',
            value: _item.packageName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'packagePrice',
            value: `${_item.packagePrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'quantity',
            value: `${_item.quantity} gói`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'totalPrice',
            value: `${_item.totalPrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT_FORMAT
          },
          {
            name: 'status',
            value:
              (_item.status === 'SUCCESS' && 'Đầu tư thành công') ||
              (_item.status === 'FAILED' && 'Đầu tư thất bại') ||
              (_item.status === 'CANCELED' && 'Đã hủy bỏ đầu tư') ||
              (_item.status === 'WAITING' && 'Chờ xử lý'),
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          }
        ]
      };
    });
  };
  return (
    <>
      {' '}
      <Scrollbar sx={{ mb: 4 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 5,
            width: '1500px',
            minWidth: 1000
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={total} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>TẤT CẢ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.all} lần đầu tư{' '}
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />{' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={time} height={40} width={40} color={'#fc980b'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#fc980b' }}>CHỜ XỬ LÝ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.waiting} yêu cầu
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={warning} height={40} width={40} color={'red'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'red' }}>
                ĐẦU TƯ THẤT BẠI
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.failed} lần
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={paytime} height={40} width={40} color={'red'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'red' }}>HỦY BỎ ĐẦU TƯ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.canceled} yêu cầu
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={done} height={40} width={40} color={'green'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'green' }}>
                ĐẦU TƯ THÀNH CÔNG
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.success} lần{' '}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Scrollbar>
      <KrowdTable
        headingTitle={`GIAO DỊCH ĐẦU TƯ`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        cancelInvest={() => handleClickOpen()}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfInvestment,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
        noteTable={note}
      />
      {InvestmentDetail &&
      InvestmentDetail.status !== 'CANCELED' &&
      InvestmentDetail.status !== 'FAILED' &&
      InvestDate + milliSecs >= value ? (
        <Dialog
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogContent>
            <Box mt={1}>
              <DialogContentText
                sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: '#14b7cc' }}
              >
                BẠN MUỐN HỦY ĐẦU TƯ ?
              </DialogContentText>
            </Box>
            <Stack spacing={{ xs: 2, md: 1 }}>
              <Container sx={{ p: 2 }}>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>
                    Yêu cầu hủy đầu tư {InvestmentDetail?.projectName}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    p: 1
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Dự án đã đầu tư</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>{InvestmentDetail?.projectName}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    p: 1
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Ngày đầu tư</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>{InvestmentDetail?.createDate}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    p: 1
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Tổng số tiền</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>{fCurrency(InvestmentDetail?.totalPrice ?? '')}</strong>
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    p: 1,

                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',

                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Gói đầu tư</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {/* {resDate} */}
                    <strong> {InvestmentDetail?.packageName}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Giá gói đầu tư</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {fCurrency(InvestmentDetail?.packagePrice ?? '')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Tổng số gói</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {InvestmentDetail?.quantity} Gói
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Trạng thái giao dịch</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: 'green',
                      fontWeight: 700
                    }}
                  >
                    {InvestmentDetail?.status === 'SUCCESS' && 'Đầu tư thành công'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontSize: '14px',
                      color: '#ff7600'
                    }}
                  >
                    Lưu ý: Bạn được hủy đầu tư trong vòng 24 tiếng (Tính từ thời gian bạn đầu tư dự
                    án).
                  </Typography>
                </Box>
              </Container>
            </Stack>
            <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
              <Button color="error" variant="contained" onClick={() => handleClose()}>
                Đóng
              </Button>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Hủy đầu tư
                  </LoadingButton>
                </Form>
              </FormikProvider>
            </Box>
            <Box p={3}>
              <Typography variant="body2">
                Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với bộ
                phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {InvestmentDetail && InvestmentDetail.status === 'CANCELED' ? (
            <DialogContent>
              <Box mt={1}>
                <DialogContentText
                  sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'red' }}
                >
                  BẠN ĐÃ HỦY ĐẦU TƯ
                </DialogContentText>
              </Box>

              <Stack spacing={{ xs: 2, md: 1 }}>
                <Container sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Dự án</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{InvestmentDetail?.projectName}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Ngày hủy đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{InvestmentDetail?.updateDate}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Tổng số tiền</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{fCurrency(InvestmentDetail?.totalPrice ?? '')}</strong>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,

                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',

                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Gói đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {/* {resDate} */}
                      <strong> {InvestmentDetail?.packageName}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Giá gói đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {fCurrency(InvestmentDetail?.packagePrice ?? '')}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Tổng số gói</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {InvestmentDetail?.quantity} Gói
                    </Typography>
                  </Box>
                </Container>
              </Stack>
              <Box>
                <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                  Đóng
                </Button>
              </Box>
              <Box p={3}>
                <Typography variant="body2">
                  Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với bộ
                  phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                </Typography>
              </Box>
            </DialogContent>
          ) : (
            <DialogContent>
              <Box mt={1}>
                <DialogContentText
                  sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: '#e1920a' }}
                >
                  BẠN KHÔNG THỂ HỦY ĐẦU TƯ
                </DialogContentText>
              </Box>
              <Stack spacing={{ xs: 2, md: 1 }}>
                <Container sx={{ p: 2 }}>
                  <Box>
                    <Typography sx={{ textAlign: 'center', color: '#e1920a' }}>
                      Bạn được hủy đầu tư trong vòng 24 tiếng (Tính từ thời gian bạn đầu tư dự án).
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Dự án đã đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{InvestmentDetail?.projectName}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Ngày đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{InvestmentDetail?.createDate}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: '0.5rem',
                      p: 1
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Tổng số tiền</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>{fCurrency(InvestmentDetail?.totalPrice ?? '')}</strong>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,

                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',

                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Gói đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {/* {resDate} */}
                      <strong> {InvestmentDetail?.packageName}</strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Giá gói đầu tư</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {fCurrency(InvestmentDetail?.packagePrice ?? '')}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Tổng số gói</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18'
                      }}
                    >
                      {InvestmentDetail?.quantity} Gói
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#251E18',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <strong>Trạng thái giao dịch</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: 'green',
                        fontWeight: 700
                      }}
                    >
                      {InvestmentDetail?.status === 'SUCCESS' && 'Đầu tư thành công'}
                    </Typography>
                  </Box>
                </Container>
              </Stack>
              <Box>
                <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                  Đóng
                </Button>
              </Box>
              <Box p={3}>
                <Typography variant="body2">
                  Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với bộ
                  phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                </Typography>
              </Box>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
}
