import { IconType } from "react-icons"
import { Item, Value } from "./styles"

interface InfoCardProps {
    iconComponent?: IconType | JSX.Element;
    data: number;
    title: string;
}

export const InfoCard = ({
    iconComponent,
    data,
    title
}: InfoCardProps): JSX.Element => {
    const checkIcon = (): boolean => {
        if (iconComponent) {
            return true;
        }
        return false;
    };

    return (
        <Item hasIcon={checkIcon()}>
            {iconComponent && <div>{iconComponent}</div>}
            <Value>
                <h3>{data || 0}</h3>
                <span>{title}</span>
            </Value>
        </Item>
    )
}