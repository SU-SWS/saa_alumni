import React from "react";
import { Menu } from "@headlessui/react";
import SbLink from "../../utilities/sbLink";

const MainNavItem = ({ blok: { link, text } }) => (
  <Menu.Item as="li">
    {({ active }) => (
      <SbLink
        link={link}
        activeClass=""
        classes={`${
          active && "su-bg-cardinal-red su-text-white"
        } hocus:su-underline hocus:su-text-white`}
      >
        {text}
      </SbLink>
    )}
  </Menu.Item>
);

export default MainNavItem;
