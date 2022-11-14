import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { MenuIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import Modal from '@mui/material/Modal';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import * as styles from './mainNav.styles';
import AccountLinks from '../accountLinks';
import UserHeaderIcon from '../userHeaderIcon';
import { FlexBox } from '../../layout/FlexBox';

/**
 * This Main Nav is only used on the SAA Homesite
 * For Main Nav used on the subsites, e.g., Travel/Study, please see SAAMainNav
 */

const MainNav = ({
  blok: { mainMenuGroups },
  blok,
  className,
  type = 'default',
}) => {
  const [mainMenuOpened, setMainMenuOpened] = useState(false);
  const [utilityMenuOpen, setUtilityMenuOpen] = useState(false);
  const mainMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMainMenu = () => {
    setMainMenuOpened(!mainMenuOpened);
  };

  const toggleUserMenu = () => {
    setUtilityMenuOpen(!utilityMenuOpen);
  };

  const handleClose = () => {
    if (mainMenuOpened) {
      mainMenuRef.current.focus();
      setMainMenuOpened(false);
    }
    if (utilityMenuOpen) {
      userMenuRef.current.focus();
      setUtilityMenuOpen(false);
    }
  };

  useEscape(() => {
    handleClose();
  });

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
      <nav className="main-nav-mobile lg:su-hidden" aria-label="Main Menu">
        <button
          type="button"
          className={dcnb('su-ml-20', styles.menuCircles)}
          onClick={toggleMainMenu}
          aria-expanded={mainMenuOpened}
          aria-label="Open Main Menu"
          ref={mainMenuRef}
        >
          <MenuIcon aria-hidden="true" className={styles.burgerIconMobile} />
        </button>
      </nav>

      <nav className="main-nav-mobile lg:su-hidden" aria-label="Main Menu">
        <button
          type="button"
          onClick={toggleUserMenu}
          aria-expanded={utilityMenuOpen}
          aria-label="Open User Menu"
          ref={userMenuRef}
          className="su-ml-20 su-rounded-full su-flex"
        >
          <UserHeaderIcon menuCircle />
        </button>
      </nav>

      <Modal
        open={mainMenuOpened || utilityMenuOpen}
        type="main-menu"
        onClose={() => {
          handleClose();
        }}
        aria-labelledby={`Stanford Alumni websites ${
          (mainMenuOpened && 'Main Menu') || (utilityMenuOpen && 'User Menu')
        }`}
      >
        <div>
          <div className={styles.wrapper()}>
            <div>
              <button
                type="button"
                onClick={handleClose}
                className={styles.closeButton({ type })}
                aria-label="Close modal"
              >
                <XIcon className={styles.closeIcon({ type })} aria-hidden />
              </button>
            </div>
          </div>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            className="su-h-[7rem] su-px-30 su-text-20 su-text-white"
          >
            {mainMenuOpened && 'Menu'}
            {utilityMenuOpen && <UserHeaderIcon />}
          </FlexBox>
          {mainMenuOpened && (
            <ul
              className={styles.menuMobileHomesite({ mainMenuOpened })}
              aria-hidden={!mainMenuOpened}
            >
              <CreateBloks blokSection={mainMenuGroups} />
            </ul>
          )}

          {utilityMenuOpen && <AccountLinks />}
        </div>
      </Modal>
    </SbEditable>
  );
};

export default MainNav;
