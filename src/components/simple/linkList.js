import React from "react";
import { Heading } from "decanter-react";
import Icon from "react-hero-icon";
import SbLink from "../../utilities/sbLink";
import CreateBloks from "../../utilities/createBloks";

const iconClasses = "su-h-1em su-w-1em su-ml-04em su--mt-2 ";

const LinkList = ({
  blok: {
    title,
    headingLevel,
    headingSize,
    headingColor,
    headingFont,
    links,
    linkSize,
    linkColor,
    linkStyle,
  },
}) => (
  <div>
    <Heading
      level={parseInt(headingLevel, 10)}
      font={headingFont}
      className={`
      su-mb-30
      su-font-semibold
      ${headingColor ? `su-text-${headingColor}` : "su-text-black"}
      ${headingSize ? `su-text-${headingSize}` : "su-text-m0"}
    `}
    >
      {title}
    </Heading>
    <CreateBloks blokSection={links} />
  </div>
);

export default LinkList;
