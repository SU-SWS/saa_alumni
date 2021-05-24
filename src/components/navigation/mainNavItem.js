import React from "react";
import SbLink from "../../utilities/sbLink";

const MainNavItem = ({ blok: { link, text } }) => (
  <li>
    <SbLink
      link={link}
      activeClass="su-bg-digital-red-dark su-text-white su-underline"
      classes={`su-block su-w-full su-px-20 su-py-10 su-no-underline su-text-white su-font-regular hocus:su-underline hocus:su-text-white`}
    >
      {text}
    </SbLink>
  </li>
);

export default MainNavItem;
