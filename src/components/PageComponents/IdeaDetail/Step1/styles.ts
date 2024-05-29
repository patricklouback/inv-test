import styled from 'styled-components';

export const WapperStep1 = styled.div`
  max-width: 356px;
  width: 100%;
  margin-right: 15px;
`;

export const WapperTitleActiv = styled.div`
  height: 52px;
  display: flex;
  align-items: center;

  padding: 0 24px;
  border-radius: 22px 22px 0 0;

  strong {
    margin-right: 5px;
    text-transform: uppercase;
  }
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.background};
`;

export const WapperActivity = styled.div`
  height: 52px;
  display: flex;
  align-items: center;

  padding: 0 24px;
  border-radius: 0 0 22px 22px;

  background: ${({ theme }) => theme.colors.background};

  span {
    letter-spacing: 0.4px;
  }
`;

export const IconActivity = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.colors.grey};
  width: 27px;
  height: 27px;

  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ValueActivity = styled.span`
  letter-spacing: 0.4px;
`;

export const WapperActivities = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 30px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

export const InputCheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const ValueCheckBox = styled.span``;
