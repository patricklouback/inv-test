import styled, { css, createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const Form = styled.form``;

export const Row = styled.div<{ size?: number }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${({ size }) => {
    if (size <= 570) {
      return css`
        flex-direction: column;
        flex-wrap: wrap;
      `;
    }
  }}
`;

export const ItemsContainer = styled.div``;

export const ContentItem = styled.div`
  height: auto;
`;

export const ContainerPreview = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 2px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #48009b1f;
    border: 2px solid #48009b1f;
  }
`;

export const Draft = styled.div<{ size?: number }>`
  margin: 0 8px;
  width: 100%;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  ${({ size }) => {
    if (size <= 570) {
      return css`
        margin: 0;
        margin-right: 0;
      `;
    }
  }}
`;

export const Draft2 = styled.div<{ size?: number }>`
  margin: 0 0 0 8px;
  ${({ size }) => {
    if (size <= 570) {
      return css`
        margin-left: 0;
      `;
    }
  }}
`;

export const IncludeAreaButton = createGlobalStyle`
  .area-btn {
    max-width: 300px;
    margin-top: 20px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    border: 0;
    font-size: 16px;
    letter-spacing: 0.8px;
    font-weight: 400;
    color: #ffffff;
    background-color: #315594;
  }
`;

export const UserTypeTooltip = styled.div.attrs<
  { top: number; left: number },
  { top: number; left: number }
>(props => {
  return { top: props.top || 0, left: props.left || 0 };
})`
  visibility: hidden;
  min-width: 210px;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: rgba(109, 109, 109, 1);
  text-align: left;
  max-width: 501px;
  top: auto;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 17}px;
`;

export const CampaignManagerTypeTip = styled.div`
  position: absolute;
  left: 265px;
  top: 71px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const CampaignSortingValidatorTypeTip = styled.div`
  position: absolute;
  left: 633px;
  top: 71px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const CampaignSuportValidatorTypeTip = styled.div`
  position: absolute;
  left: 633px;
  top: 332px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const CampaignAreaRepresentativeTypeTip = styled.div`
  position: absolute;
  left: 682px;
  top: 593px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
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
  margin-bottom: 20px;
  padding: 0 1rem;
`;

export const Value = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding-left: 3%;

  strong {
    font-size: 0.9rem;
  }

  svg {
    margin-left: 2rem;
  }

  margin-bottom: 2rem;
`;
