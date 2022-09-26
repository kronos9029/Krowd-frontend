export type TopUp = {
  result: ResultTopUpLink;
  id: number;
  exception: any;
  status: string;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: string;
  asyncState: any;
  isFaulted: boolean;
};

export type ResultTopUpLink = {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: any;
  deeplinkMiniApp: any;
  partnerClientId: string;
};
