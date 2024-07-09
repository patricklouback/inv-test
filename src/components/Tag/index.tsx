import React from 'react';
import styled from 'styled-components';

export const T = styled.span<{ $background: string }>`
  padding: 6px 21px;
  background: ${({ $background }) => $background};
  font-weight: bold;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  letter-spacing: 0.6px;
`;

interface TagProps {
  value: string;
  background: string;
}

export const Tag: React.FC<TagProps> = ({ value, background }): JSX.Element => (
  <T $background={background}>{value}</T>
);
