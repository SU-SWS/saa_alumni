import React from "react";
import SbEditable from "storyblok-react";
import ReactPlayer from "react-player";
import { dcnb } from "cnbuilder";
import {
  smallPaddingBottom,
  smallPaddingTop,
  mediaAspectRatio,
} from "../../utilities/dataSource";
import CaptionMedia from "./captionMedia";

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
    videoTitle,
  },
  blok,
}) => {
  const startMin = startMinute ? parseInt(startMinute, 10) : 0;
  const startSec = startSecond ? parseInt(startSecond, 10) : 0;

  const spacingTopStyle = smallPaddingTop[spacingTop] ?? "";
  const spacingBottomStyle = smallPaddingBottom[spacingBottom] ?? "";

  const convertToSecond = (min, sec) => min * 60 + sec;

  const start = convertToSecond(startMin, startSec);
  const width = "100%";
  const height = "100%";
  const frameBorder = "0";
  const allowFullScreen = "1";
  const YouTubeRegexp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const VimeoRegexp = /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
  let allow = "";
  let src = "";
  let video = "";

  if (video = videoUrl.match(YouTubeRegexp)) {
    const params = `autoplay=0&mute=0&controls=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`;
    src = `https://www.youtube.com/embed/${video[1]}?start=${start}&${params}`;
    allow = `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`;
  } else if (video = videoUrl.match(VimeoRegexp)) {
    src = `https://player.vimeo.com/video/${video[3]}`;
    allow = `autoplay; encrypted-media`;
  }

  return (
    <SbEditable content={blok}>
      <CaptionMedia
        mediaWidth={videoWidth}
        caption={caption}
        captionAlign={captionAlign}
        className={dcnb(spacingTopStyle, spacingBottomStyle)}
      >
        <div className="su-media__wrapper su-aspect-w-16 su-aspect-h-9">
          <div style={{ width: `${width}`, height: `${height}` }}>
            <iframe
              frameBorder={frameBorder}
              allowFullScreen={allowFullScreen}
              allow={allow}
              title={videoTitle}
              width={width}
              height={height}
              src={src}
            />
          </div>
        </div>
      </CaptionMedia>
    </SbEditable>
  );
};

export default EmbedVideo;
