import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
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
  /* border-bottom: 1px solid #d9d9d9; */
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const RecordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 220px;
  width: 689px;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  left: 0;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 5px;
    /* Change the scrollbar position to the right */
    margin-right: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const Item = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 200px;
  text-align: center;
  justify-content: flex-start;
  width: 100%;
`;

export const RecordInfoWrapper = styled.div`
  margin-left: 20px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
export const Title = styled.div`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ItemDescription = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
`;
