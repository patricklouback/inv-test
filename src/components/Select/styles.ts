import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

interface InputProps {
  isIcon: boolean;
  height?: number;
}

export const BoxInput = styled.label<{ disable?: boolean }>`
  position: relative;
  cursor: ${({ disable }) => (disable ? `normal` : `text`)};
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  min-height: 56px;

  color: #2d3748;
  outline: 0;

  padding-left: ${({ isIcon }) => (isIcon ? `55px` : `20px`)};
  border-radius: 8px;
  background: #ffffff;
  border: 2px solid #cfd1dc;
  font-size: undefinedpx;
  padding-right: 10px;
`;

export const Icon = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 45px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;


export const Label = styled.p`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1rem;
`;

export const Clean = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-34%);
  cursor: pointer;
`;

export const IconArrowRight = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-34%);
`;
