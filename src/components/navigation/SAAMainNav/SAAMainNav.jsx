/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import CreateBloks from '../../../utilities/createBloks';
import UseEscape from '../../../hooks/useEscape';
import UseOnClickOutside from '../../../hooks/useOnClickOutside';
import * as styles from './SAAMainNav.styles';
import { isExpanded } from '../../../utilities/menuHelpers';

export const SAAMainNavProps = {
  menuItems: PropTypes.array,
  ariaLabel: PropTypes.string,
};

const SAAMainNav = ({ menuItems, ariaLabel }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  let NavIcon = MenuIcon;
  if (menuOpened) {
    NavIcon = XIcon;
  }

  // Close menu if escape key is pressed and return focus to the menu button
  UseEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setMenuOpened(false);
      burgerRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setMenuOpened(false));

  return (
    <>
      <nav
        aria-label={ariaLabel}
        className={dcnb('saa-main-nav-desktop', styles.root)}
      >
        <ul className={styles.menu}>
          <CreateBloks blokSection={menuItems} hasExternalIcon />
        </ul>
      </nav>
      <nav
        className={dcnb('saa-main-nav-mobile', styles.rootMobile)}
        aria-label={ariaLabel}
        ref={ref}
      >
        <button
          type="button"
          className={styles.burgerMobile}
          onClick={toggleMenu}
          aria-expanded={menuOpened}
          aria-label={menuOpened ? 'Close Menu' : 'Open Menu'}
          ref={burgerRef}
        >
          <NavIcon aria-hidden="true" className={styles.burgerIconMobile} />
          {menuOpened ? 'Close' : 'Menu'}
        </button>
        <ul
          className={styles.menuMobile({ menuOpened })}
          aria-hidden={!menuOpened}
        >
          <CreateBloks blokSection={menuItems} />
        </ul>
      </nav>
    </>
  );
};
SAAMainNav.propTypes = SAAMainNavProps;

export default SAAMainNav;
