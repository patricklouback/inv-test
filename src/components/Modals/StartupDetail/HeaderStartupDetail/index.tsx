import { Dispatch, SetStateAction, useState } from 'react';
import { StartupSelectStatus } from '@components/StartupSelectStatus';
import { Startup } from 'interfaces/startups';
import {
  Container,
  Text,
  Unline,
  Content,
  Button,
  ContentMap,
  Buttons,
} from './styles';

type HeaderStartupDetailProps = {
  startupStatus: string;
  options: { label: string; value: string; isSelect: boolean }[];
  setOptions: Dispatch<
    SetStateAction<{ label: string; value: string; isSelect: boolean }[]>
  >;
};

export function HeaderStartupDetail({
  startupStatus,
  options,
  setOptions,
}: HeaderStartupDetailProps) {
  const handleSelect = (value: string) => {
    const newOptions = options.map(option => {
      if (option.value === value) {
        return {
          ...option,
          isSelect: true,
        };
      }
      return {
        ...option,
        isSelect: false,
      };
    });
    setOptions(newOptions);
  };

  return (
    <Container>
      <ContentMap>
        {options.map(({ label, value, isSelect }, index) => (
          <Content key={index}>
            <Text $isSelect={isSelect} onClick={() => handleSelect(value)}>
              {label}
            </Text>
            <Unline $isSelect={isSelect} />
          </Content>
        ))}
      </ContentMap>
      <Buttons>
        <StartupSelectStatus status={startupStatus} />
        <Button>Entrar em contato</Button>
      </Buttons>
    </Container>
  );
}
