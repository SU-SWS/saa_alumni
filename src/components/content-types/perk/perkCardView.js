import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import { largeMarginBottom } from "../../../utilities/dataSource";

const PerkCardView = ({
  blok: {
    image: { filename } = {},
    imageFocus,
    isNew,
    title,
    descriptionShort,
    cardUrl,
  },
  blok,
  headingLevel,
  orientation,
  spacingBottom,
  cardImageFocus,
}) => {
  let wrapperClasses = "perk-card su-max-w-500";
  let imageWrapper = "su-aspect-w-3 su-aspect-h-2 su-mb-[-3em]";
  let gradientDirection = "su-bg-gradient-to-b";
  let contentWrapper = "su-flex-grow";
  let descriptionClasses = "su-card-paragraph";
  let marginBottom = "";

  // Horizontal card styles and options
  if (orientation === "horizontal") {
    wrapperClasses =
      "perk-card-horizontal su-w-full md:su-flex-row xl:su-h-500";
    marginBottom = largeMarginBottom[spacingBottom] ?? largeMarginBottom.md;
    imageWrapper =
      "su-w-full su-mb-[-4em] md:su-mb-0 md:su-w-1/2 su-h-[60vw] sm:su-h-[50vw] lg:su-h-[40vw] xl:su-h-500 su-flex-shrink-0 su-h-full";
    gradientDirection = dcnb("md:su-bg-gradient-to-r", gradientDirection);
    contentWrapper =
      "su-w-full md:su-w-9/12 lg:su-w-7/12 lg:su-max-w-[72rem] md:su-self-end md:su-rs-pt-3 md:su-pl-0 md:su-ml-[-7em]";
    descriptionClasses = dcnb(
      "xl:su-big-paragraph xl:su-leading-snug",
      descriptionClasses
    );
  }

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
            "perk-card-image-wrapper su-relative su-overflow-hidden",
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
              "su-absolute su-block su-w-full su-h-full su-top-0 su-left-0 su-from-transparent su-to-saa-black",
              gradientDirection
            )}
            aria-hidden="true"
          />
        </div>
        {isNew && <TabLabel text="New" srText="item" />}
        <FlexBox
          direction="col"
          className={dcnb(
            "perk-card-content su-rs-px-2 su-rs-pb-3",
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
            {descriptionShort}
          </p>
        </FlexBox>
      </FlexBox>
    </SbEditable>
  );
};
export default PerkCardView;
