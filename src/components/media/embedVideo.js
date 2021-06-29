import React from "react";
import SbEditable from "storyblok-react";
import ReactPlayer from "react-player";
import RichTextField from "../../utilities/richTextRenderer";
// import CenteredContainer from "../partials/";
// import FlexCell from "../partials/flexCell";

// Wrapper that sets the size of the video depending on Storyblok option selected
const VideoWrapper = ({ spacingTop, spacingBottom, videoWidth, children }) => {
  const videoWrapperClasses = `video-embed
        ${spacingTop !== "none" ? `su-pt-${spacingTop}` : ""}
        ${spacingBottom !== "none" ? `su-pb-${spacingBottom}` : ""}`;

  // if (videoWidth === "site") {
  //   return (
  //     <CenteredContainer classes={videoWrapperClasses}>
  //       {children}
  //     </CenteredContainer>
  //   );
  // }

  // if (videoWidth === "inset") {
  //   return (
  //     <CenteredContainer flex={true} classes={videoWrapperClasses}>
  //       <FlexCell sm={10} md={8} lg={7} xl={6} classes={"su-mx-auto"}>
  //         {children}
  //       </FlexCell>
  //     </CenteredContainer>
  //   );
  // }

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
  },
  blok,
}) => {
  const startMin = startMinute ? parseInt(startMinute) : 0;
  const startSec = startSecond ? parseInt(startSecond) : 0;

  const convertToSecond = (min, sec) => min * 60 + sec;

  return (
    <SbEditable content={blok}>
      <VideoWrapper {...blok}>
        <figure className="su-media">
          <div
            className={`su-media__wrapper su-embed-container--${aspectRatio}`}
          >
            <ReactPlayer
              url={videoUrl}
              controls={true}
              config={{
                youtube: {
                  playerVars: { start: convertToSecond(startMin, startSec) },
                },
              }}
            />
          </div>
          {caption && (
            <figcaption
              className={`su-media__caption ood-story-media__caption su-text-align-${captionAlign}`}
            >
              <RichTextField data={caption} />
            </figcaption>
          )}
        </figure>
      </VideoWrapper>
    </SbEditable>
  );
};

export default EmbedVideo;
