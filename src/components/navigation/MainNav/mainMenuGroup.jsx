import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { isExpanded, isBrowser } from '../../../utilities/menuHelpers';
import * as styles from './mainMenuGroup.styles';
import { NavItemType } from '../../../types/NavItemType';
import { ModalContext } from '../../layout/Modal/ModalContext';

// SAA Homesite Main Menu Group
export const MainMenuGroupProps = {
  parentText: PropTypes.string,
  parentTextSecond: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.shape(NavItemType)),
  panelFacing: PropTypes.string,
};

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
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
    for (let i = 0; i < menuItems.length; i += 1) {
      if (browserUrl.includes(menuItems[i].link?.cached_url)) {
        isActiveButton = true;
      }
    }
  }

  return (
    <li className={styles.root({ isHomesite: true })} ref={ref}>
      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={panelOpened}
        ref={parentRef}
        className={styles.parentButton({
          panelOpened,
          isActiveButton,
          isHomesite: true,
        })}
      >
        {parentText}
        {parentTextSecond && (
          <>
            <br className={styles.parentTextLinebreak} />
            {parentTextSecond}
          </>
        )}
        <ChevronDownIcon
          className={styles.chevron({ panelOpened, isActiveButton })}
          aria-hidden="true"
        />
      </button>
      {menuItems && menuItems.length > 0 && (
        <ul
          className={styles.childMenu({
            panelFacing,
            panelOpened,
            isHomesite: true,
          })}
          aria-hidden={!panelOpened}
        >
          <CreateBloks blokSection={menuItems} isHomesite />
        </ul>
      )}
    </li>
  );
};
MainMenuGroup.propTypes = MainMenuGroupProps;

export default MainMenuGroup;
