import { useEffect, useState } from 'react';
import { Base, ButtonBack } from './styles';

export const BackToTop: React.FC = (): JSX.Element => {
  const [display, setDisplay] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(undefined);
  const scrollToTop = async (): Promise<void> => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop < lastScrollY && currentScrollTop > 10) {
        setDisplay('flex');
      } else {
        setDisplay('none');
      }

      setLastScrollY(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Base display={display} onClick={scrollToTop}>
      <ButtonBack doAnimation>Voltar ao topo</ButtonBack>
    </Base>
  );
};
