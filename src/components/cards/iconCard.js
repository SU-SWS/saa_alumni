import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SbLink from "../../utilities/sbLink";

const IconCard = ({
  blok: { headline, headingLevel, icon = {}, isOutline },
  blok,
  isDark,
}) => {
  // Add all 3 types of FA icons to the library so you can use any of them
  library.add(fab, far, fas);

  // Remove "fa-" from Storyblok FA plugin to use Fontawesome React format
  const faIcon = icon.icon.replace("fa-", "");

  let cardStyles = "su-bg-white";
  let iconColor = "su-text-digital-red group-hocus:!su-text-digital-red-light";
  let headlineColor = "su-text-black hocus:su-text-digital-red-light";

  if (isDark) {
    iconColor =
      "su-text-digital-red-light group-hocus:su-text-digital-red-xlight";
    headlineColor = "su-text-white hocus:su-text-digital-red-xlight";
    cardStyles = "su-bg-saa-black";
  }

  return (
    <SbEditable content={blok}>
      <div
        className={dcnb(
          "icon-card su-group su-relative su-block su-w-full su-rs-px-2 su-rs-py-4 su-basefont-23 su-break-words su-border su-border-solid su-border-black-30-opacity-40 su-shadow-sm hover:su-shadow",
          cardStyles
        )}
      >
        <FlexBox
          direction="col"
          className={dcnb("card-body children:su-mx-auto su-text-center")}
        >
          <FontAwesomeIcon
            icon={[isOutline ? "far" : icon.type, faIcon]}
            className={dcnb("su-text-m2", iconColor)}
          />
          <SbLink
            classes={dcnb(
              "su-group su-stretched-link su-z-20 su-rs-mt-0 su-no-underline hocus:su-underline su-underline-offset",
              headlineColor
            )}
          >
            <Heading
              level={parseInt(headingLevel, 10) ?? 3}
              font="sans"
              weight="semibold"
              className={dcnb("su-mb-0 su-text-m2")}
            >
              {headline}
            </Heading>
          </SbLink>
        </FlexBox>
      </div>
    </SbEditable>
  );
};

export default IconCard;
