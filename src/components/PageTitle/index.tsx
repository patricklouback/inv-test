import React from 'react';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface PageTitleProps {
  icon?: any;
  title: string;
}

export function PageTitle({ icon: Icon, title }: PageTitleProps): JSX.Element {
  const { colors } = useTheme();
  return (
    <Container>
      <div>
        {Icon ? (
          <Icon color={colors.font} size={20} />
        ) : (
          <RiLightbulbFlashLine color={colors.font} size={20} />
        )}
      </div>
      <strong>{title}</strong>
    </Container>
  );
}
