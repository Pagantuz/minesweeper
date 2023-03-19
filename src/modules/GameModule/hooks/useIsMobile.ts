import React from 'react';

const useIsMobile = () => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    const callBack = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', callBack);
    return () => {
      window.removeEventListener('resize', callBack);
    };
  }, []);

  return width <= 768;
};

export { useIsMobile };
