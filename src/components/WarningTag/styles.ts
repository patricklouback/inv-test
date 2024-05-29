import styled from 'styled-components';

interface WarningTagTextProps {
    size: string;
}

interface WarningTagContainerProps {
    margin: string;
}

export const WarningTagContainer = styled.li<WarningTagContainerProps>`
  margin: ${(props) => props.margin};
  border-radius: 8px;
  height: 26px;

  display: flex;
  justify-content: left;
  align-items: center;
`;

export const WarningTagMiddle = styled.div`
  background-color: #ffe8e8;

  padding: 0.8rem 0.8rem;
  height: 23px;
  width: fit-content;
  display: flex;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const WarningTagText = styled.div<WarningTagTextProps>`
  color: #ec3137;
  font-size: ${(props) => props.size};
  font-weight: 500;
  letter-spacing: 0.4px;
`;
