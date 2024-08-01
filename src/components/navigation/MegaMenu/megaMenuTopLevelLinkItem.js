import React from 'react';
import SbEditable from 'storyblok-react';
import { useLocation } from '@reach/router';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLink.styles';
import * as panelStyles from './megaMenuPanel.styles';

const MegaMenuTopLevelLinkItem = ({ blok: { link, linkText }, blok }) => {
  const location = useLocation();

  // Compare the current browser URL to the link URL to determine if the button is active.
  const browserUrl = new URL(
    location.pathname.replace(/\/+$/, '') + location.hash,
    location.origin
  );
  const linkUrl = link.url || link.cached_url;
  const strippedLink = linkUrl.replace(/\/+$/, '');
  const linkUrlFull = new URL(strippedLink, location.origin);
  if (link.anchor) {
    linkUrlFull.hash = link.anchor;
  }
  const isActiveButton = browserUrl.toString() === linkUrlFull.toString();

  // Return the top level link item.
  return (
    <SbEditable content={blok}>
      <li className="su-float-left su-border-b lg:su-inline-block lg:su-border-none su-border-black-20">
        <SbLink
          link={link}
          classes={[
            panelStyles.parentButton({
              panelOpened: false,
              isActiveButton,
            }),
            'su-no-underline',
          ]}
          hasExternalIcon
          externalIconClasses={styles.externalIcon}
        >
          {linkText}
        </SbLink>
      </li>
    </SbEditable>
  );
};

export default MegaMenuTopLevelLinkItem;
