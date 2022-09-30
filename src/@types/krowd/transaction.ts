import { type } from 'os';

export enum TRANSACTION_STATUS_ENUM {
  // SUCCESS = 'Giao dịch thành công',
  // SUCCESS = 'Giao dịch thành công.',
  SUCCESS = 'Giao d\u1ECBch th\u00E0nh c\u00F4ng.',
  PAYMENT_LIMIT = 'Số tiền thanh toán vượt quá hạn mức thanh toán',
  ERROR_UNKROW = 'Lỗi không xác định. Vui lòng liên hệ MoMo để biết thêm chi tiết.',
  EXPIRED_TRANSACTIONS = 'Giao dịch đã hết hạn.',
  USER_DENIED = 'Giao dich bi tu choi boi nguoi dung.'
}

export type Transaction = {
  id: string;
  fromUserId: string;
  partnerClientId: string;
  amount: string;
  orderType: string;
  message: string;
  orderId: string;
  partnerCode: string;
  payType: string;
  signature: string;
  requestId: string;
  responsetime: string;
  resultCode: string;
  extraData: string;
  orderInfo: string;
  transId: string;
  createDate: string;
  type: string;
};
export type WalletTransaction = {
  id: string;
  userId: string;
  paymentId: string;
  systemWalletId: string;
  projectWalletId: string;
  investorWalletId: string;
  amount: number;
  description: string;
  type: string;
  fromWalletId: string;
  toWalletId: string;
  fee: number;
  createDate: Date | string;
  createBy: string;
  updateDate: Date | string;
  updateBy: string;
  isDeleted: boolean;
};