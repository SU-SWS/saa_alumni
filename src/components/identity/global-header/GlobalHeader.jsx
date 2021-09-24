/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'decanter-react';
import * as styles from './GlobalHeaderStyles';
import CreateBloks from '../../../utilities/createBloks';

export const GlobalHeaderProps = {
  utilityNav: PropTypes.array,
  mainNav: PropTypes.array,
  hasHero: PropTypes.bool,
};

const GlobalHeader = ({ utilityNav, mainNav, hasHero }) => (
  <>
    <Container width="full" className={styles.rootMobile}>
      <nav aria-label="Utility Menu" className={styles.utilNavMobile}>
        <ul className={styles.utilNavMobileMenu}>
          <CreateBloks blokSection={utilityNav} />
        </ul>
      </nav>
    </Container>
    <Container width="full" className={styles.root}>
      <nav aria-label="Utility Menu" className={styles.utilNav}>
        <ul className={styles.utilNavMenu}>
          <CreateBloks blokSection={utilityNav} />
        </ul>
      </nav>
    </Container>
  </>
);
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
