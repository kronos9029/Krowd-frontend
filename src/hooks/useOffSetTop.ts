import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useOffSetTop(top: number) {
  const [offsetTop, setOffSetTop] = useState(true);
  const isTop = top || 100;

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset <= isTop) {
        setOffSetTop(false);
      } else {
        setOffSetTop(true);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);

  return offsetTop;
}

// Usage
// const offset = useOffSetTop(100);
