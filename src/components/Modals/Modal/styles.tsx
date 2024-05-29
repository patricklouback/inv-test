import styled, { css } from 'styled-components';

export const Container = styled.div<{ zIndex: number }>`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};

  background: #6d6d6ddf;
`;

export const ExitModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    transform: translateX(-6px) translateY(10px);
    cursor: pointer;
    position: absolute;
  }
`;

export const Content = styled.div<{ width; height }>`
  background-color: #fff;
  max-width: ${({ width }) => (width ? `${width}` : '1000px')};
  width: 100%;
  margin: 0 auto;
  transform: translateY(25px);
  border-radius: 24px;
  padding: 20px;

  ${({ height }) => {
    if (height === 'auto') {
      return css`
        height: auto;
      `;
    }
    if (height) {
      return css`
        max-height: calc(100vh - ${height});
      `;
    }
    if (!height) {
      return css`
        height: 'calc(100vh - 50px)';
      `;
    }
  }}
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 8px 8px 8px 8px; */
  margin-bottom: 20px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  width: 207px;
  height: 29px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  white-space: nowrap;
  padding-top: 20px;
`;

export const SVGIconContent = styled.div<{ zIndex }>`
  z-index: ${({ zIndex }) => zIndex};
  margin-top: 9px;
  margin-right: 13px;
`;
