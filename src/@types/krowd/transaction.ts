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

//GET ALL WALEET TRANSACTION
export type WalletTransaction = {
  numOfWalletTransaction: number;
  listOfWalletTransaction: ListOfWalletTransaction[];
  filterCount: FilterCount;
};

export type FilterCount = {
  all: number;
  i1: number;
  i2: number;
  i3: number;
  i4: number;
  i5: number;
  p1: null;
  p2: null;
  p3: null;
  p4: null;
  p5: null;
  cashIn: number;
  cashOut: number;
  deposit: number;
  withdraw: number;
};

export type ListOfWalletTransaction = {
  id: string;
  paymentId: null | string;
  systemWalletId: null;
  projectWalletId: null | string;
  investorWalletId: null | string;
  amount: number;
  description: string;
  type: string;
  fromWalletId: null | string;
  toWalletId: string;
  fee: number;
  createDate: string;
  createBy: string;
};
//GET ALL PAYMENT
export type Payment = {
  numOfPayment: number;
  listOfInvestmentPayment: ListOfInvestmentPayment[];
  listOfPeriodRevenuePayment: null;
};

export type ListOfInvestmentPayment = {
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
//GET ALL REVENUE
export type PaymentTypeRevenue = {
  numOfPayment: number;
  listOfInvestmentPayment: null;
  listOfPeriodRevenuePayment: ListOfPeriodRevenuePayment[];
};

export type ListOfPeriodRevenuePayment = {
  projectId: string;
  projectName: string;
  stageId: string;
  stageName: string;
  fromWalletName: string;
  fee: null;
  id: string;
  periodRevenueId: string;
  investmentId: null;
  amount: number;
  description: string;
  type: string;
  fromId: string;
  toId: string;
  createDate: string;
  createBy: string;
  status: string;
};
// ===================================INVESTMENT================================

export type Investment = {
  numOfInvestment: number;
  listOfInvestment: ListOfInvestment[];
  filterCount: FilterCountInvestment;
};

export type FilterCountInvestment = {
  waiting: number;
  success: number;
  failed: number;
  canceled: number;
  all: number;
};

export type ListOfInvestment = {
  id: string;
  investorId: string;
  totalPrice: number;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  investorName: string;
  investorImage: string;
  investorEmail: string;
  packageName: string;
  projectStatus: string;
  packagePrice: number;
  projectName: string;
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
  stageName: string;
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
// ===================================WITH DRAW REQUEST================================

export type WithDrawRequest = {
  numOfWithdrawRequest: number;
  listOfWithdrawRequest: ListOfWithdrawRequest[];
};

export type ListOfWithdrawRequest = {
  id: string;
  bankName: string;
  accountName: string;
  bankAccount: string;
  description: string;
  amount: number;
  status: string;
  refusalReason: null;
  createDate: string;
  reportMessage: null;
  createBy: string;
  updateDate: string;
  updateBy: string;
};

// ===================================WITH DRAW REQUEST================================
export type PeriodRevenue = {
  id: string;
  name: string;
  periodRevenueId: string;
  amount: number;
  description: string;
  createDate: string;
  createBy: string;
};
