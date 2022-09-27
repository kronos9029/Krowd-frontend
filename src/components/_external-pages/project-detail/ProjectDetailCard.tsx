import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography
} from '@mui/material';
import { Project1 } from '../../../@types/krowd/project';
import { fCurrency } from 'utils/formatNumber';
import { Link } from 'react-scroll';
import { ProjectDetailAlbumCarousel } from 'components/_external-pages/project-detail/index';
import { PATH_PAGE } from 'routes/paths';
//Language
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#14B7CC'
  }
}));

type ProjectDetailCardProps = {
  project: Project1;
};
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
function ProjectDetailCard({ project: p }: ProjectDetailCardProps) {
  //Language
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM' | 'ABOUT' | 'HIGHLIGHT' | 'PRESS' | 'FAQ'
  ) => {
    return p.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  const album = [
    p.image,
    ...getEntityList('ALBUM')!
      .map((_image) => _image.link)
      .filter(notEmpty)
  ];

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
  const handleInvest = () => {
    // href={PATH_PAGE.checkout}
    navigate(PATH_PAGE.checkout);
  };
  return (
    <Grid container>
      <Grid
        px={{ lg: 0, md: 0, sm: 5, xs: 2 }}
        sx={{ pr: 5 }}
        py={{ lg: 0, md: 3, sm: 3 }}
        item
        xs={12}
        sm={12}
        md={7}
        lg={8}
      >
        {album && <ProjectDetailAlbumCarousel album={album} />}
      </Grid>
      <Grid
        px={{ lg: 5, md: 5, sm: 5, xs: 2 }}
        py={{ lg: 5, md: 3, sm: 3, xs: 3 }}
        item
        xs={12}
        sm={12}
        md={5}
        lg={4}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '0.5rem'
            }}
          >
            <Typography
              paragraph
              sx={{
                color: '#251E18',
                marginBottom: '0.2rem'
              }}
            >
              <strong>{t(`Invested`)}</strong>
            </Typography>
            <Typography
              paragraph
              sx={{
                color: '#251E18',
                marginBottom: '0.2rem'
              }}
            >
              <strong>{t(`InvestCapital`)}</strong>
            </Typography>
          </Box>
          <BorderLinearProgress
            variant="determinate"
            value={(p && (p.investedCapital / p.investmentTargetCapital) * 100) ?? 0}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: '0.5rem'
            }}
          >
            <Typography
              paragraph
              sx={{
                color: '#14B7CC'
              }}
            >
              <strong>{fCurrency(p.investedCapital)}</strong>
            </Typography>
            <Typography
              paragraph
              sx={{
                color: '#FF7F56'
              }}
            >
              <strong>{fCurrency(p.investmentTargetCapital)}</strong>
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ color: 'text.disabled' }} />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.sharedRevenue}
            <span>%</span>
            <Typography color="text.disabled" variant="subtitle2">
              {t(`Project_detail_card.ShareRevenue`)}
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ color: 'text.disabled' }} />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            <span>x</span>
            {p.multiplier}
            <Typography color="text.disabled" variant="subtitle2">
              {t(`Project_detail_card.Multiplier`)}
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ color: 'text.disabled' }} />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.duration} <span> {t(`Project_detail_card.month`)} </span>
            <Typography color="text.disabled" variant="subtitle2">
              {t(`Project_detail_card.duration`)}
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ color: 'text.disabled' }} />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.numOfStage} <span> {t(`Project_detail_card.Term`)}</span>
            <Typography color="text.disabled" variant="subtitle2">
              {t(`Project_detail_card.numOfStage`)}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            sx={{
              backgroundColor: '#FF7F50',
              color: 'white',
              '&:hover': { backgroundColor: '#FF7F50' }
            }}
            fullWidth={true}
            variant="contained"
            size="large"
            color="warning"
            onClick={() => handleInvest()}
          >
            {t(`Project_detail_card.investNow`)}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
export default ProjectDetailCard;
{
  /*                 <Divider sx={{  color: 'text.disabled' }} />
   */
}
{
  /* <Box
                    sx={{
                      my: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Doanh nghiệp
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.business.name}</Typography>
                  </Box>

                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Khu vực
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.name}</Typography>
                  </Box>

                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Địa chỉ
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.address}</Typography>
                  </Box> */
}
