import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLinkItem.styles';

const MegaMenuLinkItem = ({ blok: { link, linkText }, blok }) => (
  <SbEditable content={blok}>
    <li className="su-rs-mb-0">
      <SbLink
        link={link}
        classes={styles.menuLink}
        hasExternalIcon
        externalIconClasses={styles.externalIcon}
      >
        {linkText}
      </SbLink>
    </li>
  </SbEditable>
);

export default MegaMenuLinkItem;
