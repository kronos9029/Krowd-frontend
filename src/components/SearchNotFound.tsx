import { Paper, PaperProps, Typography } from '@mui/material';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
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
export default function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundProps) {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {t('not_found')}
      </Typography>
      <Typography variant="body2" align="center">
        {t('No_results_found')} &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. {t('Try_checking')}
      </Typography>
    </Paper>
  );
}
