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

export type Payment = {
  projectId: string;
  projectName: string;
  packageId: string;
  packageName: string;
  investedQuantity: number;
  fromWalletName: string;
  fee: null;
  id: string;
  periodRevenueId: null;
  investmentId: string;
  amount: number;
  description: string;
  type: string;
  fromId: string;
  toId: string;
  createDate: string;
  createBy: string;
  status: string;
};
export type Investment = {
  id: string;
  investorId: string;
  totalPrice: number;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  projectId: string;
  packageId: string;
  quantity: number;
};

export type DailyReportProject = {
  numOfDailyReport: number;
  listOfDailyReport: ListOfDailyReport[];
};

export type ListOfDailyReport = {
  id: string;
  stageId: string;
  amount: number;
  reportDate: string;
  createDate: Date | string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  status: string;
};
// ===================================BILL IN DAILY REPORT================================
export type BillDailyReport = {
  numOfBill: number;
  listOfBill: Bill[];
};

export type Bill = {
  id: string;
  dailyReportId: string;
  invoiceId: string;
  amount: number;
  description: string;
  createBy: string;
  createDate: string;
};
