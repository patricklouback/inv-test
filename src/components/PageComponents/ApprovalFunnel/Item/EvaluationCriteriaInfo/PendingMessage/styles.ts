import styled, { keyframes } from 'styled-components';

export const MessageWrapper = styled.div`
  display: flex;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  height: 16px;
  letter-spacing: 0em;
  text-align: left;
  gap: 6px;
  margin-top: 5px;
  margin-left: 10px;
  opacity: 0;
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export const WarningIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: yellow;
  border-radius: 50%;
  width: 15px;
  height: 15px;
`;

const loading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const Skeleton = styled.div`
  height: 16px;
  width: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${loading} 1s infinite;
  padding: 5px;
  margin-top: 5px;
  border-radius: 6px;
`;
