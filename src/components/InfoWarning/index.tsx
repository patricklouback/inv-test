import { useTheme } from "styled-components";
import { PiWarningBold } from "react-icons/pi";
import { PiInfoBold } from "react-icons/pi";
import { InfoWarningContainer, Icon, Text } from "./styles"

export type InfoWarningType = 'INFO' | 'WARNING';

interface InfoWarningProps {
    text: string;
    type: InfoWarningType;
} 

export const InfoWarning = ({
    text,
    type,
}: InfoWarningProps): JSX.Element => {
    const { colors } = useTheme();

    const setIcon = (type: InfoWarningType): JSX.Element => {
        switch (type) {
            case 'INFO':
                return (
                    <PiInfoBold 
                        color={colors.blue} 
                        size={22}
                    />
                );
            default:
                return (
                    <PiWarningBold 
                        color={colors.yellow} 
                        size={22}
                    />
                );
        }
    }

    return (
        <InfoWarningContainer type={type}>
            <Icon>{setIcon(type)}</Icon>
            <Text>{text}</Text>
        </InfoWarningContainer>
    )
}