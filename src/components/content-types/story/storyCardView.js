import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";

const StoryCardView = ({
  blok: { image: { filename } = {}, imageFocus, title, teaser, cardUrl },
  blok,
  isMinimal,
  headingLevel,
  orientation,
  cardImageFocus,
}) => {
  const wrapperClasses = "Story-card su-max-w-500";
  const imageWrapper = "su-aspect-w-3 su-aspect-h-2 su-mb-[-3em]";
  const gradientDirection = "su-bg-gradient-to-b";
  const contentWrapper = "su-flex-grow";
  const descriptionClasses = "su-card-paragraph";
  const marginBottom = "";

  // Default icon is right arrow for internal links
  // HeadlineIcon starts with uppercase letter because it's a component
  let HeadlineIcon = ArrowRightIcon;
  let headlineIconClasses =
    "su-ml-03em su-w-08em su--mt-01em group-hocus:su-translate-x-02em";

  // Change headline icon to diagonal arrow if card link is external
  if (cardUrl.linktype === "url") {
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
          "su-group su-relative su-w-full su-overflow-hidden su-bg-saa-black su-break-words su-basefont-23 su-border su-border-solid su-border-black",
          wrapperClasses,
          marginBottom
        )}
      >
        <div
          className={dcnb(
            "Story-card-image-wrapper su-relative su-overflow-hidden",
            imageWrapper
          )}
          aria-hidden="true"
        >
          {filename?.startsWith("http") && (
            <CardImage
              filename={filename}
              imageFocus={cardImageFocus || imageFocus}
              className="su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]"
              loading={orientation === "horizontal" ? "eager" : "lazy"}
              size={orientation === "horizontal" ? "horizontal" : "vertical"}
            />
          )}
          <div
            className={dcnb(
              "su-absolute su-block su-w-full su-h-full su-top-0 su-left-0 su-from-transparent su-to-saa-black su-backface-hidden",
              gradientDirection
            )}
            aria-hidden="true"
          />
        </div>
        <TabLabel text="New" srText="item" />
        <FlexBox
          direction="col"
          className={dcnb(
            "Story-card-content su-rs-px-2 su-rs-pb-3",
            contentWrapper
          )}
        >
          <SbLink
            link={cardUrl}
            classes={`su-block su-stretched-link su-stretched-link-hocus-outline-black-20 su-group su-mb-06em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight ${
              orientation === "horizontal"
                ? "su-type-2 md:su-type-1 lg:su-type-2 xl:su-type-3"
                : "su-type-1"
            }`}
          >
            <Heading
              level={headingLevel ?? 3}
              font="serif"
              tracking="normal"
              className="su-relative su-inline su-type-0"
            >
              {title}
            </Heading>
            <HeadlineIcon
              className={dcnb(
                "su-relative su-inline-block su-transition su-transform-gpu su-text-digital-red-xlight group-hocus:su-text-white",
                headlineIconClasses
              )}
              aria-hidden="true"
            />
          </SbLink>
          <p
            className={dcnb(
              "su-relative su-text-black-20 su-flex-grow su-mb-0",
              descriptionClasses
            )}
          >
            {teaser}
          </p>
        </FlexBox>
      </FlexBox>
    </SbEditable>
  );
};
export default StoryCardView;
