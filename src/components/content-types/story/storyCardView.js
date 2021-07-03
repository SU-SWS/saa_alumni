import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";

const StoryCardView = ({
  blok: {
    cardImage: { filename: cardFilename } = {},
    image: { filename } = {},
    imageFocus,
    title,
    shortTitle,
    teaser,
    source,
    pubLink,
    tabText,
  },
  blok,
  storyLink,
  isMinimal,
  isBigText,
  hideTab,
  headingLevel,
  cardImageFocus,
}) => {
  let wrapperClasses =
    "su-bg-white su-border su-border-solid su-border-black-10 su-shadow-sm";

  let contentPadding = "su-rs-p-2";

  if (isMinimal) {
    wrapperClasses = "su-bg-transparent";
    contentPadding = "su-rs-pt-1";
  }

  let headlineSize = "su-type-2 md:su-type-1 lg:su-type-2";
  let teaserSize = "su-card paragraph";

  if (isBigText) {
    headlineSize = dcnb("xl:su-type-3", headlineSize);
    teaserSize = "su-big-paragraph";
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
      "su-transform-gpu su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su-w-08em group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em";
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className={dcnb(
          "story-card su-group su-relative su-overflow-hidden su-text-black su-break-words su-basefont-23 su-w-full su-max-w-500 md:su-max-w-600",
          wrapperClasses
        )}
      >
        <div
          className="perk-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2"
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
        <div className={dcnb("story-card-content", contentPadding)}>
          <SbLink
            link={pubLink || storyLink}
            classes={dcnb(
              "su-stretched-link su-z-20 su-rs-mt-2 su-mb-0 su-text-black su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight",
              headlineSize
            )}
          >
            <Heading
              level={headingLevel ?? 3}
              font="serif"
              tracking="normal"
              className="su-relative su-inline su-type-0"
            >
              {shortTitle || title}
            </Heading>
            <HeadlineIcon
              className={dcnb(
                "su-relative su-inline-block su-transition su-transform-gpu su-text-digital-red-xlight group-hocus:su-text-cardinal-red",
                headlineIconClasses
              )}
              aria-hidden="true"
            />
          </SbLink>
          {source && <p className="su-card-paragraph">from the {source}</p>}
          {!isMinimal && !hideTab && <TabLabel text={tabText} />}
          <p className={dcnb("su-rs-mt-1 su-mb-0", teaserSize)}>{teaser}</p>
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default StoryCardView;
