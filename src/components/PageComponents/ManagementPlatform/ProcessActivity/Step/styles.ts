import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ItemStepp = styled.li`
  cursor: pointer;

  position: relative;
  display: flex;
`;

// export const Value = styled.span`
//   width: 131px;
//   height: 88px;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 5px;
//   padding-left: 15px;
//   font-weight: 600;
//   position: absolute;
//   font-size: 15px;
// `;

export const Gate = styled.div`
  margin: 0 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const Rotate = styled.div<{ rotate?: boolean }>`
  position: absolute;
  bottom: -5px;
  left: 80px;
  transform: rotateZ(180deg);

  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.font};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 0.4s ease;

  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotateZ(0deg);
      background: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
    `}
`;

export const Draft = styled.div`
  display: flex;
  align-items: center;
  transform: translateY(-3px);
`;

export const Line = styled.div`
  background: ${({ theme }) => theme.colors.font};

  width: 3px;
  height: 2px;

  margin: 0 2px;
`;

export const ValueGate = styled.span`
  position: absolute;
  top: -28px;
  left: -7px;
  width: 54px;
  text-align: center;
`;

export const Circle = styled.div<{ status?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme, status }) =>
    status ? theme.colors.greenLive : theme.colors.background};

  border: ${({ theme, status }) =>
    !status ? `2px solid ${theme.colors.borders}` : ''};
`;

export const AddStep = styled.div<{ backgroundColor?: string }>`
  position: absolute;
  left: 96px;
  top: -36px;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  padding-top: 4px;
  padding-left: 3px;
  background: ${({ backgroundColor }) => backgroundColor || 'none'};
`;

export const DeleteStep = styled.div<{ backgroundColor?: string }>`
  position: absolute;
  width: 32px;
  height: 32px;
  left: 55px;
  top: -40px;
  margin: 4px;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding-top: 4px;
  padding-left: 3px;
  background: ${({ backgroundColor }) => backgroundColor || 'none'};
`;

export const ValueBox = styled.span<{ colorActive?: boolean }>`
  width: 11rem;
  height: 88px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-left: 24px;
  position: absolute;
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme, colorActive }) =>
    colorActive ? theme.colors.greenHipeLight : theme.colors.background};
`;

export const Value = styled.input<{ colorActive?: boolean }>`
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #f6f6f8;
  font-weight: 600;
  position: absolute;
  border: 0;
  outline: none;
  border-radius: 8px;
  font-size: 15px;

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
    background-color: white;
  }
`;
