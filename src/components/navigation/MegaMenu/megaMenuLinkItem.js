import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';

const MegaMenuLinkItem = ({ blok: { link, linkText }, blok }) => (
  <SbEditable content={blok}>
    <li>
      <SbLink link={link}>{linkText}</SbLink>
    </li>
  </SbEditable>
);

export default MegaMenuLinkItem;
