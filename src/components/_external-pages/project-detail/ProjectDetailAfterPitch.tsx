import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  styled,
  Typography
} from '@mui/material';
import { height } from '@mui/system';
import { RootState, useSelector } from 'redux/store';

const NavbarTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));
const NavbarBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '10px',
  visibility: 'hidden'
}));
const NavbarTopClickAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
}));
type AboutProps = {
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type AboutListProps = {
  abouts: AboutProps[] | undefined;
  nav: string;
};
function ProjectDetailAfterPitch({ abouts, nav }: AboutListProps) {
  const { detailOfProject } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  const { manager, name } = projectID!;
  return (
    <>
      {/* About */}
      <Container maxWidth={'lg'} sx={{ paddingBottom: '3rem' }}>
        <Box mb={7}>
          <NavbarTopAnchor id={`__navbarTop_${nav}`}></NavbarTopAnchor>
          <Typography textAlign="center" py={1} color={'#666'} variant="h4">
            Về chúng tôi
          </Typography>
          <Box mx="auto" width={'10%'}>
            <NavbarTopClickAnchor id={`__navbarTopClick_${nav}`}></NavbarTopClickAnchor>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        <Grid container display={'flex'} justifyContent={'space-evenly'}>
          <Grid>
            <Box
              mx={'auto'}
              mb={2}
              sx={{
                position: 'relative',
                width: '200px',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '50%'
              }}
            >
              <img src={manager.image} style={{ width: '100%', height: 'auto' }} />
            </Box>

            <Typography
              variant="h3"
              textAlign={'center'}
            >{`${manager.firstName} ${manager.lastName}`}</Typography>
            <Typography textAlign={'center'} py={1} color={'text.disabled'} variant="body1">
              Quản lý dự án
            </Typography>
          </Grid>
          <Grid>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(0, 3)
                .map((ab, i) => (
                  <Box key={i}>
                    <Button
                      href={`${ab.link}`}
                      target="_blank"
                      disabled={ab.link === null}
                      sx={{ opacity: ab.link ? 1 : 0.4 }}
                    >
                      <Card sx={{ borderRadius: '45% 0% 0% 45%', height: 100 }}>
                        <Grid
                          container
                          display={'flex'}
                          alignItems="center"
                          justifyContent={'center'}
                          textAlign={'center'}
                        >
                          <Grid sx={{ mt: 2.6 }}>
                            <img
                              style={{ borderRadius: '50%', width: 60 }}
                              src={`/static/icons/navbar/${ab.title}.png`}
                            />
                          </Grid>
                          <Grid>
                            <Typography variant="subtitle2" sx={{ mt: 4, width: 200 }}>
                              Theo dõi chúng tôi qua{' '}
                              <Typography sx={{ fontWeight: '700' }}>{ab.title}</Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Button>
                  </Box>
                ))}
          </Grid>

          {/* <Grid xs={12} sm={4} md={5} lg={4}>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(3, 5)
                .map((ab, i) => (
                  <Box key={i}>
                    <Typography py={1} color={'text.disabled'} variant="body1">
                      {ab.title}
                    </Typography>
                    <Typography fontWeight={700} variant="body1">
                      {ab.content}
                    </Typography>
                  </Box>
                ))}
            <Typography py={1} color={'text.disabled'} variant="body1">
              Truyền thông
            </Typography>
            <Box display={'flex'} gap={4}>
              {abouts &&
                abouts
                  .filter((ab) => ab.title === 'Truyền thông')
                  .map((ab, i) => (
                    <Box key={i} display={'flex-inline'}>
                      <Link href="ab.link" target="_blank">
                        <img src={`static/icons/social/${ab.content}.png`} style={{ width: 20 }} />
                      </Link>
                    </Box>
                  ))}
            </Box>
          </Grid> */}
        </Grid>
        <NavbarBottomAnchor id={`__navbarBottom_${nav}`}></NavbarBottomAnchor>
      </Container>

      {/* Press */}
    </>
  );
}
export default ProjectDetailAfterPitch;
