import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { MenuIcon } from '@heroicons/react/outline';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import * as styles from './megaMenu.styles';
import { Heading } from '../../simple/Heading';
import Modal from '../../layout/Modal/Modal';
import AccountLinks from '../accountLinks';
import UserHeaderIcon from '../userHeaderIcon';
import { FlexBox } from '../../layout/FlexBox';

/**
 * This Mega Menu Nav is only used on the SAA Homesite
 * For Main Nav used on the subsites, e.g., Travel/Study, please see SAAMainNav
 */
const MegaMenu = ({ blok: { topLevelLinks }, blok, className }) => {
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

  // Just for the top level, change the component to the top level component.
  // Look at the top level links and find the link component. Change the
  // component to the top level component.
  topLevelLinks.forEach((element, i) => {
    if (element.component === 'megaMenuLinkItem') {
      // eslint-disable-next-line no-param-reassign
      topLevelLinks[i].component = 'megaMenuTopLevelLinkItem';
    }
  });

  useEscape(() => {
    handleClose();
  });

  return (
    <SbEditable content={blok}>
      <nav
        className={dcnb('main-nav-desktop su-hidden lg:su-block', className)}
        aria-label="Main Navigation Menu"
      >
        <ul className="su-hidden lg:su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end lg:su-justify-end su-list-unstyled children:su-mb-0">
          <CreateBloks blokSection={topLevelLinks} />
        </ul>
      </nav>
      <button
        type="button"
        ref={mainMenuRef}
        className={dcnb('su-ml-20', styles.rootMobile, styles.menuCircles)}
        onClick={toggleMainMenu}
        aria-expanded={mainMenuOpened}
        aria-label="Open Main Menu"
      >
        <MenuIcon aria-hidden="true" className={styles.burgerIconMobile} />
      </button>

      <button
        type="button"
        ref={userMenuRef}
        onClick={toggleUserMenu}
        aria-expanded={userMenuOpen}
        aria-label="Open User Menu"
        className="lg:su-hidden su-ml-20 su-rounded-full su-flex"
      >
        <UserHeaderIcon menuCircle />
      </button>
      <Modal
        isOpen={mainMenuOpened || userMenuOpen}
        type={mainMenuOpened ? 'mega-menu' : 'main-menu'}
        onClose={() => {
          handleClose();
        }}
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
              className="su-h-70 su-px-30 su-text-20 su-bg-white"
            >
              <Heading size="base" weight="regular" className="su-mb-0">
                Menu
              </Heading>
            </FlexBox>
          )}
          {mainMenuOpened && (
            <ul
              className={styles.menuMobileHomesite({ mainMenuOpened })}
              aria-hidden={!mainMenuOpened}
            >
              <CreateBloks blokSection={topLevelLinks} />
            </ul>
          )}

          {userMenuOpen && (
            <ul className="su-list-none su-p-0">
              <AccountLinks />
            </ul>
          )}
        </nav>
      </Modal>
    </SbEditable>
  );
};

export default MegaMenu;
