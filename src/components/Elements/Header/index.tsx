import { UserCard } from '@components/CardUser';
import { Container } from '@components/Container';
import { CardIconComponent } from '@components/IconCard';
import { AuthContext } from 'contexts/AuthContext';
import { ConfigContext } from 'contexts/ConfigContext';
import { ListenSizeContext } from 'contexts/ListenSize';
import { NotificationsContext } from 'contexts/Notification';
import { TourId, TourStatus } from 'interfaces/tour';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useResizeDetector } from 'react-resize-detector';
import { useTheme } from 'styled-components';
import { MenuList } from './MenuList';
import { NotificationDropList } from './NotificationDropList';
import { ResetTourApp } from './ResetTourApp';
import { Sidebar } from './Sidebar';
import { HeaderContent, HeaderWrapper, UserInfo } from './styles';

interface HeaderProps {
  hasUserInfo: boolean;
  isAdmin: boolean;
  isManager: boolean;
  data: {
    name: string;
    image: string;
  };
}

export default function Header({
  hasUserInfo,
  isAdmin,
  isManager,
  data,
}: HeaderProps): JSX.Element {
  const { colors } = useTheme();
  const { user, token } = useContext(AuthContext);
  const { setSize } = useContext(ListenSizeContext);
  const { company_image } = useContext(ConfigContext);
  const { getNotifications } = useContext(NotificationsContext);

  const { width, ref } = useResizeDetector();
  const [companyImage, setCompanyImage] = useState(company_image);

  useEffect(() => {
    setSize(width);
  }, [setSize, width]);

  useEffect(() => {
    async function loadData(): Promise<void> {
      await getNotifications();
    }

    loadData();
    setCompanyImage(company_image);
  }, [getNotifications, company_image, user, token]);

  return (
    <HeaderWrapper ref={ref}>
      <div className="fade-line" />
      <Container>
        <HeaderContent logged={!!token}>
          <Link href="/home">
            <a className="logo">
              <img alt="Avantt.i" src="/images/logo-header.png" />
            </a>
          </Link>
          {user && (
            <>
              <div className="header-logo-company">
                <img
                  alt="Nome da companhia"
                  className="company-logo"
                  src={companyImage}
                />
              </div>
              <UserInfo image={user.image}>
                <div className="user-icons">
                  {user?.tours[TourId.MENU_LIST] === TourStatus.VIEWED && (
                    <ResetTourApp />
                  )}
                  <NotificationDropList />
                  {user.isAdmin && (
                    <CardIconComponent
                      background={colors.background}
                      link="/management/platform"
                    >
                      <AiOutlineSetting
                        color={colors.font}
                        size={20}
                        className="configAdmin"
                      />
                    </CardIconComponent>
                  )}
                  <MenuList
                    isAdmin={user.isAdmin}
                    isManager={user.isManager}
                    haveFunnelAccess={user?.haveFunnelAccess}
                  />
                </div>
                <div className="user-identification">
                  <UserCard
                    url="/profile"
                    name={user.name}
                    image={user.image}
                  />
                </div>
              </UserInfo>
            </>
          )}
          <Sidebar
            name={user.name}
            image={user.image}
            auth={{ isAdmin: user.isAdmin, isManager: user.isManager }}
          />
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
}
