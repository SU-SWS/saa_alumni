/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { MenuIcon } from '@heroicons/react/outline';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import * as styles from './mainNav.styles';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import Modal from '../../layout/Modal/Modal';
import AccountLinks from '../accountLinks';
import UserHeaderIcon from '../userHeaderIcon';
import { FlexBox } from '../../layout/FlexBox';

/**
 * This Main Nav is only used on the SAA subsites such as Travel/Study
 * For Main Nav used on the SAA Homesite, please see the mainNav component
 */

export const SAAMainNavProps = {
  menuItems: SBBlokType,
  ariaLabel: PropTypes.string,
};

const SAAMainNav = ({ menuItems, ariaLabel }) => {
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
      >
        <button
          type="button"
          className={dcnb('su-ml-20', styles.menuCircles)}
          onClick={toggleMainMenu}
          aria-expanded={mainMenuOpened}
          aria-label={mainMenuOpened ? 'Close Main Menu' : 'Open Main Menu'}
          ref={mainMenuRef}
        >
          <MenuIcon aria-hidden="true" className={styles.burgerIconMobile} />
        </button>
      </nav>

      <nav className="main-nav-mobile lg:su-hidden" aria-label="Main Menu">
        <button
          type="button"
          onClick={toggleUserMenu}
          aria-expanded={setUtilityMenuOpen}
          aria-label="Open User Menu"
          ref={userMenuRef}
          className="su-ml-20 su-rounded-full su-flex"
        >
          <UserHeaderIcon menuCircle />
        </button>
      </nav>

      <Modal
        isOpen={mainMenuOpened || utilityMenuOpen}
        onClose={() => {
          handleClose();
        }}
        ariaLabel={`Stanford Alumni websites ${
          (mainMenuOpened && 'Main Menu') || (utilityMenuOpen && 'User Menu')
        }`}
      >
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
            className={styles.menuMobileSAA({ mainMenuOpened })}
            aria-hidden={!mainMenuOpened}
          >
            <CreateBloks blokSection={menuItems} />
          </ul>
        )}

        {utilityMenuOpen && (
          <AccountLinks mainLinkClasses={styles.utilNavItem} />
        )}
      </Modal>
    </>
  );
};
SAAMainNav.propTypes = SAAMainNavProps;

export default SAAMainNav;
