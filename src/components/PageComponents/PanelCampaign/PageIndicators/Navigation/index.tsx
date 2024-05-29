import ButtonLink from '@components/Link';
import { RiFileExcel2Line } from "react-icons/ri";
import { useTheme } from 'styled-components';
import { useCallback, useContext } from 'react';
import { ExcelDataReportContext } from 'contexts/ExcelDataReport';
import { ButtonContainer, MenuOptions, WapperDownloadButton } from './styles';

interface NavigationProps {
    stateSetter: React.Dispatch<React.SetStateAction<string>>;
    state: string;
}

export const Navigation = ({ stateSetter, state }: NavigationProps): JSX.Element => {
    const { colors } = useTheme();
    const { downloadXlsxDash } = useContext(ExcelDataReportContext);

    const handleDownloadClick = useCallback(() => {
        downloadXlsxDash()
    }, [downloadXlsxDash])
    
    const handleClick = useCallback((pageSelected: string) => {
        stateSetter(pageSelected);
    }, [])

    return (
        <MenuOptions>
            <ButtonContainer>
                <ButtonLink 
                    value='Todos'
                    max={200}
                    background={colors.background}
                    hover={colors.backgroundGrey}
                    hoverWeigth={600}
                    color={colors.fontGrey}
                    hoverColor={colors.font}
                    onClick={() => handleClick('all')}
                    isSelected={state === 'all'}
                />
            </ButtonContainer>
            <ButtonContainer>
                <ButtonLink 
                    value='Engajamento'
                    max={200}
                    background={colors.background}
                    hover={colors.backgroundGrey}
                    hoverWeigth={600}
                    color={colors.fontGrey}
                    hoverColor={colors.font}
                    onClick={() => handleClick('engagement')}
                    isSelected={state === 'engagement'}
                />
            </ButtonContainer>
            <ButtonContainer>
                <ButtonLink 
                    value='Iniciativas'
                    max={200}
                    background={colors.background}
                    hover={colors.backgroundGrey}
                    hoverWeigth={600}
                    color={colors.fontGrey}
                    hoverColor={colors.font}
                    onClick={() => handleClick('ideas')}
                    isSelected={state === 'ideas'}
                />
            </ButtonContainer>
            <ButtonContainer>
                <ButtonLink 
                    value='Direcionais'
                    max={200}
                    background={colors.background}
                    hover={colors.backgroundGrey}
                    hoverWeigth={600}
                    color={colors.fontGrey}
                    hoverColor={colors.font}
                    onClick={() => handleClick('campaigns')}
                    isSelected={state === 'campaigns'}
                />
            </ButtonContainer>
            {/* <ButtonContainer>
                <ButtonLink 
                    value='Implementação'
                    max={200}
                    background={colors.background}
                    hover={colors.backgroundGrey}
                    hoverWeigth={600}
                    color={colors.fontGrey}
                    hoverColor={colors.font}
                    onClick={() => handleClick('implement')}
                    isSelected={state === 'implement'}
                    disabled // Remove this when Implement Module is done
                />
            </ButtonContainer> */}
            <WapperDownloadButton>
                <ButtonLink
                    onClick={handleDownloadClick}
                    value="Download de dados"
                    center={false}
                    max={300}
                    background={colors.primary}
                    color={colors.background}
                    Icon={<RiFileExcel2Line size={22}/>}
                />
            </WapperDownloadButton>
        </MenuOptions>
    )
}