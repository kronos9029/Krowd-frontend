import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  styled,
  TextField,
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
type PressProps = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type PressListProps = {
  press: PressProps[] | undefined;
  nav: string;
};
function ProjectDetailAfterPitch({ press, nav }: PressListProps) {
  const { detailOfProject } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  return (
    <>
      {/* Press */}
      {press && press.length > 0 ? (
        <>
          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Container maxWidth={'lg'} sx={{ paddingBottom: '5rem' }}>
            <Box mb={7}>
              <NavbarTopAnchor id={`__navbarTop_${nav}`}></NavbarTopAnchor>
              <Typography textAlign="center" py={1} color={'#666'} variant="h4">
                Bài viết liên quan
              </Typography>
              <Box mx="auto" width={'10%'}>
                <NavbarTopClickAnchor id={`__navbarTopClick_${nav}`}></NavbarTopClickAnchor>
                <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
              </Box>
            </Box>
            <Grid container justifyContent={'space-evenly'}>
              {press &&
                press.map((f, i) => {
                  const part = f.description?.split('\\gg20p');
                  if (!part) return;
                  const newspaperName = part[0];
                  const publicDate = part[1].substring(0, 10).trim();
                  const newLink = part[2];
                  return (
                    <>
                      <Grid xs={12} sm={5} md={4} lg={3}>
                        <Link key={i} href={`${newLink}`} target="_blank" underline="none">
                          <Card
                            sx={{
                              width: '100%',
                              minHeight: 420,
                              boxShadow: '40px 40px 80px 0 20%',
                              alignItems: 'center'
                            }}
                          >
                            <CardMedia
                              style={{
                                display: 'center'
                              }}
                              component="img"
                              height={200}
                              src={`${f.link}`}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  fontWeight: '700',
                                  WebkitLineClamp: 2
                                }}
                                pb={0.5}
                                px={2}
                                mt={2}
                                variant="body1"
                                color={'text.primary'}
                              >
                                {f.title}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography px={2} mb={1} variant="body1" color={'text.disabled'}>
                                {newspaperName} · {publicDate}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 5
                                }}
                                px={2}
                                variant="body2"
                                color={'text.primary'}
                              >
                                {f.content}
                              </Typography>
                            </Box>
                          </Card>
                        </Link>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
            <NavbarBottomAnchor id={`__navbarBottom_${nav}`}></NavbarBottomAnchor>
          </Container>
        </>
      ) : (
        ''
      )}
    </>
  );
}
export default ProjectDetailAfterPitch;
