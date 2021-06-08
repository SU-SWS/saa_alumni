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
    type,
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
  let imageClasses = "";
  let gradientDirection = "su-bg-gradient-to-b";
  let contentWrapper = "su-rs-pb-3 su-flex-grow";
  let descriptionClasses = "su-card-paragraph";
  let marginBottom = "";

  // Horizontal card styles and options
  if (orientation === "horizontal") {
    wrapperClasses =
      "perk-card-horizontal su-w-full md:su-flex-row xl:su-h-500";
    marginBottom = largeMarginBottom[spacingBottom] ?? largeMarginBottom.md;
    imageWrapper =
      "su-mb-[-3em] md:su-mb-0 md:su-w-1/2 su-flex-shrink-0 su-h-full";
    imageClasses = "md:su-min-h-[40rem]";
    gradientDirection = dcnb("md:su-bg-gradient-to-r", gradientDirection);
    contentWrapper =
      "su-w-full md:su-w-9/12 lg:su-w-7/12 lg:su-max-w-700 md:su-self-end md:su-py-30 lg:su-pb-45 md:su-ml-[-6em]";
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

  let perkType = "Alumni perk";

  if (type === "benefit") {
    perkType = "Member benefit";
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
              className={dcnb(
                "su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]",
                imageClasses
              )}
              loading="lazy"
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
        {isNew && <TabLabel text="New" srText={perkType} />}
        <FlexBox
          direction="col"
          className={dcnb("perk-card-content su-rs-px-2", contentWrapper)}
        >
          <SbLink
            link={cardUrl}
            classes={`su-block su-stretched-link su-stretched-link-hocus-outline-black-20 su-group su-mb-06em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight ${
              orientation === "horizontal"
                ? "su-type-2 xl:su-type-3"
                : "su-text-m1"
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
              "su-relative su-text-black-20 su-flex-grow su-mb-07em",
              descriptionClasses
            )}
          >
            {descriptionShort}
          </p>
          <p className="su-relative su-inline-block su-flex-grow-0 su-w-fit su-leading-display su-mt-auto su-mb-0 su-text-digital-red-xlight su-rs-mt-0 su-text-17 md:su-text-19 xl:su-text-20 su-font-regular">
            {perkType}
          </p>
        </FlexBox>
      </FlexBox>
    </SbEditable>
  );
};
export default PerkCardView;
