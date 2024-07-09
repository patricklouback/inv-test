import styled from 'styled-components';

import { keyframes } from 'styled-components';
import ShowMoreSVG from '../../../../../../assets/inventta/showMore.svg';
import ShowLessSVG from '../../../../../../assets/inventta/showLess.svg';

const expandDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }

  to {
    opacity: 1;
    max-height: 1000px;
  }
`;
export const Container = styled.div`
  /* display: flex; */
  margin-top: 20px;
`;

export const Header = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e7e7e7;
  box-shadow: 0px 4px 4px 0px #0000000d;
  border-radius: 8px 8px 0 0;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
  margin-right: 20px;
`;

export const StepName = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  padding-left: 20px;
  padding-right: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const ShowLess = styled(ShowLessSVG)`
  animation: ${fadeIn} 1s forwards;
`;

export const ShowMore = styled(ShowMoreSVG)`
  animation: ${fadeIn} 1s forwards;
`;

export const BodyContent = styled.div`
  overflow: hidden;
  animation: ${expandDown} 1s forwards;
`;

export const Content = styled.div`
  /* height: 56px; */
  width: 100%;
  /* display: flex; */
  background: ${({ theme }) => theme.colors.background};
  /* align-items: center; */
  /* justify-content: space-between; */
  border: 1px solid #e7e7e7;
  /* box-shadow: 0px 4px 4px 0px #0000000d; */
  border-radius: 8px 8px 0 0;
  padding-left: 20px;
  padding-top: 10px;
`;

export const Item = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ItemDescription = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #6f6f6f;
`;

export const UserWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
