import { Box, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
type PitchProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type NavbarState = {
  pitchs: PitchProps[] | undefined;
};

function ProjectDetailNavbar({ pitchs }: NavbarState) {
  const [isShow, setIsShow] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(pitchs?.at(0)?.id);
  var lastScrollTop = 0;
  const trackScrolling = useCallback(() => {
    const currentIndex = pitchs!.findIndex((p) => p.id === selectedPitch);
    const firstElement = document.getElementById(`__pitchTop_${pitchs?.at(0)?.id}`);
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (isTopFirstElement(firstElement)) {
      setSelectedPitch('');
      setIsShow(false);
    } else {
      setIsShow(true);
      if (st > lastScrollTop) {
        if (currentIndex < pitchs!.length - 1) {
          const nextPitch = pitchs?.at(currentIndex + 1)?.id;
          const wrappedElementId = `__pitchTop_${nextPitch}`;
          const wrappedElement = document.getElementById(wrappedElementId);
          if (isTop(wrappedElement)) {
            console.log(nextPitch);
            setSelectedPitch(nextPitch!);
            setIsShow(true);
          }
        }
      } else {
        if (currentIndex > 0) {
          const prevPitch = pitchs?.at(currentIndex - 1)?.id;
          const wrappedElementId = `__pitchBottom_${prevPitch}`;
          const wrappedElement = document.getElementById(wrappedElementId);
          if (isBottom(wrappedElement)) {
            console.log(prevPitch);
            setSelectedPitch(prevPitch!);
          }
        }
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, [selectedPitch]);
  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [trackScrolling]);
  const handleClickPitch = (newValue: string) => setSelectedPitch(newValue);

  const isTop = (el: HTMLElement | null) => el && el.getBoundingClientRect().top <= 15;

  const isBottom = (el: HTMLElement | null) => el && el.getBoundingClientRect().bottom >= 80;

  const isTopFirstElement = (el: HTMLElement | null) => el && el.getBoundingClientRect().top >= 60;

  return (
    <>
      {isShow && (
        <Box position={'fixed'} top={'10%'} left={'5%'} width={'fit-content'}>
          <Box>
            {pitchs &&
              pitchs.map((v, i) => {
                const isSelected = selectedPitch === v.id;
                return (
                  <Box key={i} py={1}>
                    <ScrollLink
                      spy={true}
                      onClick={() => handleClickPitch(v.id)}
                      to={`__pitchTopClick_${v.id}`}
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
          <Box></Box>
        </Box>
      )}
    </>
  );
}
export default ProjectDetailNavbar;
