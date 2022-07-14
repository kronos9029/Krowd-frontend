import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeIn, MotionInView } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

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
// ----------------------------------------------------------------------

export default function FaqsList() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <MotionInView variants={varFadeIn}>
      <Accordion>
        <AccordionSummary
          style={{ paddingTop: '1rem', paddingBottom: '1rem', color: '#251E18' }}
          expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
        >
          <Typography variant="subtitle1">+ {t('question_appear_1')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t('question_description_1')}</Typography>
          <Typography style={{ paddingTop: '2rem' }}>{t('question_description_1.1')}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ paddingTop: '1rem', paddingBottom: '1rem', color: '#251E18' }}
          expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
        >
          <Typography variant="subtitle1">+ {t('question_appear_2')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t('question_description_2')}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ paddingTop: '1rem', paddingBottom: '1rem', color: '#251E18' }}
          expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
        >
          <Typography variant="subtitle1">+ {t('question_appear_3')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t('question_description_3')}</Typography>
        </AccordionDetails>
      </Accordion>
    </MotionInView>
  );
}
