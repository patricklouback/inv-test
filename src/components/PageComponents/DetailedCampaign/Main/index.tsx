import { CampaignContext } from 'contexts/Campaign';
import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, About, Info, GoalsMet, Item } from './styles';

export const Main: React.FC = (): JSX.Element => {
  const { campaign, selectedCampaignFields, getSelectedCampaignFieldsValues } =
    useContext(CampaignContext);

  useEffect(() => {
    getSelectedCampaignFieldsValues(campaign.id);
  }, [campaign, getSelectedCampaignFieldsValues]);

  return (
    <Container>
      <About>
        <h2>Resumo</h2>
        <Item>
          <ReactMarkdown className="markdown">{campaign.summary}</ReactMarkdown>
        </Item>
      </About>
      <About>
        <h2>Descrição</h2>
        <Item>
          <ReactMarkdown className="markdown">
            {campaign.description}
          </ReactMarkdown>
        </Item>
      </About>
      <Info>
        <GoalsMet>
          <h2 className="markdown">Objetivos estratégicos</h2>
          <div className="markdownContainer">
            <ReactMarkdown className="disabledH2">
              {campaign.goals}
            </ReactMarkdown>
          </div>
        </GoalsMet>
      </Info>
      {selectedCampaignFields.length > 0 && (
        <Info>
          {selectedCampaignFields.map((field, i) => {
            return (
              <GoalsMet>
                <h2>{field.title}</h2>
                <div className="markdownContainer">
                  <ReactMarkdown>
                    {field.campaignFieldValues[0].value}
                  </ReactMarkdown>
                </div>
              </GoalsMet>
            );
          })}
        </Info>
      )}
    </Container>
  );
};
