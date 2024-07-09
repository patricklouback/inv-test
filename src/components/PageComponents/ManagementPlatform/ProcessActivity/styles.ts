import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface ValueProps {
  selected?: string;
}

export const Section = styled.section`
  margin-bottom: 1rem;
  margin-top: 0;
`;

export const Content = styled.div`
  padding: 20px 0;
`;

export const InfoTextContainer = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  margin-top: 10px;
  padding: 0 20px;
  padding-bottom: 20px;
  border-radius: 12px;
`;

export const InfoText = styled.div`
  padding-top: 20px;
  padding-right: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const DraftC = styled.div`
  margin: 50px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Steps = styled.div``;

export const ListSteps = styled.ul`
  margin-top: 60px;
  list-style: none;

  display: flex;

  li {
  }
`;

export const ItemStepp = styled.li`
  cursor: pointer;

  position: relative;
  display: flex;
`;

const WrapperValueModifier = {
  yes: () => css`
    color: ${({ theme }) => theme.colors.fontWhite};
  `,
  no: () => css`
    color: ${({ theme }) => theme.colors.font};
  `,
};

export const Value = styled.span<ValueProps>`
  ${props => css`
    width: 131px;
    height: 88px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    padding-left: 15px;
    font-weight: 600;
    position: absolute;
    font-size: 15px;
    ${WrapperValueModifier[props.selected]}
  `};
`;

export const Rotate = styled.div<{ rotate?: boolean }>`
  position: absolute;
  bottom: -5px;
  left: 50px;
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

export const Gate = styled.div`
  margin: 0 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
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

export const NewStepButton = styled.button`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.primaryPurple};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 0 1rem;
`;

export const NewStepButtonValue = styled.p`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const ButtonSave = styled.button`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0 1rem;
`;

export const ButtonValue = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;
