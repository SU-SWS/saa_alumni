import React from "react";
import SbEditable from "storyblok-react";
import ReactPlayer from "react-player";
import { Container, FlexCell } from "decanter-react";
import RichTextRenderer from "../../utilities/richTextRenderer";
import {
  smallPaddingBottom,
  smallPaddingTop,
} from "../../utilities/dataSource";

// Wrapper that sets the size of the video depending on Storyblok option selected
const VideoWrapper = ({
  blok: { spacingTop, spacingBottom, videoWidth },
  children,
}) => {
  const videoWrapperClasses = `video-embed
        ${spacingTop !== "none" ? smallPaddingTop[spacingTop] : ""}
        ${spacingBottom !== "none" ? smallPaddingBottom[spacingBottom] : ""}`;

  if (videoWidth === "site") {
    return <Container className={videoWrapperClasses}>{children}</Container>;
  }

  if (videoWidth === "inset") {
    return (
      <Container width="full" className={videoWrapperClasses}>
        <FlexCell sm={10} md={8} lg={7} xl={6} className="su-mx-auto">
          {children}
        </FlexCell>
      </Container>
    );
  }

  // This is for fitting to any parent container width so we don't want centered container
  return <div className={videoWrapperClasses}>{children}</div>;
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

  return (
    <SbEditable content={blok}>
      <VideoWrapper blok={{ spacingTop, spacingBottom, videoWidth }}>
        <figure className="su-media">
          <ReactPlayer
            className={`su-media__wrapper ${aspectRatio}`}
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
                className={`su-caption su-mt-06em children:su-leading-snug su-text-${captionAlign}`}
              />
            </figcaption>
          )}
        </figure>
      </VideoWrapper>
    </SbEditable>
  );
};

export default EmbedVideo;
