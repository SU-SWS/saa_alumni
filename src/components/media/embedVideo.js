import React from 'react';
import SbEditable from 'storyblok-react';
import ReactPlayer from 'react-player';
import { dcnb } from 'cnbuilder';
import { Heading } from '../simple/Heading';
import {
  smallPaddingBottom,
  smallPaddingTop,
  mediaAspectRatio,
} from '../../utilities/dataSource';
import CaptionMedia from './captionMedia';

const EmbedVideo = ({
  blok: {
    videoUrl,
    startMinute,
    startSecond,
    caption,
    aspectRatio,
    captionAlign,
    spacingTop,
    spacingBottom,
    videoWidth,
    srTitle,
    headingLevel = 3,
  },
  blok,
}) => {
  const startMin = startMinute ? parseInt(startMinute, 10) : 0;
  const startSec = startSecond ? parseInt(startSecond, 10) : 0;

  const spacingTopStyle = smallPaddingTop[spacingTop] || '';
  const spacingBottomStyle = smallPaddingBottom[spacingBottom] || '';

  const convertToSecond = (min, sec) => min * 60 + sec;
  const aspectRatioStyle = mediaAspectRatio[aspectRatio || '16x9'];

  return (
    <SbEditable content={blok}>
      {srTitle && (
        <Heading level={headingLevel} srOnly>
          {srTitle}
        </Heading>
      )}
      <CaptionMedia
        mediaWidth={videoWidth}
        caption={caption}
        captionAlign={captionAlign}
        className={dcnb('print:su-hidden', spacingTopStyle, spacingBottomStyle)}
      >
        <ReactPlayer
          className={dcnb('su-media__wrapper', aspectRatioStyle)}
          width=""
          height=""
          url={videoUrl}
          controls
          config={{
            youtube: {
              playerVars: { start: convertToSecond(startMin, startSec) },
            },
          }}
        />
      </CaptionMedia>
    </SbEditable>
  );
};

export default EmbedVideo;
