import styled from "styled-components";

interface BannerParams {
    backgroundImage?: string;
}

export const BannerContainer = styled.div<BannerParams>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
    background-size: 100% 100%;
    background-position: 'center';
    background-repeat: 'no-repeat';
`;