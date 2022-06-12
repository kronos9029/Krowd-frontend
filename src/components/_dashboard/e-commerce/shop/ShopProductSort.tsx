import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { sortByProducts } from '../../../../redux/slices/product';
// @types
import { ProductState } from '../../../../@types/products';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Ngày tạo dự án' },
  { value: 'newest', label: 'Dự án nổi bật' },
  { value: 'priceDesc', label: 'Từ a - z' },
  { value: 'priceAsc', label: 'Từ z - a' }
];

function renderLabel(label: string | null) {
  if (label === 'Ngày tạo dự án') {
    return 'Featured';
  }
  if (label === 'Dự án nổi bật') {
    return 'Newest';
  }
  if (label === 'Từ a - z') {
    return 'Ký tự: High-Low';
  }
  return 'Ký tự: Từ z - a';
}

export default function ShopProductSort() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const { sortBy } = useSelector((state: { product: ProductState }) => state.product);

  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value: string) => {
    handleClose();
    dispatch(sortByProducts(value));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sắp sếp theo&nbsp;&nbsp;&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
