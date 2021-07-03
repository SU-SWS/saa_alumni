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
    pubLink,
    tabText,
  },
  blok,
  isMinimal,
  isBigHeadline,
  headingLevel,
  cardImageFocus,
}) => {
  let wrapperClasses =
    "su-rs-pb-3 su-bg-white su-border su-border-solid su-border-black-10 su-shadow-sm";
  let headlinePadding = "su-rs-px-2";
  let detailsPadding = "su-rs-px-2";

  if (isMinimal) {
    wrapperClasses = "su-bg-transparent";
    headlinePadding = "su-pt-01em";
    detailsPadding = "";
  }

  let headlineSize = "su-type-2 md:su-type-1 lg:su-type-2";

  if (isBigHeadline) {
    headlineSize = dcnb("xl:su-type-3", headlineSize);
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
        {!isMinimal && (
          <div
            className="perk-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2"
            aria-hidden="true"
          >
            {filename?.startsWith("http") && (
              <figure className="su-overflow-hidden su-w-full su-h-full">
                <CardImage
                  filename={filename}
                  imageFocus={cardImageFocus || imageFocus}
                  size="vertical"
                  className="su-w-full su-h-full su-object-cover su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]"
                  loading="lazy"
                />
              </figure>
            )}
          </div>
        )}
        <SbLink
          link={pubLink}
          classes={dcnb(
            "su-stretched-link su-z-20 su-rs-mt-0 su-mb-08em su-text-black su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight",
            headlineSize,
            headlinePadding
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
            className={dcnb("su-relative su-inline-block su-transition su-transform-gpu su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su-w-08em group-hocus:su-translate-x-01em group-hocus:su--translate-y-01em su-text-digital-red-xlight group-hocus:su-text-cardinal-red", headlineIconClasses)}
            aria-hidden="true"
          />
        </SbLink>
        {!isMinimal && <TabLabel text={tabText} />}
        <p>{teaser}</p>
      </FlexBox>
    </SbEditable>
  );
};
export default StoryCardView;
