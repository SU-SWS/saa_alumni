import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlexBox, FlexCell } from 'decanter-react';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import * as styles from './GlobalHeader.styles';
import CreateBloks from '../../../utilities/createBloks';
import Logo from '../logo';
import OpenSearchModalButton from '../../search/openSearchModalButton';
import SbLink from '../../../utilities/sbLink';
import SearchModal from '../../search/searchModal';
import AlumniLogo from '../../../images/saa-logo-white.svg';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import useEscape from '../../../hooks/useEscape';
import useDisplay from '../../../hooks/useDisplay';

export const GlobalHeaderProps = {
  siteName: PropTypes.string,
  siteLink: SBLinkType,
  utilityNav: SBBlokType,
  mainNav: SBBlokType,
  hasHero: PropTypes.bool,
  isDark: PropTypes.bool,
  searchPageUrl: SBLinkType,
};

const GlobalHeader = ({
  siteName,
  siteLink,
  utilityNav,
  mainNav,
  hasHero,
  isDark,
  searchPageUrl,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const openSearchRef = useRef(null);
  const openSearchMobileRef = useRef(null);

  const returnFocus = () => {
    if (openSearchRef.current) {
      openSearchRef.current.focus();
    } else if (openSearchMobileRef.current) {
      openSearchMobileRef.current.focus();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    returnFocus();
  };

  useEscape(() => {
    // Only do this if the search modal is open
    if (modalOpen) {
      const searchInputModal =
        document.getElementsByClassName('search-input-modal')[0];

      // Only close the modal with Escape key if the autocomplete dropdown is not open
      if (searchInputModal.getAttribute('aria-expanded') !== 'true') {
        setModalOpen(false);
        returnFocus();
      }
    }
  });

  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop, showMobile } = useDisplay();

  return (
    <>
      {showMobile && (
        <div className={styles.rootMobile} ref={mobileRef}>
          <CreateBloks
            blokSection={utilityNav}
            ariaLabel="Utility Menu"
            navClasses={styles.utilNavMobile}
            menuClasses={styles.utilNavMenuMobile}
            itemClasses={styles.utilNavItemMobile}
          />
          <FlexBox className={styles.bodyMobile} alignItems="center">
            <FlexCell className={styles.logoWrapperMobile}>
              <SbLink link={siteLink} classes={styles.logoMobile}>
                <img
                  src={AlumniLogo}
                  className={styles.logoImageMobile}
                  alt="Stanford Alumni Association"
                  width="110"
                  height="16"
                />
                {siteName}
              </SbLink>
            </FlexCell>
            <OpenSearchModalButton
              openOpen={modalOpen}
              setModalOpen={setModalOpen}
              ref={openSearchMobileRef}
            />
            <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
          </FlexBox>
        </div>
      )}
      {showDesktop && (
        <div className={styles.root({ hasHero, isDark })} ref={desktopRef}>
          <FlexBox justifyContent="space-between" alignItems="start">
            <FlexCell className={styles.logoWrapper}>
              <Logo className={styles.logo} />
            </FlexCell>
            <FlexCell className={styles.utilWrapper}>
              <CreateBloks
                blokSection={utilityNav}
                ariaLabel="Utility Menu"
                navClasses={styles.utilNav}
                menuClasses={styles.utilNavMenu}
                itemClasses={styles.utilNavItem}
              />
              <OpenSearchModalButton
                openOpen={modalOpen}
                setModalOpen={setModalOpen}
                ref={openSearchRef}
              />
            </FlexCell>
          </FlexBox>
          <div className={styles.siteNameWrapper}>
            <SbLink link={siteLink} classes={styles.siteName}>
              {siteName}
            </SbLink>
          </div>
          <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
        </div>
      )}
      <SearchModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        searchPageUrl={searchPageUrl}
        onClose={handleClose}
      />
    </>
  );
};
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
