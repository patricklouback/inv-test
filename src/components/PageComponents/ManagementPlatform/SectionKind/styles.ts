import styled from 'styled-components';
import { ISectionKind } from '.';

export const Sec = styled.div<ISectionKind>`
  display: ${({ section, kind }) => section === kind ? 'block' : 'none'}; 
  max-width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 16px;
  padding: 20px;
`;

export const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
`;