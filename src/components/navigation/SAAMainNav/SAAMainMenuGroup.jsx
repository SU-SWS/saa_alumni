/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import UseEscape from '../../../hooks/useEscape';
import UseOnClickOutside from '../../../hooks/useOnClickOutside';
import SbLink from '../../../utilities/sbLink';
import * as styles from './SAAMainMenuGroup.styles';
import { isExpanded, isBrowser } from '../../../utilities/menuHelpers';

export const SAAMainMenuGroupProps = {
  parentText: PropTypes.string.isRequired,
  parentLink: SBLinkType,
  childMenuItems: PropTypes.array,
  panelFacing: PropTypes.string,
};

const SAAMainMenuGroup = ({
  parentText,
  parentLink,
  childMenuItems,
  panelFacing = 'right',
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const ref = useRef(null);
  const parentRef = useRef(null);

  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  // Close dropdown if escape key is pressed and return focus to the parent item button
  UseEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      setPanelOpened(false);
      parentRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setPanelOpened(false));

  let isActiveButton;

  if (isBrowser) {
    const browserUrl = window.location.href;

    // Loop through children menu items and add active styles to parent button if any childrem items are active
    for (let i = 0; i < childMenuItems.length; i += 1) {
      if (browserUrl.includes(childMenuItems[i].link?.cached_url)) {
        isActiveButton = true;
      }
    }
  }

  return (
    <li className={styles.rootSAA} ref={ref}>
      {parentLink?.url === '' && parentLink?.cached_url === '' ? (
        <button
          type="button"
          onClick={togglePanel}
          aria-expanded={panelOpened}
          ref={parentRef}
          className={styles.parentButton({ panelOpened, isActiveButton })}
        >
          {parentText}
          <ChevronDownIcon
            className={styles.chevron({ panelOpened, isActiveButton })}
            aria-hidden="true"
          />
        </button>
      ) : (
        <SbLink
          link={parentLink}
          classes={styles.topLink}
          activeClass={styles.activeTopLink}
          externalIconClasses={styles.topLinkIcon}
          hasExternalIcon
        >
          {parentText}
        </SbLink>
      )}
      <ul
        className={styles.childMenu({ panelFacing, panelOpened })}
        aria-hidden={!panelOpened}
      >
        <CreateBloks blokSection={childMenuItems} hasExternalIcon />
      </ul>
    </li>
  );
};
SAAMainMenuGroup.propTypes = SAAMainMenuGroupProps;

export default SAAMainMenuGroup;
