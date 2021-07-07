import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading, SrOnlyText } from "decanter-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { VideoCameraIcon, MicrophoneIcon } from "@heroicons/react/outline";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";

const StoryCardView = ({
  blok: {
    cardImage: { filename: cardFilename } = {},
    image: { filename } = {},
    imageFocus,
    storyType,
    title,
    shortTitle,
    teaser,
    intro,
    source,
    pubLink,
  },
  blok,
  storyLink,
  isMinimal,
  isBigText,
  hideTab,
  hideImage,
  headingLevel,
  cardImageFocus,
  isDark,
  tabText,
}) => {
  // Use structure of Storyblok Link so we can pass this to our SbLink component
  const internalLink = { linktype: "story", cached_url: `${storyLink}/` };
  let externalLink;

  if (pubLink) {
    externalLink = { linktype: "url", url: pubLink };
  }

  let wrapperClasses =
    "su-border su-border-solid su-border-black-30-opacity-30 su-bg-clip-padding su-shadow-sm";

  let contentClasses = "su-bg-white su-rs-pt-2 su-rs-px-2 su-rs-pb-3";

  if (isMinimal) {
    wrapperClasses = "su-bg-transparent";
    contentClasses = "su-rs-pt-1";

    // No top padding if there are no images uploaded or the hide image option is checked
    if (hideImage || (!cardFilename && !filename)) {
      contentClasses = "";
    }
  }

  let headlineColor = "su-text-black hocus:su-text-black";
  let headlineIconColor = "";
  let textColor = "su-text-black";

  // Use different text color if card has minimal style and is placed in a dark region
  if (isDark && isMinimal) {
    textColor = "su-text-black-20";
    headlineColor = "su-text-white hocus:su-text-white";
    headlineIconColor = "group-hocus:su-text-white";
  }

  let headlineSize = "su-type-1";
  let teaserSize = "su-card-paragraph";

  if (isBigText) {
    headlineSize = dcnb("lg:su-type-2 xl:su-type-3", headlineSize);
    teaserSize = "su-card-paragraph lg:su-text-25";
  }

  // Add leading icon and screen reader text to headline if story type is podcast or video
  let TypeIcon;
  let typeIconClasses;
  let typeSrText;

  if (storyType === "video") {
    TypeIcon = VideoCameraIcon;
    typeIconClasses = "su-mt-[-0.2em]";
    typeSrText = "Video";
  } else if (storyType === "podcast") {
    TypeIcon = MicrophoneIcon;
    typeIconClasses = "su-mt-[-0.25em]";
    typeSrText = "Podcast";
  }

  // Default icon is right arrow for internal links
  // HeadlineIcon starts with uppercase letter because it's a component
  let HeadlineIcon = ArrowRightIcon;
  let headlineIconClasses =
    "su-ml-03em su-w-08em su--mt-01em group-hocus:su-translate-x-02em";

  // Change headline icon to diagonal arrow if card link is external
  if (pubLink) {
    HeadlineIcon = ArrowUpIcon;
    headlineIconClasses =
      "su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su-w-08em group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em";
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className={dcnb(
          "story-card su-group su-relative su-overflow-hidden su-break-words su-basefont-23 su-w-full",
          wrapperClasses,
          textColor
        )}
      >
        {!hideImage && (cardFilename || filename) && (
          <div
            className="story-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2"
            aria-hidden="true"
          >
            <figure className="su-overflow-hidden su-w-full su-h-full">
              <CardImage
                filename={cardFilename || filename}
                imageFocus={cardImageFocus || imageFocus}
                size="vertical"
                className="su-w-full su-h-full su-object-cover su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]"
                loading="lazy"
              />
            </figure>
          </div>
        )}
        <div className={dcnb("story-card-content", contentClasses)}>
          <SbLink
            link={externalLink || internalLink}
            classes={dcnb(
              "su-stretched-link su-z-20 su-rs-mt-2 su-mb-0 su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight",
              headlineSize,
              headlineColor
            )}
          >
            <Heading
              level={parseInt(headingLevel, 10) || 3}
              font="serif"
              tracking="normal"
              className="su-relative su-inline su-type-0"
            >
              {TypeIcon && (
                <TypeIcon
                  className={dcnb(
                    "su-inline-block su-mr-02em su-w-08em",
                    typeIconClasses
                  )}
                  aria-hidden="true"
                />
              )}
              {tabText &&
                !hideTab &&
                storyType !== "podcast" &&
                storyType !== "video" && <SrOnlyText srText={`${tabText}: `} />}
              {typeSrText && <SrOnlyText srText={`${typeSrText}: `} />}
              {shortTitle || title}
              {pubLink && <SrOnlyText srText=" (link is external)" />}
            </Heading>
            <HeadlineIcon
              className={dcnb(
                "su-relative su-inline-block su-transition su-transform-gpu su-text-digital-red-xlight",
                headlineIconClasses,
                headlineIconColor
              )}
              aria-hidden="true"
            />
          </SbLink>
          {source && (
            <p className="su-card-paragraph su-leading-display su-font-serif su-mt-02em">
              <span className="su-italic">from</span> {source}
            </p>
          )}
          {!hideTab && !hideImage && tabText && (cardFilename || filename) && (
            <TabLabel text={tabText} aria-hidden="true" />
          )}
          {(teaser || intro) && (
            <p
              className={dcnb("su-rs-mt-0 su-mb-0 su-leading-snug", teaserSize)}
            >
              {teaser || intro}
            </p>
          )}
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default StoryCardView;
