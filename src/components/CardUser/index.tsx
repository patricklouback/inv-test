import Link from 'next/link';
import React from 'react';
import { Container, NameUser, Image, AreaUser, NameAndAreaWrapper } from './styles';

interface UserParams {
  name: string;
  image?: string;
  area?: string;
  areaColor?: string;
  url?: string;
}

export const UserCard: React.FC<UserParams> = ({
  name,
  image,
  area,
  areaColor,
  url,
}): JSX.Element => {
  return url ? (
    <Link href={url}>
      <a>
        <Container>
          <Image img={image || '/images/user.png'} />
          <NameAndAreaWrapper>
            <NameUser>{name}</NameUser>
            {area ? <AreaUser areaColor={areaColor}>{area}</AreaUser> : null}
          </NameAndAreaWrapper>
        </Container>
      </a>
    </Link>
  ) : (
    <Container>
      <Image img={image || '/images/user.png'} />
      <NameAndAreaWrapper>
        <NameUser>{name}</NameUser>
        {area ? <AreaUser areaColor={areaColor}>{area}</AreaUser> : null}
      </NameAndAreaWrapper>
    </Container>
  );
};
