import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';

const NavItem = ({blok: { classes, link, text }, blok}) => (
  <SbEditable content={blok}>
    <li className={classes}>
      <SbLink link={link} activeClass='active' classes='hover:su-underline focus:su-underline'>
        {text}
      </SbLink>
    </li>
  </SbEditable>
);

export default NavItem;
