/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, FlexBox, FlexCell } from 'decanter-react';
import * as styles from './GlobalHeaderStyles';
import CreateBloks from '../../../utilities/createBloks';
import Logo from '../logo';
import OpenSearchModalButton from '../../search/openSearchModalButton';
import SbLink from '../../../utilities/sbLink';
import SearchModal from '../../search/searchModal';

export const GlobalHeaderProps = {
  utilityNav: PropTypes.array,
  mainNav: PropTypes.array,
  hasHero: PropTypes.bool,
};

const GlobalHeader = ({ siteName, siteLink, utilityNav, mainNav, hasHero }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Container width="full" className={styles.rootMobile}>
        <nav aria-label="Utility Menu" className={styles.utilNavMobile}>
          <ul className={styles.utilNavMobileMenu}>
            <CreateBloks blokSection={utilityNav} />
          </ul>
        </nav>
      </Container>
      <Container className={styles.root}>
        <FlexBox justifyContent="space-between" alignItems="start">
          <FlexCell className={styles.logoWrapper}>
            <Logo className={styles.logo} />
          </FlexCell>
          <FlexCell className="su-flex su-flex-grow su-rs-mt-0">
            <nav aria-label="Utility Menu" className={styles.utilNav}>
              <ul className={styles.utilNavMenu}>
                <CreateBloks
                  blokSection={utilityNav}
                  className={styles.utilNavItem}
                />
              </ul>
            </nav>
            <OpenSearchModalButton
              openOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </FlexCell>
        </FlexBox>
        <div className="su-basefont-23 su-rs-mt-0 su-rs-mb-1">
          <SbLink
            link={siteLink}
            classes="su-text-white su-font-bold hocus:su-text-white su-no-underline hocus:su-no-underline su-text-m3"
          >
            {siteName}
          </SbLink>
        </div>
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
