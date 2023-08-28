import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLinkGroup.styles';

const MegaMenuLinkItem = ({ blok: { link, linkText }, blok }) => (
  <SbEditable content={blok}>
    <li>
      <SbLink link={link} classes={dcnb(styles.menuLink, 'su-font-normal')}>
        {linkText}
      </SbLink>
    </li>
  </SbEditable>
);

export default MegaMenuLinkItem;
