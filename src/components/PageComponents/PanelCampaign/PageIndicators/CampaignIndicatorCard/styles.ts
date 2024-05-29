import styled from 'styled-components';

interface CardProps {
  color: 'green' | 'blue' | 'gray' | 'pink';
}

const cardColors = {
  green: `#16B4A9; border-radius: 12px`,
  blue: '#A3B2CD',
  gray: '#808080',
  pink: '#C3528E',
};

export const Card = styled.div<CardProps>`
  width: 100%;
  height: 120px;
  //max-height: 120px;
  counter-increment: grid-item;
  border-radius: 12px;
  background: ${props => cardColors[props.color]};
  padding: 1rem 0.8rem 0.5rem 0.5rem;

  h2 {
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.125rem;
    text-align: right;
    color: #fff;
    margin-bottom: 1rem;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 3rem;
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3.5rem;
    width: 4.5rem;
  }

  span {
    position: absolute;
    bottom: 12px;
    right: 0;
    display: inline-block;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 4rem;
    line-height: 2rem;
    color: #fff;
  }

  .campaign-active {
    position: absolute;
    height: 4.5rem;
    bottom: -12px;
    left: -3px;
  }

  .campaign-waiting {
    bottom: -2px;
    left: -5px;
  }

  .campaign-paused {
    height: 4.5rem;
    bottom: -11px;
    left: -13px;
  }

  .campaign-done {
    height: 3.8rem;
    left: -8px;
  }
`;
