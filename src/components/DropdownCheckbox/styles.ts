import styled from 'styled-components';


export const Container = styled.button<{
  error?: boolean;
}>`
  font-weight: 400;
  color: #2d3748;
  min-height: 56px;
  outline: 0;
  width: 100%;
  padding: 0px 0px 0px 20px;
  border-radius: 8px;
  background: #ffffff;
  border: ${({ error }) => (error ? '2px solid #f56565' : '2px solid #cfd1dc')};
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  /* overflow: hidden; */
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;

  -ms-overflow-style: none; 
  scrollbar-width: none;

`;

export const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #cfd1dc;
  padding: 0.3rem 0.3rem;
  border-radius: 5px;
  background-color: #f8f8f8;

  span {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
`;

export const Select = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  border: none;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  border-radius: 5px;
  gap: 0.2rem;
  position: absolute;
  z-index: 1;
  top: 90px;
  height: 150px;
  overflow-y: auto;
`;

export const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: 0.8rem;
`;
