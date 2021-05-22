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
          active && "su-bg-digital-red-dark su-text-white su-underline"
        } su-block su-w-full su-px-20 su-py-10 su-no-underline su-text-white su-font-regular hocus:su-underline hocus:su-text-white`}
      >
        {text}
      </SbLink>
    )}
  </Menu.Item>
);

export default MainNavItem;
