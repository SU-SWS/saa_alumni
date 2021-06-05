import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";

const PerkCardView = ({
  blok: {
    image: { filename } = {},
    imageFocus,
    isNew,
    type,
    title,
    descriptionShort,
    externalUrl,
  },
  blok,
  storyLink,
  headingLevel,
  orientation,
}) => {
  // Default link is the internal link of the perk content page
  let perkPageLink = { linktype: "story", cached_url: `${storyLink}/` };

  let wrapperClasses = "perk-card su-rs-pb-3 su-max-w-500";
  let imageWrapper = "su-aspect-w-4 su-aspect-h-3 su-mb-[-3em]";
  let gradientDirection = "su-bg-gradient-to-b";
  let contentWrapper = "";

  if (orientation === "horizontal") {
    wrapperClasses =
      "perk-card-horizontal su-w-full md:su-flex-row lg:su-items-end";
    imageWrapper = "md:su-w-1/2";
    gradientDirection = "su-bg-gradient-to-r";
    contentWrapper = "md:su-w-1/2 lg:su-max-w-700 md:su-rs-pb-3 md:su-ml-[-6em]";
  }

  // Default icon is right arrow for internal links
  // HeadlineIcon starts with uppercase letter because it's a component
  let HeadlineIcon = ArrowRightIcon;
  let headlineIconClasses =
    "su-ml-03em su--mt-02em su-w-09em group-hocus:su-translate-x-02em";

  // Link to external URL instead if it is provided
  // Change headline icon to diagonal arrow for external links
  if (externalUrl) {
    perkPageLink = { linktype: "url", url: externalUrl };
    HeadlineIcon = ArrowUpIcon;
    headlineIconClasses =
      "su-transform-gpu su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su--mt-01em su-w-[1.1em] group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em";
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
          "su-group su-relative su-bg-saa-black su-break-words su-basefont-23 su-border su-border-solid su-border-black",
          wrapperClasses
        )}
      >
        <div
          className={dcnb("perk-card-image-wrapper su-relative", imageWrapper)}
        >
          {filename?.startsWith("http") && (
            <figure className="su-overflow-hidden su-w-full su-h-full">
              <CardImage
                filename={filename}
                imageFocus={imageFocus}
                className="su-w-full su-h-full su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]"
                loading="lazy"
              />
            </figure>
          )}
          <div
            className={dcnb("su-absolute su-block su-w-full su-h-full su-top-0 su-left-0 su-from-transparent su-to-saa-black", gradientDirection)}
            aria-hidden="true"
          />
        </div>
        {isNew && <TabLabel text="New" srText={perkType} />}
        <div className={dcnb("perk-content su-rs-px-2", contentWrapper)}>
          <SbLink
            link={perkPageLink}
            classes="su-block su-stretched-link su-stretched-link-hocus-outline-black-20 su-group su-mb-08em su-text-white hocus:su-text-white su-no-underline hocus:su-underline group-hover:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight"
          >
            <Heading
              level={headingLevel ?? 3}
              font="serif"
              size={orientation === "horizontal" ? 3 : 1}
              tracking="normal"
              className="su-relative su-inline"
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
          <p className="su-relative su-text-black-20 su-card-paragraph">
            {descriptionShort}
          </p>
          <p className="su-relative su-inline-block su-w-fit su-leading-display su-mt-auto su-mb-0 su-text-digital-red-xlight su-rs-mt-0 su-text-17 md:su-text-19 xl:su-text-20 su-font-regular">
            {perkType}
          </p>
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default PerkCardView;
