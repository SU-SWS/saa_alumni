import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';

const NavItem = ({
  blok: { link, text },
  blok,
  hasExternalIcon,
  className,
}) => (
  <SbEditable content={blok}>
    <li className={className}>
      <SbLink
        link={link}
        activeClass="active"
        classes="su-group su-no-underline hover:su-underline focus:su-underline"
        hasExternalIcon={hasExternalIcon}
      >
        {text}
      </SbLink>
    </li>
  </SbEditable>
);

export default NavItem;
