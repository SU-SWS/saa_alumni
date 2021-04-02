import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';

const NavItem = (props) => (
  <SbEditable content={props.blok}>
    <li className={props.blok.classes}>
      <SbLink link={props.blok.link} activeClass={'active'}>
        {props.blok.text}
      </SbLink>
    </li>
  </SbEditable>
);

export default NavItem;
