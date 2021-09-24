import React from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from 'decanter-react';
import * as styles from './UtilityNavStyles';
import CreateBloks from '../../../utilities/createBloks';

export const UtilityNavProps = {
  // eslint-disable-next-line react/forbid-prop-types
  menuItems: PropTypes.array,
};

const UtilityNav = ({ menuItems }) => (
  <CreateBloks
    blokSection={menuItems}
    hasExternalIcon
    className="su-list-unstyled children:su-font-regular children:su-text-white children:hocus:su-text-white children:su-no-underline"
  />
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
