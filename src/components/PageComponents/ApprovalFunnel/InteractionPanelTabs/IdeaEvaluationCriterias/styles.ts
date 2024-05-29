import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  /* margin-top: 24px; */
  padding: 37px 47px;
  border-radius: 0 0 8px 8px;

  position: relative;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.greenHipeLight};
    border-radius: 0 0 8px 8px;
  }

  margin-bottom: 35px;
`;

export const Description = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  border-bottom: 1px solid #D9D9D9;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;
