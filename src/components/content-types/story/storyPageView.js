import SbEditable from "storyblok-react";
import React from "react";
import { Container, Heading } from "decanter-react";
import { DateTime } from "luxon";
import Layout from "../../partials/layout";
import CreateBloks from "../../../utilities/createBloks";
import FullWidthImage from "../../media/fullWidthImage";
import getNumBloks from "../../../utilities/getNumBloks";
import WidthBox from "../../layout/widthBox";
import CardImage from "../../media/cardImage";
import HeroIcon from "../../simple/heroIcon";
import CaptionMedia from "../../media/captionMedia";

const StoryPageView = (props) => {
  // Destructure props
  const {
    blok: {
      image: { filename, alt } = {},
      imageFocus,
      notFullwidthImage,
      caption,
      storyType,
      source,
      title,
      intro,
      author,
      publishedDate,
      manualDate,
      content,
      belowContent,
    },
    blok,
  } = props;

  const numBelow = getNumBloks(belowContent);

  // The date/time string we get from Storyblok is in UTC
  // Convert string to luxon DateTime object and format the pieces for display
  // Start date and time
  const luxonPublished = DateTime.fromFormat(publishedDate, "yyyy-MM-dd T", {
    zone: "UTC",
  })
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const nicePublishedDate = luxonPublished.toFormat("DDD");

  let heroImage;

  // Default hero image is edge to edge
  if (filename) {
    heroImage = (
      <CaptionMedia
        mediaWidth="edge-to-edge"
        caption={caption}
        isInsetCaption
        captionAlign="right"
        className="su-rs-mb-6"
      >
        <div className="su-relative su-overflow-hidden su-w-full md:su-h-[50vw] 2xl:su-h-900">
          <FullWidthImage
            filename={filename}
            imageFocus={imageFocus}
            alt={alt ?? ""}
            className="su-w-full su-h-full su-object-cover"
            loading="eager"
          />
        </div>
      </CaptionMedia>
    );
  }

  if (notFullwidthImage && filename) {
    heroImage = (
      <CaptionMedia
        mediaWidth="10"
        caption={caption}
        captionAlign="right"
        className="su-rs-mb-6"
      >
        <CardImage filename={filename} alt={alt ?? ""} loading="eager" />
      </CaptionMedia>
    );
  }

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
        <Container
          element="main"
          id="main-content"
          className="story-page su-relative su-flex-grow su-w-full su-basefont-23"
          width="full"
        >
          <article>
            <header className="su-basefont-23">
              <Container className="su-rs-pt-9 su-rs-pb-4 su-text-center">
                <Heading
                  level={1}
                  align="center"
                  font="serif"
                  className="su-max-w-1200 su-mb-02em su-text-m3 md:su-text-m4 lg:su-text-m5 su-mx-auto su-max-w-1200"
                >
                  {(storyType === "podcast" || storyType === "video") && (
                    <HeroIcon
                      iconType={storyType}
                      className="su-inline-block su-mr-02em su-w-08em"
                    />
                  )}
                  {title}
                </Heading>
                {intro && (
                  <p className="su-rs-mb-3 su-font-serif su-text-m1 su-leading-snug su-max-w-prose su-mx-auto">
                    {intro}
                  </p>
                )}
                {(manualDate || nicePublishedDate) && (
                  <p className="su-card-paragraph su-leading-display su-mb-02em su-text-black-70">
                    {manualDate || nicePublishedDate}
                  </p>
                )}
                {source && (
                  <p className="su-card-paragraph su-leading-display su-mb-0 su-text-black-70 su-font-serif">
                    <span className="su-italic">from</span> {source}
                  </p>
                )}
              </Container>
              {heroImage}
              {author && (
                <WidthBox width="8">
                  <p className="su-mb-0 su-font-serif su-leading-display">
                    <span className="su-italic">by</span> {author}
                  </p>
                </WidthBox>
              )}
            </header>
            <div className="story-content su-rs-mt-4 su-rs-mb-9">
              <CreateBloks blokSection={content} />
            </div>
            {numBelow > 0 && (
              <div className="basic-page-below-content">
                <CreateBloks blokSection={belowContent} />
              </div>
            )}
          </article>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default StoryPageView;
