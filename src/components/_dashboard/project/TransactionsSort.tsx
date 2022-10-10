// material
import { MenuItem, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import { dispatch, RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------

type BlogPostsSortProps = {
  query: string;
  onSort: (value?: string) => void;
};

export default function TransactionsSort({ query, onSort }: BlogPostsSortProps) {
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  useEffect(() => {
    dispatch(getWalletList());
  }, [dispatch]);
  return (
    <TextField select size="small" value={query} onChange={(e) => onSort(e.target.value)}>
      {listOfInvestorWallet.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.walletType}
        </MenuItem>
      ))}
    </TextField>
  );
}
