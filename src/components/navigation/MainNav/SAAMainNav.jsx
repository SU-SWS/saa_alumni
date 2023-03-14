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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const mainMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMainMenu = () => {
    setMainMenuOpened(!mainMenuOpened);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleClose = () => {
    if (mainMenuOpened) {
      mainMenuRef.current.focus();
      setMainMenuOpened(false);
    }
    if (userMenuOpen) {
      userMenuRef.current.focus();
      setUserMenuOpen(false);
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
      <button
        type="button"
        className={dcnb(
          'saa-main-nav-mobile su-ml-20',
          styles.rootMobile,
          styles.menuCircles
        )}
        onClick={toggleMainMenu}
        aria-expanded={mainMenuOpened}
        aria-label="Open Main Menu"
        ref={mainMenuRef}
      >
        <MenuIcon aria-hidden="true" className={styles.burgerIconMobile} />
      </button>
      <button
        type="button"
        onClick={toggleUserMenu}
        aria-expanded={setUserMenuOpen}
        aria-label="Open User Menu"
        ref={userMenuRef}
        className="main-nav-mobile lg:su-hidden su-ml-20 su-rounded-full su-flex"
      >
        <UserHeaderIcon menuCircle />
      </button>

      <Modal
        isOpen={mainMenuOpened || userMenuOpen}
        onClose={() => {
          handleClose();
        }}
        type={userMenuOpen ? 'main-menu' : 'default'}
        ariaLabel={`Stanford Alumni websites ${
          (mainMenuOpened && 'Main Menu') || (userMenuOpen && 'User Menu')
        }`}
      >
        <nav
          aria-label={
            (mainMenuOpened && 'Main Menu') || (userMenuOpen && 'User Menu')
          }
        >
          {mainMenuOpened && (
            <FlexBox
              alignItems="center"
              justifyContent="center"
              className="su-h-[7rem] su-px-30 su-text-20 su-text-white"
            >
              Menu
            </FlexBox>
          )}
          {mainMenuOpened && (
            <ul
              className={styles.menuMobileSAA({ mainMenuOpened })}
              aria-hidden={!mainMenuOpened}
            >
              <CreateBloks blokSection={menuItems} />
            </ul>
          )}

          {userMenuOpen && (
            <ul className="su-list-none su-p-0">
              <AccountLinks />
            </ul>
          )}
        </nav>
      </Modal>
    </>
  );
};
SAAMainNav.propTypes = SAAMainNavProps;

export default SAAMainNav;
