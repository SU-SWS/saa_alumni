import React from "react";
import { Heading } from "decanter-react";
import Icon from "react-hero-icon";
import SbLink from "../../utilities/sbLink";

const iconClasses = "su-h-1em su-w-1em su-ml-04em su--mt-2 ";

const LinkList = ({
  blok: {
    title,
    headingLevel,
    headingSize,
    headingColor,
    links,
    linkSize,
    linkColor,
    linkStyle,
  },
}) => (
  <div>
    <Heading
      level={parseInt(headingLevel, 10)}
      font="sans"
      className={`
      ${headingColor ? `su-text-${headingColor}` : "su-text-black"}
      ${headingSize ? `su-text-${headingSize}` : "su-text-m0"}
    `}
    >
      {title}
    </Heading>
    <ul className="su-list-none su-pl-0">
      {links.map(({ link, linkText }) => (
        <li>
          <SbLink
            link={link}
            classes={`
            ${linkColor ? `su-text-${linkColor}` : ""}
            ${linkSize ? `su-text-${linkSize}` : "su-text-m0"}
          `}
          >
            {linkText}
            {linkStyle === "arrowLink" && (
              <Icon
                icon="arrow-right"
                type="solid"
                aria-hidden="true"
                className={`su-inline-block ${iconClasses}`}
              />
            )}
          </SbLink>
        </li>
      ))}
    </ul>
  </div>
);

export default LinkList;
