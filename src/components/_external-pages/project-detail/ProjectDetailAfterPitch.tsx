import { Box, Card, Container, Divider, Grid, Link, styled, Typography } from '@mui/material';
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
  nav: (string | null)[];
};
function ProjectDetailAfterPitch({ abouts, nav }: AboutListProps) {
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);
  const { manager, name } = projectID!;
  const aboutNav = nav.find((value) => value === 'Về dự án');
  return (
    <>
      {/* About */}
      <Container maxWidth={'lg'} sx={{ paddingBottom: '3rem' }}>
        <Box mb={7}>
          <NavbarTopAnchor id={`__navbarTop_${aboutNav}`}></NavbarTopAnchor>
          <Typography textAlign="center" py={1} color={'#666'} variant="h3">
            Giới thiệu về {name}
          </Typography>
          <Box mx="auto" width={'10%'}>
            <NavbarTopClickAnchor id={`__navbarTopClick_${aboutNav}`}></NavbarTopClickAnchor>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        <Grid container>
          <Grid xs={12} sm={4} md={5} lg={4}>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(0, 3)
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
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={4}>
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
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={4} textAlign={'center'}>
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

            <Typography variant="h3">{`${manager.lastName} ${manager.firstName}`}</Typography>
            <Typography py={1} color={'text.disabled'} variant="body1">
              Quản lý dự án
            </Typography>
          </Grid>
        </Grid>
        <NavbarBottomAnchor id={`__navbarBottom_${aboutNav}`}></NavbarBottomAnchor>
      </Container>
      <Box sx={{ mb: 7 }}>
        <Divider variant="fullWidth" />
      </Box>
      {/* Press */}
      <Container maxWidth={'lg'} sx={{ paddingBottom: '5rem' }}>
        <Box mb={7}>
          <NavbarTopAnchor id={`__navbarTop_${aboutNav}`}></NavbarTopAnchor>
          <Typography textAlign="center" py={1} color={'#666'} variant="h3">
            Bài viết liên quan
          </Typography>
          <Box mx="auto" width={'10%'}>
            <NavbarTopClickAnchor id={`__navbarTopClick_${aboutNav}`}></NavbarTopClickAnchor>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        <Grid container gap={3} justifyContent={'space-evenly'}>
          <Grid xs={12} sm={4} md={5} lg={4}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 220,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Are We in the Metaverse Yet?
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Nytimes
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  Crypto people say they're building it. Gamers might already be living in it. The
                  art world is cashing in on it. Web veter...
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={3}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 200,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Welcome to the Metaverse: The First Digital Real Estate
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Real Vision
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  As people are spending increasingly more time in virtual worlds (also known as the
                  metaverse), Janine Yorio, managing dir....
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={3}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 200,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Digital land in Decentraland sells for $913K... to a virt...
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Cointelegraph
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  A virtual plot of real estate situated within the Ethereum-based open-world game,
                  Decentraland, has sold for more than $9...
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={4}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 220,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Are We in the Metaverse Yet?
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Nytimes
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  Crypto people say they're building it. Gamers might already be living in it. The
                  art world is cashing in on it. Web veter...
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={3}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 200,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Welcome to the Metaverse: The First Digital Real Estate
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Real Vision
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  As people are spending increasingly more time in virtual worlds (also known as the
                  metaverse), Janine Yorio, managing dir....
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid xs={12} sm={4} md={5} lg={3}>
            <Link href="#" underline="none">
              <Card
                sx={{
                  p: 2,
                  width: '100%',
                  minHeight: 200,
                  boxShadow: '40px 40px 80px 0 20%',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" mb={1}>
                  Digital land in Decentraland sells for $913K... to a virt...
                </Typography>
                <Typography variant="overline" color={'text.primary'}>
                  Cointelegraph
                </Typography>
                <Typography fontWeight={100} color={'text.secondary'} variant="subtitle2" mt={1}>
                  A virtual plot of real estate situated within the Ethereum-based open-world game,
                  Decentraland, has sold for more than $9...
                </Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
        <NavbarBottomAnchor id={`__navbarBottom_${aboutNav}`}></NavbarBottomAnchor>
      </Container>
    </>
  );
}
export default ProjectDetailAfterPitch;
