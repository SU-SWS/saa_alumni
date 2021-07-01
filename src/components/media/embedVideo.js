import React from "react";
import SbEditable from "storyblok-react";
import ReactPlayer from "react-player";
import { dcnb } from "cnbuilder";
import WidthBox from "../layout/widthBox";
import RichTextRenderer from "../../utilities/richTextRenderer";
import {
  smallPaddingBottom,
  smallPaddingTop,
  mediaAspectRatio,
  textAlign,
} from "../../utilities/dataSource";

const VideoWrapper = ({
  blok: { spacingTop, spacingBottom, videoWidth },
  children,
}) => {
  const spacingTopStyle = smallPaddingTop[spacingTop] ?? "";
  const spacingBottomStyle = smallPaddingBottom[spacingBottom] ?? "";
  const videoWrapperClasses = dcnb(
    "video-embed",
    spacingTopStyle,
    spacingBottomStyle
  );

  return (
    <WidthBox width={videoWidth} className={videoWrapperClasses}>
      {children}
    </WidthBox>
  );
};

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
  },
  blok,
}) => {
  const startMin = startMinute ? parseInt(startMinute, 10) : 0;
  const startSec = startSecond ? parseInt(startSecond, 10) : 0;

  const convertToSecond = (min, sec) => min * 60 + sec;
  const aspectRatioStyle = mediaAspectRatio[aspectRatio ?? "16x9"];
  const captionAlignment = textAlign[captionAlign ?? "left"];

  return (
    <SbEditable content={blok}>
      <VideoWrapper blok={{ spacingTop, spacingBottom, videoWidth }}>
        <figure className="su-media">
          <ReactPlayer
            className={dcnb("su-media__wrapper", aspectRatioStyle)}
            width=""
            height=""
            url={videoUrl}
            controls="true"
            config={{
              youtube: {
                playerVars: { start: convertToSecond(startMin, startSec) },
              },
            }}
          />
          {caption && (
            <figcaption>
              <RichTextRenderer
                wysiwyg={caption}
                className={dcnb(
                  "su-caption su-mt-06em children:su-leading-snug",
                  captionAlignment
                )}
              />
            </figcaption>
          )}
        </figure>
      </VideoWrapper>
    </SbEditable>
  );
};

export default EmbedVideo;
