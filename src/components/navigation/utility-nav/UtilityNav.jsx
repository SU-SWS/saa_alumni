import React from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from 'decanter-react';
import * as styles from './UtilityNavStyles';
import CreateBloks from '../../../utilities/createBloks';

export const UtilityNavProps = {
  menuItems: PropTypes.element,
};

const UtilityNav = ({ menuItems }) => (
  <FlexBox className={styles.root}>
    <CreateBloks
      blokSection={menuItems}
      hasExternalIcon
      className="su-list-unstyled"
    />
  </FlexBox>
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
