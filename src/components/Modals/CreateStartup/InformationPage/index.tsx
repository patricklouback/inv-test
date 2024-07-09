import { Input } from '@components/InputText';
import { NewSelect } from '@components/NewSelect';
import { investment_rounds, last_investment, target_audience } from 'mocks';
import { useContext, useState } from 'react';
import { DropdownCheckbox } from '@components/DropdownCheckbox';
import { useStartups } from 'hooks';
import { StartupsContext } from 'contexts/Startups';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateCreateStartup } from 'validators/createStartup';
import { Startup } from 'interfaces/startups';
import { RowInput, Container, Content } from './styles';
import { FooterCustom } from '../Footer';

export function InformationModal() {
  const { startup, createStartupStep, setStartup } =
    useContext(StartupsContext);
  const { countries, years, returnStates } = useStartups();
  const [optionsTarget, setOptionsTarget] = useState(target_audience);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Startup>({
    resolver: yupResolver(yupValidateCreateStartup),
    defaultValues: startup,
  });
  const states = returnStates(startup.country);

  const handleOption = (id: number) => {
    const options = optionsTarget.map(option => {
      if (option.id === id) {
        return {
          ...option,
          checked: !option.checked,
        };
      }
      return option;
    });
    setOptionsTarget(options);
    const target = options
      .filter(option => option.checked)
      .map(option => option.name);
    setValue('target', target);
  };

  const handleForm = (startupData: Startup) => {
    createStartupStep(startupData);
  };

  return (
    <Container onSubmit={handleSubmit(handleForm)}>
      <Content>
        <RowInput>
          <div style={{ width: '70%' }}>
            <Input
              label="Nome da Startup*"
              placeholder="Digite o nome"
              {...register('name')}
              error={errors.name?.message as string}
            />
          </div>
          <div style={{ width: '30%' }}>
            <NewSelect
              label="Ano de fundação*"
              options={years}
              error={errors.foundationYear?.message as string}
              {...register('foundationYear')}
            />
          </div>
        </RowInput>
        <RowInput>
          <div style={{ width: '40%' }}>
            <DropdownCheckbox
              options={optionsTarget}
              label="Público-alvo"
              handleOption={handleOption}
              error={errors.target?.message as string}
              selected={getValues('target')}
            />
          </div>
          <div style={{ width: '60%' }}>
            <Input
              label="Segmento*"
              placeholder="ex. Marketplace, SaaS"
              error={errors.marketFields?.message as string}
              {...register('marketFields')}
            />
          </div>
        </RowInput>
        <RowInput>
          <div style={{ width: '50%' }}>
            <NewSelect
              label="Pais de origem*"
              options={countries}
              onChange={e => {
                const findCountry = countries.find(
                  country => country.name === e.target.value
                );
                setStartup({ ...startup, country: findCountry?.isoCode || '' });
                setValue('country', findCountry?.isoCode || '');
              }}
            />
          </div>
          <div style={{ width: '50%' }}>
            <NewSelect
              label="Estado*"
              options={states}
              error={errors.state?.message as string}
              {...register('state')}
            />
          </div>
        </RowInput>
        <RowInput>
          <div style={{ width: '50%' }}>
            <NewSelect
              label="Rodadas de investimento*"
              options={investment_rounds}
              {...register('investmentRounds')}
            />
          </div>
          <div style={{ width: '50%' }}>
            <NewSelect
              label="Último investimento*"
              options={last_investment}
              {...register('lastInvestment')}
              defaultValue={startup?.lastInvestment}
            />
          </div>
        </RowInput>
      </Content>
      <FooterCustom label="Continuar" type="submit" />
    </Container>
  );
}
