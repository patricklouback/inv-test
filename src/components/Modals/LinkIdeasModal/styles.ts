import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  border: 0;
  width: 100%;
  height: 48px;
  outline: 0;
  max-width: 152px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  letter-spacing: 0.7px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:last-child {
    margin-left: auto;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const LinkTitleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const Subtitle = styled.div`
  margin-bottom: 1rem;
  
`;

export const LinkedIdeasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 545px;
  min-height: 140px;
  padding: 15px;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.mediumBlueBorders};
  background-color: ${({ theme }) => theme.colors.backgroundGrey};

  div {
    font-weight: 500;
  }

  p {
    font-size: 0.8rem;
  }
`;

export const LinkedIdeasWrraper = styled.div`
`;

export const LinkedIdeaCard = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 30px;
  width: 100%;
  padding: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.blueBorders};
  background-color: ${({ theme }) => theme.colors.background};
`;

export interface IsAddingIdeaProps {
  isAdding: boolean;
}

export const AddIdeaWrapper = styled.div<IsAddingIdeaProps>`
  display: ${(props) => props.isAdding ? 'none' : 'flex'};
  align-items: center;
  gap: 5px;
  width: 145px;
  cursor: pointer;
`;

export const SearchIdeasWrapper = styled.div<IsAddingIdeaProps>`
  display: ${(props) => props.isAdding ? 'flex' : 'none'};
`;

export interface IsSearchingIdeaProps {
  isSearchingIdea: boolean;
}

export const ResultSearcIdeasContainer = styled.div<IsSearchingIdeaProps>`
  display: ${(props) => props.isSearchingIdea ? 'flex' : 'none'};
  flex-direction: column;
  /* position: absolute; */
  height: 150px;
  max-height: 150px;
  z-index: 9999;
  top: 300px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const IdeaTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IdAndCloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:flex-end;
  gap: 20px;
`;

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

export const InputSearch = styled.input`
  padding-left: 40px;
  width: 510px;
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
  ::placeholder {
    font-size: 14px;
    letter-spacing: 0.4px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-weight: normal;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const PossibleLinkIdeaCard = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 30px;
  width: 100%;
  padding: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.blueBorders};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.unreadNotification};
  }
`