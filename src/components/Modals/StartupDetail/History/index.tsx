import { Startup } from 'interfaces/startups';
import { StartupInfos } from '../styles';

export function HistoryStartupPage({ startup }: { startup: Startup }) {
  return (
    <StartupInfos>
      <h1>History</h1>
    </StartupInfos>
  );
}
