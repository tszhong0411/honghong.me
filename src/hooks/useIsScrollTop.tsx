import React from 'react';

export default function useIsScrollTop() {
  const [isTop, setIsTop] = React.useState(true);
  React.useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return isTop;
}
