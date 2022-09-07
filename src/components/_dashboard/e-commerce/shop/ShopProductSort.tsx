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
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------
const SORT_BY_OPTIONS_CONFIG = {
  vi: [
    {
      value: 'featured',
      label: 'Ngày tạo dự án'
    },
    {
      value: 'newest',
      label: 'Dự án mới nhất'
    },
    {
      value: 'Desc',
      label: 'Từ Z - A'
    },
    {
      value: 'Asc',
      label: 'Từ A - Z'
    }
  ],

  en: [
    {
      value: 'featured',
      label: 'Featured'
    },
    {
      value: 'newest',
      label: 'Newest'
    },
    {
      value: 'Desc',
      label: 'Z - A'
    },
    {
      value: 'Asc',
      label: 'A - Z'
    }
  ]
};

function renderLabel(label: string | null) {
  if (label === 'featured') {
    return 'Featured';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'Desc') {
    return 'Z - A';
  }
  return 'A - Z';
}
function renderLabelEng(label: string | null) {
  if (label === 'featured') {
    return 'Ngày tạo dự án';
  }
  if (label === 'newest') {
    return 'Dự án mới nhất';
  }

  if (label === 'Desc') {
    return 'từ Z - A';
  }

  return 'Từ A - Z';
}
const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];

export default function ShopProductSort() {
  const dispatch = useDispatch();
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
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
        {t(`sortByLabel`)}&nbsp;&nbsp;&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {currentLanguageCode === 'vi' ? renderLabelEng(sortBy) : renderLabel(sortBy)}
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
        {(currentLanguageCode === 'vi' ? SORT_BY_OPTIONS_CONFIG.vi : SORT_BY_OPTIONS_CONFIG.en).map(
          (option) => (
            <MenuItem
              key={option.value}
              selected={option.value === sortBy}
              onClick={() => handleSortBy(option.value)}
              sx={{ typography: 'body2' }}
            >
              {option.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}
