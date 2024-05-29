import { SetStateAction, useCallback, useContext, useState } from 'react';
import { useTheme } from 'styled-components';
import { Textarea } from '@components/Textarea';
import { FiCheck, FiX } from 'react-icons/fi';
import { CampaignField } from 'interfaces/campaign';
import { Row } from '../styles';
import { ValueBox, Value, AddStep, DeleteStep } from './styles';

interface CampaignFieldsToRender {
    setAddField?: React.Dispatch<SetStateAction<boolean>>;
    handleCreateCampaignField: (title: string) => void;
}

export const CampaignFieldsToRender: React.FC<CampaignFieldsToRender> = ({
    setAddField,
    handleCreateCampaignField,
}): JSX.Element => {
    const { colors } = useTheme();
    const [newFieldTitle, setNewFieldTitle] = useState('');

    const campaignFieldCreationText = 'Campo disponível apenas após confirmar sua criação';

    const defaultTitleText = 'Título do campo'

    const handleCancelCreation = useCallback(() => {
        setAddField(false);
    }, [setAddField]);

    const handleFieldTitleEdit = useCallback(newFieldTitle => {
        setNewFieldTitle(newFieldTitle);
    }, []);

    const handleKeyDown = (event): void => {
        if (event.key === 'Enter') {
            handleCreateCampaignField(newFieldTitle);
        }
        if (event.key === 'Escape') {
            setAddField(false);
        }
    };

    return (
        <Row>
            <div>
                <ValueBox>
                    <Value
                        autoFocus
                        placeholder={defaultTitleText}
                        onChange={event => handleFieldTitleEdit(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <AddStep backgroundColor='#fff'>
                        <FiCheck size={22} onClick={() => handleCreateCampaignField(newFieldTitle)} color={colors.fontGrey}/>
                    </AddStep>
                    <DeleteStep backgroundColor='#fff'>
                        <FiX size={22} onClick={handleCancelCreation} 
                        color={colors.fontGrey}/>
                    </DeleteStep>
                </ValueBox>
                <Textarea
                    name=''
                    rows={6}
                    defaultValue=''
                    placeholder={campaignFieldCreationText}
                    disabled
                />
            </div>
        </Row>

    )
}