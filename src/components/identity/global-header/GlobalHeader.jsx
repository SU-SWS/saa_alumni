/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'decanter-react';
import * as styles from './GlobalHeaderStyles';
import CreateStories from '../../../utilities/createStories';

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
          <CreateStories stories={utilityNav} />
        </ul>
      </nav>
    </Container>
    <Container width="full" className={styles.root}>
      <nav aria-label="Utility Menu" className="su-bg-digital-red">
        <CreateStories stories={utilityNav} />
      </nav>
    </Container>
  </>
);
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
