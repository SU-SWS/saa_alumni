import React, { useState, useRef, useContext, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import useEscape from '../../../hooks/useEscape';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import SbLink from '../../../utilities/sbLink';
import * as styles from './mainMenuGroup.styles';
import { isExpanded, isBrowser } from '../../../utilities/menuHelpers';
import { NavItemType } from '../../../types/NavItemType';
import { ModalContext } from '../../layout/Modal/ModalContext';

// Main Menu Group for the shared SAA Main Nav
export const SAAMainMenuGroupProps = {
  parentText: PropTypes.string.isRequired,
  parentLink: SBLinkType,
  childMenuItems: PropTypes.arrayOf(PropTypes.shape(NavItemType)),
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
  const { setUpdateModal } = useContext(ModalContext);

  useEffect(() => {
    if (setUpdateModal) {
      setUpdateModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelOpened]);

  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  // Close dropdown if escape key is pressed and return focus to the parent item button
  useEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      setPanelOpened(false);
      parentRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setPanelOpened(false));

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
    <li className={styles.root({ isHomesite: false })} ref={ref}>
      {parentLink?.url === '' && parentLink?.cached_url === '' ? (
        <button
          type="button"
          onClick={togglePanel}
          aria-expanded={panelOpened}
          ref={parentRef}
          className={styles.parentButton({
            panelOpened,
            isActiveButton,
            isHomsite: false,
          })}
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
      {childMenuItems && childMenuItems.length > 0 && (
        <ul
          className={styles.childMenu({
            panelFacing,
            panelOpened,
            isHomesite: false,
          })}
          aria-hidden={!panelOpened}
        >
          <CreateBloks blokSection={childMenuItems} hasExternalIcon />
        </ul>
      )}
    </li>
  );
};
SAAMainMenuGroup.propTypes = SAAMainMenuGroupProps;

export default SAAMainMenuGroup;
