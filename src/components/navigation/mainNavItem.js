import React from "react";
import SbLink from "../../utilities/sbLink";

const MainNavItem = ({ blok: { link, text } }) => (
  <li className="su-border-b su-border-solid su-border-digital-red-light last:su-border-none">
    <SbLink
      link={link}
      classes="su-block su-group su-w-full su-px-20 su-py-14 su-no-underline su-text-20 su-text-white su-font-regular hocus:su-underline hocus:su-text-white hocus:su-bg-cardinal-red-xxdark !su-underline-offset"
      hasExternalIcon
      externalIconClasses="su-text-digital-red-xlight"
    >
      {text}
    </SbLink>
  </li>
);

export default MainNavItem;
