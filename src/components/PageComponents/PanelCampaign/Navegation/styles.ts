import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0;

  @media screen and (max-width: 610px) {
    flex-direction: column;

    height: 120px;
  }
`;
export const WapperDownloadAndNewCampButtons = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  justify-content: flex-end;
  white-space: nowrap;
`;

export const WapperButton = styled.div`
  display: flex;
  align-items: center;
  max-width: 270px;
  justify-content: space-between;
  white-space: nowrap;
`;

export const WapperDownloadButton = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  justify-content: space-between;
  white-space: nowrap;
`;

export const WapperButtonIndicators = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* max-width: 270px; */
  justify-content: space-between;
`;

export const Active = styled.div`
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  border-radius: 50%;
  margin-right: 4px;
`;
