import { Box, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
type PitchProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
  priority: number;
};

type NavbarProps = {
  pitchs: PitchProps[] | undefined;
  bottomNav: (string | null)[];
};

function ProjectDetailNavbar({ pitchs, bottomNav }: NavbarProps) {
  const [isShow, setIsShow] = useState(false);
  const [selectedNavbar, setSelectedNavbar] = useState(pitchs?.at(0)?.id);
  var lastScrollTop = 0;
  const trackScrolling = useCallback(() => {
    const currentIndex = pitchs!.findIndex((p) => p.id === selectedNavbar);
    const firstElement = document.getElementById(`__navbarTop_${pitchs?.at(0)?.id}`);
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (isTopFirstElement(firstElement)) {
      setSelectedNavbar('');
      setIsShow(false);
    } else {
      setIsShow(true);
      if (st > lastScrollTop) {
        if (currentIndex < pitchs!.length - 1) {
          const nextPitch = pitchs?.at(currentIndex + 1)?.id;
          const wrappedElementId = `__navbarTop_${nextPitch}`;
          const wrappedElement = document.getElementById(wrappedElementId);
          if (isTop(wrappedElement)) {
            setSelectedNavbar(nextPitch!);
            setIsShow(true);
          }
        }
      } else {
        if (currentIndex > 0) {
          const prevPitch = pitchs?.at(currentIndex - 1)?.id;
          const wrappedElementId = `__navbarBottom_${prevPitch}`;
          const wrappedElement = document.getElementById(wrappedElementId);
          if (isBottom(wrappedElement)) {
            setSelectedNavbar(prevPitch!);
          }
        }
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, [selectedNavbar]);
  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [trackScrolling]);
  const handleClickPitch = (newValue: string) => setSelectedNavbar(newValue);

  const isTop = (el: HTMLElement | null) => el && el.getBoundingClientRect().top <= 15;

  const isBottom = (el: HTMLElement | null) => el && el.getBoundingClientRect().bottom >= 80;

  const isTopFirstElement = (el: HTMLElement | null) => el && el.getBoundingClientRect().top >= 60;

  return (
    <>
      {isShow && (
        <Box position={'fixed'} top={'10%'} left={'10%'} width={'fit-content'}>
          <Box>
            {pitchs &&
              pitchs.map((v, i) => {
                const isSelected = selectedNavbar === v.id;
                return (
                  <Box key={i} py={1}>
                    <ScrollLink
                      spy={true}
                      onClick={() => handleClickPitch(v.id)}
                      to={`__navbarTopClick_${v.id}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <Typography
                        color={isSelected ? 'text.primary' : 'text.disabled'}
                        variant="overline"
                        fontSize={12}
                      >
                        {v.title}
                      </Typography>
                    </ScrollLink>
                  </Box>
                );
              })}
          </Box>
          <Divider variant="fullWidth" sx={{ my: 1 }} />
          <Box>
            {bottomNav &&
              bottomNav.length > 0 &&
              bottomNav.map((nav, i) => (
                <Box py={1} key={i}>
                  <ScrollLink
                    spy={true}
                    onClick={() => (nav ? handleClickPitch(nav) : {})}
                    to={`__navbarTopClick_${nav}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <Typography
                      color={selectedNavbar === nav ? 'text.primary' : 'text.disabled'}
                      variant="overline"
                      fontSize={12}
                    >
                      {nav}
                    </Typography>
                  </ScrollLink>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}
export default ProjectDetailNavbar;
