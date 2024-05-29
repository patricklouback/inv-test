/* eslint-disable no-void */

import { useRef } from 'react';
import {
  BigLoaded,
  BigLoading,
  BigToLoading,
  Line,
  LoadingDescription,
  SmallLoaded,
  SmallToLoading,
  VideoDescription,
} from './styles';

export const VideoComponent: React.FC<{
  type: string;
  isThereLine: boolean;
  isToScroll: boolean;
  description: string;
  gaugeMarginTop?: number;
  descriptionMarginTop?: number;
  totalLoad?: number;
  descriptionMarginLeft?: number;
  isDashedLine?: boolean;
  dashedLineBefore?: boolean;
  videoId?: number;
  index?: number;
  updatePath: (id: number) => void;
}> = ({
  type,
  index,
  isThereLine,
  description,
  gaugeMarginTop,
  descriptionMarginTop,
  totalLoad,
  descriptionMarginLeft,
  isDashedLine,
  dashedLineBefore,
  videoId,
  updatePath,
  isToScroll,
}): JSX.Element => {
  const selectVideo = (): void => {
    updatePath(videoId);
  };

  const myRef = useRef(null);

  if (isToScroll) {
    setTimeout(() => {
      myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
  }

  if (type === 'BigLoaded') {
    if (isThereLine) {
      return (
        <div ref={myRef}>
          <LoadingDescription
            onClick={selectVideo}
            className={`video-${index}`}
          >
            <BigLoaded marginTop={gaugeMarginTop} />
            <VideoDescription
              isBold={isToScroll}
              fontSize={isToScroll ? 15 : 16}
              marginTop={descriptionMarginTop}
            >
              {description}
            </VideoDescription>
          </LoadingDescription>
          <Line repeat={isDashedLine} />
        </div>
      );
    }
    return (
      <div ref={myRef}>
        <LoadingDescription onClick={selectVideo} className={`video-${index}`}>
          <BigLoaded marginTop={gaugeMarginTop} />
          <VideoDescription
            isBold={isToScroll}
            fontSize={isToScroll ? 15 : 16}
            marginTop={descriptionMarginTop}
          >
            {description}
          </VideoDescription>
        </LoadingDescription>
      </div>
    );
  }

  if (type === 'BigLoading') {
    if (isThereLine) {
      return (
        <div ref={myRef}>
          <LoadingDescription
            onClick={selectVideo}
            className={`video-${index}`}
          >
            <BigLoading myText={totalLoad} />
            <VideoDescription
              isBold={isToScroll}
              fontSize={isToScroll ? 15 : 16}
              marginLeft={descriptionMarginLeft}
            >
              {description}
            </VideoDescription>
          </LoadingDescription>
          <Line repeat={isDashedLine} />
        </div>
      );
    }
    return (
      <div ref={myRef}>
        <LoadingDescription onClick={selectVideo} className={`video-${index}`}>
          <BigLoading myText={totalLoad} />
          <VideoDescription
            isBold={isToScroll}
            fontSize={isToScroll ? 15 : 16}
            marginLeft={descriptionMarginLeft}
          >
            {description}
          </VideoDescription>
        </LoadingDescription>
      </div>
    );
  }

  if (type === 'BigToLoading') {
    if (isThereLine) {
      return (
        <div ref={myRef}>
          <LoadingDescription
            onClick={selectVideo}
            className={`video-${index}`}
          >
            <BigToLoading />
            <VideoDescription
              isBold={isToScroll}
              fontSize={isToScroll ? 15 : 16}
            >
              {description}
            </VideoDescription>
          </LoadingDescription>
          <Line repeat={isDashedLine} />
        </div>
      );
    }
    return (
      <div ref={myRef}>
        <LoadingDescription onClick={selectVideo} className={`video-${index}`}>
          <BigLoading myText={totalLoad} />
          <VideoDescription
            isBold={isToScroll}
            fontSize={isToScroll ? 15 : 16}
            marginLeft={descriptionMarginLeft}
          >
            {description}
          </VideoDescription>
        </LoadingDescription>
      </div>
    );
  }

  if (type === 'SmallLoaded') {
    if (isThereLine) {
      return (
        <div ref={myRef}>
          <LoadingDescription
            onClick={selectVideo}
            className={`video-${index}`}
          >
            <div>
              <Line height={22} repeat={dashedLineBefore} />
              <SmallLoaded />
              <Line height={22} repeat={isDashedLine} />
            </div>
            <VideoDescription
              isBold={isToScroll}
              marginRigth={10}
              width={186}
              marginLeft={34}
            >
              {description}
            </VideoDescription>
          </LoadingDescription>
          <Line repeat={isDashedLine} />
        </div>
      );
    }
    return (
      <div ref={myRef}>
        <LoadingDescription onClick={selectVideo} className={`video-${index}`}>
          <div>
            <Line height={22} repeat={dashedLineBefore} />
            <SmallLoaded />
          </div>
          <VideoDescription
            isBold={isToScroll}
            marginRigth={10}
            width={186}
            marginLeft={34}
          >
            {description}
          </VideoDescription>
        </LoadingDescription>
      </div>
    );
  }

  if (type === 'SmallToLoading') {
    if (isThereLine) {
      return (
        <div ref={myRef}>
          <LoadingDescription
            onClick={selectVideo}
            className={`video-${index}`}
          >
            <div>
              <Line height={20} repeat={dashedLineBefore} />
              <SmallToLoading />
              <Line height={20} repeat={isDashedLine} />
            </div>
            <VideoDescription
              isBold={isToScroll}
              marginRigth={10}
              width={186}
              marginLeft={34}
            >
              {description}
            </VideoDescription>
          </LoadingDescription>
          <Line repeat={isDashedLine} />
        </div>
      );
    }
    return (
      <div ref={myRef}>
        <LoadingDescription onClick={selectVideo} className={`video-${index}`}>
          <div>
            <Line height={20} repeat={dashedLineBefore} />
            <SmallToLoading />
          </div>
          <VideoDescription
            isBold={isToScroll}
            marginRigth={10}
            width={186}
            marginLeft={34}
          >
            {description}
          </VideoDescription>
        </LoadingDescription>
      </div>
    );
  }

  return <div />;
};
