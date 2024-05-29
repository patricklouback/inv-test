import { ConfigContext } from 'contexts/ConfigContext';
import { useContext } from 'react';
import { Apresentation } from './styles';

export const ApresentationCompany: React.FC = (): JSX.Element => {
  const { company_image, slogan } = useContext(ConfigContext);
  return (
    <Apresentation>
      <div>
        <img src={company_image} alt="" />
      </div>
      <h1>{slogan}</h1>
    </Apresentation>
  );
};
