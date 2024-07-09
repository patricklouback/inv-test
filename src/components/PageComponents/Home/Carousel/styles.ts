import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  padding: 30px 0;

  .container-campaigns-skeleton {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .campaigns-sekeleton {
    height: 340px;
    border-radius: 1rem;
  }
`;

export const WapperEmpity = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomArrowLeft = styled.div`
  cursor: pointer;
  position: absolute;
  background: ${({ theme }) => theme.colors.secondary};
  &:hover {
    opacity: 1;
  }
  transition: 0.4s ease;
  opacity: 0.7;
  width: 52px;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 4px 4px 0px;

  svg path {
    color: ${({ theme }) => theme.colors.terceary[styleSlug]};
  }
`;

export const CustomArrowRight = styled.div`
  &:hover {
    opacity: 1;
  }
  transition: 0.4s ease;
  opacity: 0.7;
  cursor: pointer;
  position: absolute;
  background: ${({ theme }) => theme.colors.secondary};
  width: 52px;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  right: 0;

  svg path {
    color: ${({ theme }) => theme.colors.terceary[styleSlug]};
  }
`;

export const ListCampaing = styled.ul`
  .custom-react-carousel-item {
    padding-right: 30px;
    @media screen and (max-width: 890px) {
      padding-right: 10px;
      /* top: -10px */
    }
  }
  top: 100px;
`;
