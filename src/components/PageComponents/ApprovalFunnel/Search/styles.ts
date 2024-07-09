import styled from 'styled-components';

export const WapperInput = styled.label`
  width: 100%;
  max-width: 360px;
  position: relative;
  #icon {
    position: absolute;
    width: 50px;
    height: 100%;
    border-radius: 8px 0 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    max-width: unset;
  }
`;

export const SectionSubHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  justify-content: space-between;
  align-items: center;
`;

export const Rightside = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 275px;
  width: 44%;
  position: relative;
`;

export const Leftside = styled.div`
  display: flex;
  gap: 12px;
`;

export const InputSearch = styled.input`
  padding-left: 40px;
  width: 350px;
  height: 45px;
  outline: none;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font};
  letter-spacing: 0.8px;
  &:disabled {
    color: ${({ theme }) => theme.colors.borders};
  }
  &::placeholder {
    font-size: 14px;
    letter-spacing: 0.4px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-weight: normal;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
