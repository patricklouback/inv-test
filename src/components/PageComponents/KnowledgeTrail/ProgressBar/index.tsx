import { Container, Scroll, TopBar } from './styles';
import { DefaultSection } from '../SectionDefault';
import { VideoList } from './VideoList';

export const ProgressBar: React.FC<{
  videoList: Array<any>;
  updatePath: (id: number) => void;
  videoId: number;
}> = ({ videoList, updatePath, videoId }): JSX.Element => {
  const title = 'Trilha';

  return (
    <Container>
      <TopBar />
      <Scroll>
        <DefaultSection
          type="normal"
          header={{
            title,
            small_header: false,
          }}
        >
          <VideoList
            videoList={videoList}
            updatePath={updatePath}
            videoId={videoId}
          />
        </DefaultSection>
      </Scroll>
    </Container>
  );
};
