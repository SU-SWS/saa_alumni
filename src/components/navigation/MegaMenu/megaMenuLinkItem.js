import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLink.styles';

const MegaMenuLinkItem = ({ blok: { link, linkText }, blok }) => {
  const processedLink =
    link?.url || link?.cached_url
      ? link
      : { ...link, cached_url: 'home', linktype: 'story' };

  return (
    <SbEditable content={blok}>
      <li className="su-rs-mb-0">
        <SbLink
          link={processedLink}
          classes={styles.menuLink}
          hasExternalIcon
          externalIconClasses={styles.externalIcon}
        >
          {linkText}
        </SbLink>
      </li>
    </SbEditable>
  );
};

export default MegaMenuLinkItem;
