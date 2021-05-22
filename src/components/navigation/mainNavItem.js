import React from "react";
import SbEditable from "storyblok-react";
import SbLink from "../../utilities/sbLink";
import { Menu } from '@headlessui/react'

const MainNavItem = ({ blok: { classes, link, text }, blok }) => (
  <SbEditable content={blok}>
    <Menu>
      <Menu.Item as='li'>
        {({ active }) => (
          <SbLink
            link={link}
            activeClass={``}
            classes={`${active && 'su-bg-cardinal-red su-text-white'} hover:su-underline focus:su-underline`}
          >
            {text}
          </SbLink>
        )}
      </Menu.Item>
    </Menu>
  </SbEditable>
);

export default MainNavItem;
