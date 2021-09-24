/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, FlexBox, FlexCell } from 'decanter-react';
import * as styles from './GlobalHeaderStyles';
import CreateBloks from '../../../utilities/createBloks';
import Logo from '../logo';
import OpenSearchModalButton from '../../search/openSearchModalButton';

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
    <Container className={styles.root}>
      <FlexBox justifyContent="space-between" alignItems="center">
        <FlexCell className="su-w-fit su-px-16 su-pt-12 su-pb-10 su-bg-cardinal-red">
          <Logo className="su-w-[13rem] xl:su-w-[16.5rem]" />
        </FlexCell>
        <FlexCell>
          <nav aria-label="Utility Menu" className={styles.utilNav}>
            <ul className={styles.utilNavMenu}>
              <CreateBloks blokSection={utilityNav} />
            </ul>
          </nav>
          <OpenSearchModalButton />
        </FlexCell>
      </FlexBox>
    </Container>
  </>
);
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
