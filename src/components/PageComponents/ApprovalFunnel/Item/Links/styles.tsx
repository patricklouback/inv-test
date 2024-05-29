import styled from 'styled-components';

interface LinksContainerProps {
    display: boolean;
}

export const LinksContainer = styled.div<LinksContainerProps>`
    display: ${({display}) => display ? 'flex': 'none'};
    align-items: center;
    justify-content: center;
    gap: 5px;

    padding-bottom: 0;
    padding-right: 3px;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.borders};
    border-radius: 5px;
    height: 22px;
    font-weight: 500;
`;

export const Counter = styled.div`
    padding: 0;
    height: 20px;
`;