import Slider from 'react-slick';
import { findIndex } from 'lodash';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// @types
import { Product } from '../../../../@types/products';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

const LargeImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

type LargeItemProps = {
  item: string;
  onOpenLightbox: (value: string) => void;
};

function LargeItem({ item, onOpenLightbox }: LargeItemProps) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
      <LargeImgStyle alt="large image" src={item} onClick={() => onOpenLightbox(item)} />
    </Box>
  );
}

type ProductDetailsCarouselProps = {
  product: Product;
};

export default function ProjectDetailsHero({ product }: ProductDetailsCarouselProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);
  const imagesLightbox = product.images.map((_image) => _image);

  const handleOpenLightbox = (url: string) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next)
  };

  useEffect(() => {
    setNav1(slider1.current || undefined);
    setNav2(slider2.current || undefined);
  }, [currentIndex]);

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {product.images.map((item) => (
              <LargeItem key={item} item={item} onOpenLightbox={handleOpenLightbox} />
            ))}
          </Slider>
        </Box>
      </Box>
    </RootStyle>
  );
}
