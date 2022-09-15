export type Wallet = {
  totalAsset: number;
  listOfInvestorWallet: ListOfInvestorWallet[];
  listOfProjectWallet: null;
};

export type ListOfInvestorWallet = {
  walletType: WalletType;
  id: string;
  investorId: string;
  balance: number;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
};

export type WalletType = {
  id: string;
  name: string;
  description: string;
  mode: string;
  type: string;
};
