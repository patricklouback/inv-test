import { UserCard } from '@components/CardUser';
import { Tag } from '@components/Tag';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface PreviewUserParams {
  name: string;
  image?: string;
  color?: string;
  clickRemove?: any;
  type?: boolean;
  areaName?: string;
  areaColor?: string;
}

export const PreviewUserAddsComponent: React.FC<PreviewUserParams> = ({
  name,
  image,
  clickRemove,
  color,
  type = false,
  areaName,
  areaColor,
}): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Container>
      <IoMdClose onClick={clickRemove} size={23} color={colors.fontLight} />
      {!type ? (
        <UserCard name={name} image={image} area={areaName} areaColor={areaColor}/>
      ) : (
        <Tag value={name} background={color || colors.greenLive} />
      )}
    </Container>
  );
};
