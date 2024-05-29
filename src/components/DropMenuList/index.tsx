/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CardIconComponent } from '@components/IconCard';
import { TourMenuList } from '@components/TourApp/TourMenuList';
import { AuthContext } from 'contexts/AuthContext';
import { TourId, TourStatus } from 'interfaces/tour';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {
  BadgeNotification,
  Container,
  Drop,
  IconBellContainer,
} from './styles';

interface DropMenuProps {
  haveUnread?: boolean;
  Icon?: any;
  extraBottom?: JSX.Element;
}

export const DropMenuList: React.FC<DropMenuProps> = ({
  children,
  haveUnread,
  Icon,
  extraBottom,
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [unviewedTourMenuList, setUnviewedTourMenuList] = useState(
    user?.tours[TourId.MENU_LIST] === TourStatus.UNVIEWED
  );

  const handleToggleDropList = useCallback(() => {
    setOpen(state => !state);
  }, []);

  const handleBlurDropList = useCallback(() => {
    setTimeout(() => {
      if (!unviewedTourMenuList) {
        setOpen(false);
      }
    }, 200);
  }, [unviewedTourMenuList]);

  const { colors } = useTheme();

  useEffect(() => {
    setUnviewedTourMenuList(
      user?.tours[TourId.MENU_LIST] === TourStatus.UNVIEWED
    );

    if (user?.tours[TourId.MENU_LIST] === TourStatus.VIEWED) {
      setOpen(false);
    }
  }, [handleToggleDropList, user]);

  return (
    <Container onBlur={handleBlurDropList}>
      {open && unviewedTourMenuList && <TourMenuList />}
      <div>
        <CardIconComponent
          background={colors.background}
          name="toggle-list"
          onClick={handleToggleDropList}
        >
          <IconBellContainer>
            {haveUnread && <BadgeNotification />}
            {Icon && Icon}
          </IconBellContainer>
        </CardIconComponent>

        <Drop open={open}>
          {children}
          {extraBottom}
        </Drop>
      </div>
    </Container>
  );
};
