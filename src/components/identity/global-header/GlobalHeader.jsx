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
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../../contexts/GlobalContext';

export const GlobalHeaderProps = {
  siteName: PropTypes.string,
  siteLink: SBLinkType,
  utilityNav: SBBlokType,
  mainNav: SBBlokType,
  hasHero: PropTypes.bool,
  isDark: PropTypes.bool,
};

const GlobalHeader = ({
  siteName,
  siteLink,
  utilityNav,
  mainNav,
  hasHero,
  isDark,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openSearchRef = useRef(null);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  const handleClose = () => {
    setModalOpen(false);
    openSearchRef.current.focus();
  };

  useEscape(() => {
    // Only do this if the search modal is open
    if (modalOpen) {
      const searchInputModal =
        document.getElementsByClassName('search-input-modal')[0];

      // Only close the modal with Escape key if the autocomplete dropdown is not open
      if (searchInputModal.getAttribute('aria-expanded') !== 'true') {
        setModalOpen(false);
        openSearchRef.current.focus();
      }
    }
  });

  return (
    <>
      {!isDesktop ? (
        <div className={styles.rootMobile}>
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
              id="masthead-search-button-mobile"
              ref={openSearchRef}
            />
            <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
          </FlexBox>
        </div>
      ) : (
        <div className={styles.root({ hasHero, isDark })}>
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
                id="masthead-search-button-desktop"
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
        onClose={handleClose}
      />
    </>
  );
};
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
