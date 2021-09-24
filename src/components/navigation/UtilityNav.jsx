import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';

export const UtilityNavProps = {
  // eslint-disable-next-line react/forbid-prop-types
  menuItems: PropTypes.array,
};

const UtilityNav = ({ menuItems }) => (
  <CreateBloks blokSection={menuItems} hasExternalIcon />
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
