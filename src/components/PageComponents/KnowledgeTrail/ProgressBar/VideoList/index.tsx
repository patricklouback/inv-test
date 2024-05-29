/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-return */
/* eslint-disable no-void */
import { List } from './styles';
import { VideoComponent } from './VideoComponent';

const videoListIcons = [];

function isLastElementOrDontHasSubItem(index, videoList): boolean {
  return index + 1 === videoList.length || videoList[index + 1].type === 'item';
}

function isDashedLine(index, videoList): boolean {
  if (index + 1 === videoList.length) {
    return true;
  }
  return !videoList[index + 1].watched;
}

function totalLoadCalculate(index, videoList): number {
  let totalLoad = videoList[index].watched ? 1 : 0;
  let totalSubItems = 1;

  for (let i = index + 1; i < videoList.length; i++) {
    if (videoList[i].type === 'subItem') {
      if (videoList[i].watched) {
        totalLoad++;
      }
      totalSubItems++;
      if (i + 1 === videoList.length)
        return ((totalLoad * 100) / (totalSubItems * 100)) * 100;
    } else {
      return ((totalLoad * 100) / (totalSubItems * 100)) * 100;
    }
  }
}

function createVideoList(videoList, videoId): void {
  for (let i = 0; i < videoList.length; i++) {
    const videoIcon = {
      type: null,
      description: null,
      isThereLine: null,
      gaugeMarginTop: null,
      descriptionMarginTop: null,
      descriptionMarginLeft: null,
      totalLoad: null,
      dashedLine: null,
      dashedLineBefore: null,
      videoId: null,
      isToScroll: null,
    };
    if (videoList[i].type === 'item') {
      if (isLastElementOrDontHasSubItem(i, videoList)) {
        if (videoList[i].watched) {
          videoIcon.type = 'BigLoaded';
        } else {
          videoIcon.type = 'BigToLoading';
        }
      } else {
        videoIcon.totalLoad = Math.round(totalLoadCalculate(i, videoList));
        if (videoIcon.totalLoad === 100) {
          videoIcon.type = 'BigLoaded';
        } else {
          videoIcon.type =
            videoIcon.totalLoad === 0 ? 'BigToLoading' : 'BigLoading';
        }
      }
    }

    if (videoList[i].type === 'subItem') {
      videoIcon.type = videoList[i].watched ? 'SmallLoaded' : 'SmallToLoading';
      videoIcon.descriptionMarginLeft = i === 0 ? 0 : 32;
    }

    videoIcon.description = videoList[i].description;
    videoIcon.isThereLine = i + 1 !== videoList.length;
    videoIcon.gaugeMarginTop = i === 0 ? 16 : 0;
    videoIcon.descriptionMarginTop = i === 0 ? 16 : 0;
    videoIcon.dashedLine = isDashedLine(i, videoList);
    videoIcon.dashedLineBefore =
      i === 0 ? false : isDashedLine(i - 1, videoList);
    videoIcon.videoId = videoList[i].videoId;
    videoIcon.isToScroll = videoList[i].videoId === videoId;

    videoListIcons.push(videoIcon);
  }
  return;
}

export const VideoList: React.FC<{
  videoList: Array<any>;
  updatePath: (id: number) => void;
  videoId;
}> = ({ videoList, updatePath, videoId }): JSX.Element => {
  videoListIcons.splice(0, videoListIcons.length);
  createVideoList(videoList, videoId);
  return (
    <List>
      {videoListIcons.map((item, index) => {
        return (
          <VideoComponent
            index={index}
            key={item.videoId}
            type={item.type}
            description={item.description}
            isThereLine={item.isThereLine}
            gaugeMarginTop={item.gaugeMarginTop}
            descriptionMarginTop={item.descriptionMarginTop}
            descriptionMarginLeft={item.descriptionMarginLeft}
            totalLoad={item.totalLoad}
            isDashedLine={item.dashedLine}
            dashedLineBefore={item.dashedLineBefore}
            videoId={item.videoId}
            updatePath={updatePath}
            isToScroll={item.isToScroll}
          />
        );
      })}
    </List>
  );
};
