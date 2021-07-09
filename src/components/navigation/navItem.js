import React from "react";
import SbEditable from "storyblok-react";
import SbLink from "../../utilities/sbLink";
import { dcnb } from "cnbuilder";

const NavItem = ({
  blok: { classes, link, text },
  blok,
  hasExternalIcon,
  className,
}) => (
  <SbEditable content={blok}>
    <li className={dcnb(classes, className)}>
      <SbLink
        link={link}
        activeClass="active"
        classes="su-group hover:su-underline focus:su-underline"
        hasExternalIcon={hasExternalIcon}
      >
        {text}
      </SbLink>
    </li>
  </SbEditable>
);

export default NavItem;
