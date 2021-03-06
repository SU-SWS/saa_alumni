import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading, SrOnlyText } from "decanter-react";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import HeroIcon from "../../simple/heroIcon";

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
    "su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm";

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

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className={dcnb(
          "story-card su-group su-relative su-overflow-hidden su-break-words su-basefont-23 su-w-full sm:su-max-w-[42rem] md:su-max-w-full",
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
              "su-stretched-link su-z-20 su-rs-mt-2 su-mb-02em su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight",
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
              {tabText &&
                !hideTab &&
                tabText !== "podcast" &&
                tabText !== "video" && <SrOnlyText srText={`${tabText}: `} />}
              {(storyType === "podcast" || storyType === "video") && (
                <HeroIcon
                  iconType={storyType}
                  className="su-inline-block su-mr-02em"
                />
              )}
              {shortTitle || title}
              {pubLink && <SrOnlyText srText=" (link is external)" />}
            </Heading>
            <HeroIcon
              iconType={pubLink ? "external" : "internal"}
              className={`su-relative su-inline-block su-transition su-transform-gpu su-text-digital-red-xlight ${headlineIconColor}`}
              hideSrText
            />
          </SbLink>
          {source && (
            <p className="su-card-paragraph su-leading-display su-font-serif su-rs-mb-0">
              <span className="su-italic">from</span> {source}
            </p>
          )}
          {!hideTab && !hideImage && tabText && (cardFilename || filename) && (
            <TabLabel text={tabText} aria-hidden="true" />
          )}
          {(teaser || intro) && (
            <p className={dcnb("su-mb-0 su-leading-snug", teaserSize)}>
              {teaser || intro}
            </p>
          )}
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default StoryCardView;
