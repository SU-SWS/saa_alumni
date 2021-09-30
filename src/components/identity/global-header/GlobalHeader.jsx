/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, FlexBox, FlexCell } from 'decanter-react';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import * as styles from './GlobalHeaderStyles';
import CreateBloks from '../../../utilities/createBloks';
import Logo from '../logo';
import OpenSearchModalButton from '../../search/openSearchModalButton';
import SbLink from '../../../utilities/sbLink';
import SearchModal from '../../search/searchModal';
import AlumniLogo from '../../../images/saa-logo-white.svg';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';

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

  return (
    <>
      <Container width="full" className={styles.rootMobile}>
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
          />
          <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
        </FlexBox>
      </Container>

      <Container className={styles.root({ hasHero, isDark })}>
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
            />
          </FlexCell>
        </FlexBox>
        <div className={styles.siteNameWrapper}>
          <SbLink link={siteLink} classes={styles.siteName}>
            {siteName}
          </SbLink>
        </div>
        <CreateBloks blokSection={mainNav} ariaLabel="Main Menu" />
      </Container>

      <SearchModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
