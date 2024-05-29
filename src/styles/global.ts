import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }
  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
  a {
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.font};
    overflow-x: hidden;
  }
  body, input, textarea, select, button {
  font: 400 1rem ${props => props.theme.font.primary};

  .custom-dot--active {
    .react-multi-carousel-dot--active {
      button {
        background: ${({ theme }) => theme.colors.primary};
      }
    }
    li  {
      button {
        margin: 0 8px;
        border: none;
        background: ${({ theme }) => theme.colors.borders};
      }
    }
  }

  .custom-container--class{
    height: 510px;
    @media screen and (max-width: 510px) {
      height: 430px;
    }
  }

  .eError {
    border: 2px solid ${({ theme }) =>
      theme.colors.notification.error} !important;
  }
  #notification {

    position: absolute;
    bottom: -35px;
    right: 0;
    z-index: 999;

    width: auto;
    padding: 4px 6px;
    height: 30px;
    background: ${({ theme }) => theme.colors.notification.error};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .input-period {
    /* -----1440 x 1024----- */
  font-weight: 500;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.font};
  display: flex;
  max-width: 314px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  position: relative;

    padding-left: 20px;
    height: 68px;
    color: ${({ theme }) => theme.colors.font};
    min-height: 56px;
    outline: 0;
    width: 100%;

    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    font-size: 1rem;
    padding-right: 10px;

    &::placeholder {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.fontLight};
    }
    &:disabled {
      color: ${props => props.theme.colors.disabled};
    }
    &:focus {
      border: 2px solid ${props => props.theme.colors.primary};
    }
  }

  .view-more-modal-content{
    width: 100%;
    max-width: 1000px;
    position: relative;
    background-color: white;
    padding: 1.5rem 3rem;
    border-radius: 0.5rem;
    max-height: 600px;
    overflow-y: scroll;

    &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }

    &:focus{
      outline: none;
    }
  }

  .react-modal-content{
    width: 100%;
    max-width: 380px;
    position: relative;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    max-height: 500px;
    &:focus{
      outline: none;
    }
  }

  .react-modal-content-owner{
    width: 100%;
    max-width: 500px;
    position: relative;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 40px;
    &:focus{
      outline: none;
    }
  }

  .react-modal-overlay{
    background: rgba(0,0, 0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .react-modal-content-terms{
    width: 100%;
    max-width: 1080px;
    position: relative;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    max-height: 800px;
    &:focus{
      outline: none;
    }
  }

  .react-modal-idea-links{
    width: 100%;
    max-width: 616px;
    position: relative;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    min-height: 350px;
    &:focus{
      outline: none;
    }
  }
}
`;

export default GlobalStyles;
