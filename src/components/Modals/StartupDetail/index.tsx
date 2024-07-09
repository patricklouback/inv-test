import { Modal } from '@components/Modals/Modal';
import { Startup } from 'interfaces/startups';
import { useState } from 'react';
import { FadeLine, StartupName, UnderTitleLine } from './styles';
import { HeaderStartupDetail } from './HeaderStartupDetail';
import { GeneralStartupPage } from './General';
import { NotesStartupPage } from './Notes';
import { HistoryStartupPage } from './History';

interface StartupDetailProps {
  startup: Startup;
  closeModal: () => void;
}

export function StartupDetailModal({
  startup,
  closeModal,
}: StartupDetailProps) {
  const [options, setOptions] = useState([
    {
      label: 'Geral',
      value: 'general',
      isSelect: true,
    },
    {
      label: 'Anotações',
      value: 'notes',
      isSelect: false,
    },
    {
      label: 'Histórico',
      value: 'history',
      isSelect: false,
    },
  ]);

  const handleOptions = (page: string) => {
    switch (page) {
      case 'general':
        return <GeneralStartupPage startup={startup} />;
      case 'notes':
        return <NotesStartupPage />;
      case 'history':
        return <HistoryStartupPage startup={startup} />;
      default:
        return <GeneralStartupPage startup={startup} />;
    }
  };

  return (
    <Modal handle={closeModal} height="auto">
      <StartupName>
        <h1>{startup.name}</h1>
      </StartupName>
      <FadeLine />
      <HeaderStartupDetail
        startupStatus={startup.status}
        setOptions={setOptions}
        options={options}
      />
      <UnderTitleLine />
      {handleOptions(options.find(option => option.isSelect)?.value)}
    </Modal>
  );
}

export function StartupDetail({ ...props }: StartupDetailProps) {
  return <StartupDetailModal {...props} />;
}
