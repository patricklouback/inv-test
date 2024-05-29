import { CardIconComponent } from '@components/IconCard';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { AuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiBell, FiUser } from 'react-icons/fi';
import { MdExitToApp } from 'react-icons/md';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import {
  Container,
  Exit,
  ListItems,
  MenuSide,
  Name,
  SideItem,
  User,
} from './styles';

interface Sidebar {
  name: string;
  image?: string;
  auth: {
    isAdmin?: boolean;
    isManager?: boolean;
  };
}

export const Sidebar: React.FC<Sidebar> = ({
  name,
  image = 'https://via.placeholder.com/50',
}): JSX.Element => {
  const { logout } = useContext(AuthContext);
  const { colors } = useTheme();
  const { push } = useRouter();
  const [active, setActive] = useState(false);

  const navigate = (url: string): void => {
    push(url);
    enableBodyScroll(document.querySelector('body'));
  };

  return (
    <>
      <MenuSide
        onClick={() => {
          setActive(!active);

          if (!active) {
            return disableBodyScroll(document.querySelector('body'));
          }
          enableBodyScroll(document.querySelector('body'));
        }}
      >
        <AiOutlineMenu
          size={30}
          color={active ? colors.background : colors.font}
        />
      </MenuSide>
      <Container active={active}>
        <ListItems activeCollapse={false}>
          <SideItem>
            <User url={image}>
              <div id="image" />
              <Name>{name}</Name>
            </User>
          </SideItem>
          <SideItem className="handle">
            <div className="ittem">
              <CardIconComponent onClick={() => navigate('/notifications')}>
                <FiBell color={colors.font} size={20} />
              </CardIconComponent>
              <span>Notificações</span>
            </div>
          </SideItem>
          <SideItem className="handle">
            <div className="ittem">
              <CardIconComponent
                onClick={() => navigate('/campaign/all-campaign')}
              >
                <RiTrophyLine color={colors.font} size={20} />
              </CardIconComponent>
              <span>Direcionais</span>
            </div>
          </SideItem>
          <SideItem className="handle">
            <div className="ittem">
              <CardIconComponent onClick={() => navigate('/idea')}>
                <FiUser color={colors.font} size={20} />
              </CardIconComponent>
              <span>Iniciativas</span>
            </div>
          </SideItem>
          <SideItem
            onClick={() => {
              logout();
            }}
            className="handle"
          >
            <div className="ittem">
              <CardIconComponent link="/">
                <MdExitToApp color={colors.font} size={20} />
              </CardIconComponent>

              <span>Sair</span>
            </div>
          </SideItem>
        </ListItems>
      </Container>
      {active && (
        <Exit
          onClick={() => {
            setActive(false);
            enableBodyScroll(document.querySelector('body'));
          }}
        />
      )}
    </>
  );
};
