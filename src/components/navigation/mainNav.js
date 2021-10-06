import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import CreateBloks from '../../utilities/createBloks';
import useEscape from '../../hooks/useEscape';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import * as styles from './SAAMainNav/SAAMainNav.styles';
import { isExpanded } from '../../utilities/menuHelpers';

const MainNav = ({ blok: { mainMenuGroups }, blok, className }) => {
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
  useEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setMenuOpened(false);
      burgerRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setMenuOpened(false));

  return (
    <SbEditable content={blok}>
      <nav
        className={dcnb('main-nav-desktop su-hidden lg:su-block', className)}
        aria-label="Main Menu"
      >
        <ul className="su-hidden lg:su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end su-list-unstyled children:su-mb-0">
          <CreateBloks blokSection={mainMenuGroups} />
        </ul>
      </nav>
      <nav
        className="main-nav-mobile lg:su-hidden"
        aria-label="Main Menu"
        ref={ref}
      >
        <button
          type="button"
          className={styles.burgerMobileHomesite}
          onClick={toggleMenu}
          aria-expanded={menuOpened}
          aria-label={menuOpened ? 'Close Menu' : 'Open Menu'}
          ref={burgerRef}
        >
          <NavIcon aria-hidden="true" className={styles.burgerIconMobile} />
          {menuOpened ? 'Close' : 'Menu'}
        </button>
        <ul
          className={styles.menuMobileHomesite({ menuOpened })}
          aria-hidden={!menuOpened}
        >
          <CreateBloks blokSection={mainMenuGroups} />
        </ul>
      </nav>
    </SbEditable>
  );
};

export default MainNav;
