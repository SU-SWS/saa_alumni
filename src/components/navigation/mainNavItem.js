import React from 'react';
import SbLink from '../../utilities/sbLink';

const MainNavItem = ({ blok: { link, text } }) => (
  <li className="lg:su-border-b su-border-solid su-border-digital-red-light last:su-border-none">
    <SbLink
      link={link}
      classes="su-block su-group su-w-full su-px-20 su-py-16 su-no-underline lg:su-text-20 2xl:su-text-21 su-leading-display su-text-white su-font-regular hocus:su-underline hocus:su-text-white hocus:su-bg-digital-red lg:hocus:su-bg-cardinal-red-xxdark !su-underline-offset lg:!su-underline-digital-red-xlight"
      hasExternalIcon
      externalIconClasses="su-text-digital-red-xlight group-hocus:su-text-white"
      activeClass="su-bg-digital-red !su-underline lg:su-bg-cardinal-red-xxdark "
    >
      {text}
    </SbLink>
  </li>
);

export default MainNavItem;
