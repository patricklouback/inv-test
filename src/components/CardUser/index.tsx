import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IdeaUserStatus } from 'interfaces/idea';
import CirclePendingIcon from '@components/Icons/CirclePending';
import UserIcon from '@components/Icons/User';
import TrashIcon from '@components/Icons/Trash';
import { DeleteInviteUsersModal } from '@components/Modals/DeleteInviteUsersModal';
import { ProfileUserModal } from '@components/Modals/ProfileUserModal';
import {
  Container,
  NameUser,
  Image,
  AreaUser,
  NameAndAreaWrapper,
  StatusUser,
  OptionsWrapper,
  OptionsButton,
  OptionsAvailable,
  OptionItem,
  OptionAndSubOptionWrapper,
  AllOptionsWrapper,
  Content,
  DangerText,
} from './styles';
import OptionsButtonIcon from '../../assets/inventta/optionsButton.svg';

interface UserParams {
  ideaId?: string;
  userId?: string;
  name: string;
  url?: string;
  area?: string;
  owner?: boolean;
  image?: string;
  areaColor?: string;
  isSearch?: boolean;
  status?: IdeaUserStatus;
  isTheSameUser?: boolean;
}

export const UserCard: React.FC<UserParams> = ({
  isSearch,
  url,
  name,
  ideaId,
  userId,
  area,
  owner,
  image,
  status,
  areaColor,
  isTheSameUser,
}): JSX.Element => {
  const isPending = status === IdeaUserStatus.INVITED;
  const [isOpenDeleteInvite, setIsOpenDeleteInvite] = useState(false);
  const [isOpenProfileUser, setIsOpenProfileUser] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  const elementRef = useRef(null);
  const optionItemRef = useRef(null);

  const customEvent = new CustomEvent('clicouFora', { detail: {} });

  const showOptionsToggle = (event): void => {
    event.stopPropagation();
    const showOptionState = showOptions;
    document.dispatchEvent(customEvent);
    setShowOptions(!showOptionState);
  };

  const handleOptionsAndSubOptions = (event): void => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef]);

  const onRequestCloseDeleteInvite = useCallback(() => {
    setIsOpenDeleteInvite(false);
  }, []);

  const onRequestCloseProfileUser = useCallback(() => {
    setIsOpenProfileUser(false);
  }, []);

  const handleRemoveParticipant = useCallback(() => {
    setIsOpenDeleteInvite(true);
  }, []);

  const handleViewProfileUser = useCallback(() => {
    setIsOpenProfileUser(true);
  }, []);

  return url ? (
    <Link href={url}>
      <Container>
        <Image $img={image || '/images/user.png'} />
        <NameAndAreaWrapper>
          <NameUser>{name}</NameUser>
          {area ? <AreaUser areaColor={areaColor}>{area}</AreaUser> : null}
        </NameAndAreaWrapper>
      </Container>
    </Link>
  ) : (
    <Container>
      <DeleteInviteUsersModal
        ideaId={ideaId}
        userId={userId}
        isOpen={isOpenDeleteInvite}
        onRequestClose={onRequestCloseDeleteInvite}
      />

      {ideaId && userId && (
        <ProfileUserModal
          ideaId={ideaId}
          userId={userId}
          isOpen={isOpenProfileUser}
          onRequestClose={onRequestCloseProfileUser}
        />
      )}

      <Content>
        <Image $img={image || '/images/user.png'} />
        <NameAndAreaWrapper>
          <NameUser isTheSameUser={isTheSameUser}>{name}</NameUser>
          {area && !isPending && (
            <AreaUser areaColor={areaColor}>{area}</AreaUser>
          )}
          {status && isPending && (
            <StatusUser>
              <CirclePendingIcon />
              Aguardando resposta
            </StatusUser>
          )}
        </NameAndAreaWrapper>
      </Content>
      {!owner && !isSearch && (
        <OptionsWrapper ref={elementRef}>
          <OptionsButton onClick={showOptionsToggle}>
            <OptionsButtonIcon />
          </OptionsButton>
          {showOptions && (
            <OptionsAvailable top={0}>
              <AllOptionsWrapper onClick={handleOptionsAndSubOptions}>
                <OptionAndSubOptionWrapper>
                  <OptionItem
                    onClick={handleViewProfileUser}
                    ref={optionItemRef}
                  >
                    <UserIcon />
                    <span>Ver Perfil</span>
                    <div />
                    <div />
                    {/* <SelectOptions /> */}
                  </OptionItem>
                  <OptionItem
                    onClick={handleRemoveParticipant}
                    ref={optionItemRef}
                  >
                    <TrashIcon />
                    <DangerText>Remover</DangerText>
                    <div />
                    <div />
                    {/* <SelectOptions /> */}
                  </OptionItem>
                </OptionAndSubOptionWrapper>
                {/* {showTagOptions && <TagList ideaId={idea.id} />} */}
              </AllOptionsWrapper>
            </OptionsAvailable>
          )}
        </OptionsWrapper>
      )}
    </Container>
  );
};
