import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import CreateBloks from '../../utilities/createBloks';
import useEscape from '../../hooks/useEscape';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { isExpanded, isBrowser } from '../../utilities/menuHelpers';
import * as styles from './SAAMainNav/SAAMainMenuGroup.styles';

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const ref = useRef(null);
  const parentRef = useRef(null);

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
    <li className={styles.rootHomesite} ref={ref}>
      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={panelOpened}
        ref={parentRef}
        className={styles.parentButton({ panelOpened, isActiveButton })}
      >
        {parentText}
        {parentTextSecond && (
          <>
            <br className="su-hidden xl:su-inline 2xl:su-hidden" />
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
          className={styles.childMenu({ panelFacing, panelOpened })}
          aria-hidden={!panelOpened}
        >
          <CreateBloks blokSection={menuItems} />
        </ul>
      )}
    </li>
  );
};

export default MainMenuGroup;
