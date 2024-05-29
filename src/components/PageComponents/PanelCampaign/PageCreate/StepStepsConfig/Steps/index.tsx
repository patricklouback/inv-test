import React from 'react';
import { Gate } from './Gate';
import { Step } from './Item';
import { ListSteps, Item } from './styles';

interface StepsProps {
  onClick: (value) => void;
  data: Array<{
    id: string;
    title: string;
    description: string;
    complete?: boolean;
    type: string;
  }>;
  campaignStepSelected?: any;
}

export const Steps: React.FC<StepsProps> = ({
  data,
  onClick,
  campaignStepSelected,
}): JSX.Element => {
  return (
    <ListSteps>
      {data.map((item, index) => (
        <Item key={item.id} onClick={() => onClick(item)}>
          <Step
            active={item?.id === campaignStepSelected?.id}
            value={item.title}
          />
          <Gate
            index={index + 1}
            complete={item.complete}
            last={index === data.length - 1 && true}
          />
        </Item>
      ))}
    </ListSteps>
  );
};
