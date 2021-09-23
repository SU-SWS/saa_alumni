import React from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from 'decanter-react';
import * as styles from './GlobalHeaderStyles';

export const GlobalHeaderProps = {
  utilityNav: PropTypes.element,
  mainNav: PropTypes.element,
};

const GlobalHeader = ({ utilityNav, mainNav }) => {
  return (
    <FlexBox className={styles.root}>
      test
    </FlexBox>
  );
};
GlobalHeader.propTypes = GlobalHeaderProps;

export default GlobalHeader;
