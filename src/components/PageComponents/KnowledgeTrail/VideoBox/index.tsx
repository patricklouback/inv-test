import { useState } from 'react';
import { toast } from 'react-toastify';
import CheckSvg from '../../../../assets/inventta/check.svg';
import DownloadSvg from '../../../../assets/inventta/downloadIcon.svg';
import LikeSvg from '../../../../assets/inventta/like.svg';
import LikedSvg from '../../../../assets/inventta/liked.svg';
import ShareSvg from '../../../../assets/inventta/share.svg';
import ToConcludeCheck from '../../../../assets/inventta/toConcludeCheck.svg';
import Button from './Button';
import { ModalSendVideo } from './ModalSendVideo';
import {
  BaseBoard,
  BaseBoardSide,
  ButtonConcluded,
  ButtonDownload,
  ButtonDownloadText,
  ButtonNext,
  ButtonPreview,
  Containerr,
  ContentPagee,
  DefaultSection,
  LikeButtonIcon,
  NumberOfLikes,
  ShareAndLike,
  ShareIcon,
  Title,
  Video,
  VideoContent,
} from './styles';

export const VideoBox: React.FC<{
  videoId: number;
  updateVideoWatched: (number) => void;
  videoTitle: string;
  updatePath: (number) => void;
  videoUrl: string;
  fileName: string;
  videoWatched: boolean;
  maxVideoLength: number;
  likes: number;
  updateVideoLike: (id, videoList, likes) => void;
  liked: boolean;
  updateVideoLiked: (id, videoList, liked) => void;
}> = ({
  videoId,
  updateVideoWatched,
  videoTitle,
  updatePath,
  videoUrl,
  fileName,
  videoWatched,
  maxVideoLength,
  likes,
  updateVideoLike,
  liked,
  updateVideoLiked,
}): JSX.Element => {
  const onVideoWatched = (): void => {
    updateVideoWatched(videoId);
  };

  const [showModal, setShowModal] = useState(false);

  const onDownloadPdf = (): void => {
    toast.info('Download do Material iniciado. Isto pode levar algum tempo', {
      autoClose: false,
    });
    fetch(fileName).then(response => {
      if (response.ok) {
        response.blob().then(blob => {
          const fileUrl = window.URL.createObjectURL(blob);
          const alink = document.createElement('a');
          alink.href = fileUrl;
          alink.download = fileName;
          alink.click();
          toast.success(
            'Download do Material finalizado. Verifique sua pasta de downloads padrão do navegador.',
            { autoClose: false }
          );
        });
      }
    });
  };

  const nextVideo = (): void => {
    if (videoId < maxVideoLength - 1) {
      updatePath(videoId + 1);
    }
  };

  const previewVideo = (): void => {
    if (videoId > 0) {
      updatePath(videoId - 1);
    }
  };

  const likeVideo = (): void => {
    updateVideoLike(videoId, [], liked ? likes - 1 : likes + 1);
    updateVideoLiked(videoId, [], !liked);
  };

  const copyUrl = (): void => {
    setShowModal(true);
  };

  return (
    <ContentPagee>
      <Containerr>
        <div>
          <DefaultSection>
            <Title>{videoTitle}</Title>
          </DefaultSection>
          <VideoContent>
            <Video>
              <iframe
                width="829"
                height="466"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Video>
            <BaseBoardSide>
              <ShareAndLike>
                <ShareIcon onClick={copyUrl}>
                  <ShareSvg />
                </ShareIcon>
                <ShareIcon onClick={likeVideo}>
                  {!liked && (
                    <LikeButtonIcon>
                      <LikeSvg />
                    </LikeButtonIcon>
                  )}
                  {liked && (
                    <LikeButtonIcon>
                      <LikedSvg />
                    </LikeButtonIcon>
                  )}
                  <NumberOfLikes>{likes}</NumberOfLikes>
                </ShareIcon>
              </ShareAndLike>
              <BaseBoard>
                <div>
                  <ButtonDownload
                    onClick={onDownloadPdf}
                    disabled={fileName === ''}
                    className="download-material"
                    title={fileName === '' && 'Não há material para baixar'}
                  >
                    <DownloadSvg />
                    <ButtonDownloadText>
                      Baixar material desta aula
                    </ButtonDownloadText>
                  </ButtonDownload>
                </div>
                <Button max_width={170} onClick={onVideoWatched}>
                  <ButtonConcluded>
                    {videoWatched && <CheckSvg />}
                    {!videoWatched && <ToConcludeCheck />}
                    <ButtonDownloadText>
                      {videoWatched ? 'Concluido' : 'Concluir'}
                    </ButtonDownloadText>
                  </ButtonConcluded>
                </Button>
                <ButtonPreview onClick={previewVideo} />
                <ButtonNext onClick={nextVideo} />
              </BaseBoard>
            </BaseBoardSide>
          </VideoContent>
        </div>
      </Containerr>
      <ModalSendVideo
        isOpen={showModal}
        setIsOpen={setShowModal}
        videoId={videoId}
      />
    </ContentPagee>
  );
};
