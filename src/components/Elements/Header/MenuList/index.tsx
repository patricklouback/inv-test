import { DropMenuList } from '@components/DropMenuList';
import { AuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { RiMenu4Fill } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { normalizeString } from 'utils/normalizeString';
import { Items } from './styles';

interface MenuDropProps {
  isAdmin?: boolean;
  isManager?: boolean;
  haveFunnelAccess?: boolean;
}

interface MenuItem {
  title: string;
  onClick: () => void;
  ordinaryAccess: boolean;
  managerAccess: boolean;
  adminAccess: boolean;
  haveFunnelAccess: boolean;
}

export const MenuList: React.FC<MenuDropProps> = ({
  isAdmin,
  isManager,
  haveFunnelAccess = false,
}): JSX.Element => {
  const { colors } = useTheme();
  const { push } = useRouter();
  const { logout } = useContext(AuthContext);

  const [userMenuItems, setUserMenuItems] = useState<MenuItem[]>([]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        title: 'Painel de Gestão',
        onClick: () => {
          push('/campaign');
        },
        ordinaryAccess: false,
        managerAccess: true,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Gestão de Usuários',
        onClick: () => {
          push('/management/user');
        },
        ordinaryAccess: false,
        managerAccess: false,
        adminAccess: true,
        haveFunnelAccess: false,
      },
      {
        title: 'Funil Kanban',
        onClick: () => {
          push('/approval-funnel');
        },
        ordinaryAccess: false,
        managerAccess: false,
        adminAccess: false,
        haveFunnelAccess: true,
      },
      {
        title: 'Dashboards e Dados',
        onClick: () => {
          push('/indicators');
        },
        ordinaryAccess: false,
        managerAccess: true,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Banco de Startups (Beta)',
        onClick: () => {
          push('/startups');
        },
        ordinaryAccess: false,
        managerAccess: true,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Trilha de Conhecimento',
        onClick: () => {
          push('/knowledge-trail');
        },
        ordinaryAccess: true,
        managerAccess: false,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Lista de Direcionais',
        onClick: () => {
          push('/campaign/all-campaign');
        },
        ordinaryAccess: true,
        managerAccess: false,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Banco de Iniciativas',
        onClick: () => {
          push('/idea/repository');
        },
        ordinaryAccess: false,
        managerAccess: true,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Minhas Iniciativas',
        onClick: () => {
          push('/idea');
        },
        ordinaryAccess: true,
        managerAccess: false,
        adminAccess: false,
        haveFunnelAccess: false,
      },
      {
        title: 'Sair',
        onClick: logout,
        ordinaryAccess: true,
        managerAccess: false,
        adminAccess: false,
        haveFunnelAccess: false,
      },
    ],
    [logout, push]
  );

  useEffect(() => {
    const filteredItems = menuItems.filter(item => {
      return (
        (item.ordinaryAccess &&
          !item.adminAccess &&
          !item.managerAccess &&
          !item.haveFunnelAccess) ||
        (item.adminAccess &&
          isAdmin &&
          !item.managerAccess &&
          !item.haveFunnelAccess) ||
        (item.managerAccess &&
          isManager &&
          !item.adminAccess &&
          !item.haveFunnelAccess) ||
        (item.haveFunnelAccess &&
          haveFunnelAccess &&
          !item.adminAccess &&
          !item.managerAccess)
      );
    });

    setUserMenuItems(filteredItems);
  }, [isAdmin, isManager, haveFunnelAccess, menuItems]);

  return (
    <DropMenuList
      Icon={
        <RiMenu4Fill color={colors.font} size={20} className="menuHeader" />
      }
    >
      {userMenuItems.length > 0 &&
        userMenuItems.map((item, index) => (
          <Items
            onClick={item.onClick}
            className={`menuItem-${normalizeString(item.title)}`}
          >{`${index + 1}. ${item.title}`}</Items>
        ))}
    </DropMenuList>
  );
};
