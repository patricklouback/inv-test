import React from 'react';
import { BiUser } from 'react-icons/bi';
import {
  ImgUser,
  UserArea,
  UserContent,
  UserData,
  UserImage,
  UserName,
} from './styles';

export const UserComponent: React.FC<{
  userArea: string;
  userName: string;
  userImage: string;
}> = ({ userArea, userName, userImage }) => {
  return (
    <UserContent>
      <UserImage>
        {userImage && (
          <ImgUser src={userImage ?? 'https://via.placeholder.com/40'} />
        )}
        {!userImage && (
          <BiUser
            style={{
              border: '1px solid #CFD1DC',
              borderRadius: '8px',
              marginRight: '8px',
            }}
            size={36}
          />
        )}
      </UserImage>
      <UserData>
        <UserName>{userName}</UserName>
        <UserArea>{userArea}</UserArea>
      </UserData>
    </UserContent>
  );
};
