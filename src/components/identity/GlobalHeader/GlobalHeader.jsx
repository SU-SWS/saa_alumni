import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../../layout/FlexBox';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import * as styles from './GlobalHeader.styles';
import CreateBloks from '../../../utilities/createBloks';
import Logo from '../logo';
import OpenSearchModalButton from '../../search/OpenSearchModalButton';
import SbLink from '../../../utilities/sbLink';
import SearchModal from '../../search/SearchModal';
import AlumniLogo from '../../../images/saa-logo-white.svg';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import useDisplay from '../../../hooks/useDisplay';
import SearchModalContext from '../../search/SearchModalContext';

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
}) => {
  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop, showMobile } = useDisplay();
  const { desktopButtonRef, mobileButtonRef } = useContext(SearchModalContext);

  return (
    <>
      {showMobile && (
        <div className={styles.rootMobile}>
          <CreateBloks
            blokSection={utilityNav}
            ariaLabel="Utility Menu"
            navClasses={styles.utilNavMobile}
            menuClasses={styles.utilNavMenuMobile}
            itemClasses={styles.utilNavItemMobile}
          />
          <FlexBox
            className={styles.bodyMobile}
            alignItems="center"
            justifyContent="between"
          >
            <div className={styles.logoWrapperMobile}>
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
            </div>
            <FlexBox>
              <OpenSearchModalButton
                id="mastead-search-openmodal-mobile"
                ref={mobileButtonRef}
              />
              <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
            </FlexBox>
          </FlexBox>
        </div>
      )}
      {showDesktop && (
        <div className={styles.root({ hasHero, isDark })}>
          <FlexBox justifyContent="between" alignItems="start">
            <div className={styles.logoWrapper}>
              <Logo className={styles.logo} />
            </div>
            <div className={styles.utilWrapper}>
              <CreateBloks
                blokSection={utilityNav}
                ariaLabel="Utility Menu"
                navClasses={styles.utilNav}
                menuClasses={styles.utilNavMenu}
                itemClasses={styles.utilNavItem}
              />
              <OpenSearchModalButton
                id="mastead-search-openmodal-desktop"
                ref={desktopButtonRef}
              />
            </div>
          </FlexBox>
          <div className={styles.siteNameWrapper}>
            <SbLink link={siteLink} classes={styles.siteName}>
              {siteName}
            </SbLink>
          </div>
          <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
        </div>
      )}
      <SearchModal />
    </>
  );
};
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
