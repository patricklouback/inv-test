import { BannerComponent } from '@components/Banner';
import { Container as ContainerPage } from '@components/Container';
import { AuthContext } from 'contexts/AuthContext';
import { BannersContext } from 'contexts/Banners';
import { VideoListContext } from 'contexts/VideoListContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { slug, styleSlug } from 'utils/constants';
import { CommentSection } from './CommentSection';
import { ProgressBar } from './ProgressBar';
import { TextExplanation } from './TextExplanation';
import { VideoBox } from './VideoBox';
import {
  AllContent,
  BannerContentWrapper,
  BannerSubtitle,
  BannerTitle,
  CloseButtonWrapper,
  Container,
  ContentPage,
  DefaultSection,
  SectionBanner,
  Title,
} from './styles';

export const KnowledgeTrailPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const {
    getAllVideos,
    updateVideoWatchedStatus,
    updateLikes,
    updateUserLike,
  } = useContext(VideoListContext);
  const { getBannersForPage, bannersList } = useContext(BannersContext);

  const { user } = useContext(AuthContext);

  const [videoList, setvideoList] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [videoInfo, setVideoInfo] = useState({});
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoLength, setVideoLength] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isBannerActive, setIsBannerActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isTrial = slug === 'trial';
  const isCommonUser = !user?.isAdmin && !user?.isManager;

  function getVideoIdFromQuery(): number | undefined {
    if (router.query.videoId === undefined) {
      return undefined;
    }
    return parseInt(router.query.videoId as string, 10);
  }

  const [videoId, setVideoId] = useState(getVideoIdFromQuery());

  function closeBanner(): void {
    setIsBannerActive(false);
  }

  function getLastVideoIdWatched(videoList): number {
    for (let i = 0; i < videoList.length; i += 1) {
      if (!videoList[i].watched) {
        return videoList[i].videoId;
      }
    }
    return videoList[videoList.length - 1].videoId;
  }

  function updateVideoUrl(id, videoList): void {
    const video = videoList.find(v => v.videoId === id);
    if (video !== undefined) {
      setVideoUrl(video.url);
    }
  }

  function updateVideoFileName(id, videoList): void {
    const video = videoList.find(v => v.videoId === id);
    if (video !== undefined) {
      setFileName(video.fileName);
    }
  }

  function updateVideoInfo(id, videoList): void {
    const video = videoList.find(v => v.videoId === id);
    if (video !== undefined) {
      setVideoInfo(video.textExplanation);
    }
  }

  function refreshVideoWatched(id, videoList): void {
    const video = videoList.find(v => v.videoId === id);
    if (video !== undefined) {
      setVideoWatched(video.watched);
    }
  }

  const updateVideoLike = useCallback(
    (id, videos, newLikes?): void => {
      const video = (videos.length === 0 ? videoList : videos).find(
        v => v.videoId === id
      );
      if (video !== undefined) {
        if (newLikes === undefined) {
          setLikes(video.likes);
        } else {
          setLikes(newLikes);
          updateLikes(id, newLikes);
        }
      }
    },
    [updateLikes, videoList]
  );

  const updateVideoLiked = useCallback(
    (id, videos, liked?): void => {
      const video = (videos.length === 0 ? videoList : videos).find(
        v => v.videoId === id
      );
      if (video !== undefined) {
        if (liked === undefined) {
          setLiked(video.liked);
        } else {
          setLiked(liked);
          updateUserLike(id, liked);
        }
      }
    },
    [updateUserLike, videoList]
  );

  const updateVideoTitle = useCallback(
    (id, allVideos?): void => {
      if (id !== undefined) {
        const videos = allVideos !== undefined ? allVideos : videoList;
        const video = videos.find(v => v.videoId === parseInt(id, 10));
        setVideoTitle(video !== undefined ? video.description : '');
      }
    },
    [setVideoTitle, videoList]
  );

  const updatePath = useCallback(
    (newId: number): void => {
      if (typeof window.history !== undefined) {
        if (window.history.pushState) {
          const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?videoId=${newId}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }
      }
      updateVideoTitle(newId, videoList);
      setVideoId(newId);
      updateVideoUrl(newId, videoList);
      updateVideoFileName(newId, videoList);
      updateVideoInfo(newId, videoList);
      refreshVideoWatched(newId, videoList);
      updateVideoLike(newId, videoList);
      updateVideoLiked(newId, videoList);
    },
    [updateVideoLike, updateVideoLiked, updateVideoTitle, videoList]
  );

  useEffect(() => {
    let mounted = true;
    if (videoId === undefined && mounted) {
      if (videoList.length > 0) {
        const id = getLastVideoIdWatched(videoList);
        setVideoId(id);
        updatePath(id);
      }
    }
    return () => {
      mounted = false;
    };
  }, [videoId, videoList, updatePath]);

  useEffect(() => {
    let mounted = true;
    getAllVideos().then(data => {
      if (mounted) {
        setvideoList(data);
        updateVideoTitle(videoId, data);
        updateVideoUrl(videoId, data);
        updateVideoFileName(videoId, data);
        updateVideoInfo(videoId, data);
        refreshVideoWatched(videoId, data);
        setVideoLength(data.length);
        updateVideoLiked(videoId, data);
        updateVideoLike(videoId, data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (isTrial) {
        await getBannersForPage('KNOWLEDGE_TRAIL', isTrial);
      }
    })();
  }, [getBannersForPage, isTrial]);

  const updateVideoWatched = (videoId: number): void => {
    const list = [...videoList];
    const video = list.filter(video => video.videoId === videoId)[0];
    video.watched = !video.watched;
    setvideoList(list);
    setVideoWatched(video.watched);
    updateVideoWatchedStatus(videoId, video.watched);
  };

  return (
    <div>
      <ContainerPage>
        <Container>
          <Link
            href={{
              pathname: '/knowledge-trail/[videoId]',
              query: { videoId },
            }}
          >
            <div />
          </Link>
          <DefaultSection>
            <RiTrophyLine size={24} />
            <Title>Trilhas de Conhecimento - Programa de Inovação</Title>
          </DefaultSection>
        </Container>
        {isTrial && !isCommonUser ? (
          <SectionBanner $isOpen={isBannerActive}>
            {bannersList && bannersList.length > 0 && (
              <BannerComponent banner={bannersList[0]}>
                <AllContent>
                  <BannerContentWrapper>
                    <BannerTitle>{bannersList[0].title}</BannerTitle>
                    <BannerSubtitle>{bannersList[0].subtitle}</BannerSubtitle>
                  </BannerContentWrapper>
                  <CloseButtonWrapper onClick={() => closeBanner()}>
                    <IoMdClose
                      size={25}
                      color={
                        isHovered ? colors.primaryLight[styleSlug] : colors.font
                      }
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  </CloseButtonWrapper>
                </AllContent>
              </BannerComponent>
            )}
          </SectionBanner>
        ) : null}
        <ContentPage>
          <ProgressBar
            videoList={videoList}
            updatePath={updatePath}
            videoId={videoId}
          />
          <VideoBox
            videoId={videoId}
            videoTitle={videoTitle}
            updateVideoWatched={updateVideoWatched}
            updatePath={updatePath}
            videoUrl={videoUrl}
            fileName={fileName}
            videoWatched={videoWatched}
            maxVideoLength={videoLength}
            likes={likes}
            updateVideoLike={updateVideoLike}
            liked={liked}
            updateVideoLiked={updateVideoLiked}
          />
        </ContentPage>
      </ContainerPage>
      <ContainerPage>
        <ContentPage>
          <TextExplanation videoInfo={videoInfo} />
        </ContentPage>
      </ContainerPage>
      <ContainerPage>
        <ContentPage>
          <CommentSection videoId={videoId} />
        </ContentPage>
      </ContainerPage>
    </div>
  );
};
