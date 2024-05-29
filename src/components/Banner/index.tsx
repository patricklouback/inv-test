import { Banner } from "interfaces/banners";
import { BannerContainer } from "./styles";

interface BannerComponentProps {
    banner?: Banner;
    children?: React.ReactNode;
}

export const BannerComponent: React.FC<BannerComponentProps> = ({
    banner,
    children,
}): JSX.Element => {
    return (
        <BannerContainer backgroundImage={banner.backgroundImage}>
            {children}
        </BannerContainer>
    )
}