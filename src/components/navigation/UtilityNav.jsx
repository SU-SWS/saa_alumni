import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';

export const UtilityNavProps = {
  // eslint-disable-next-line react/forbid-prop-types
  menuItems: PropTypes.array,
  className: PropTypes.string,
};

const UtilityNav = ({ menuItems, className }) => (
  <CreateBloks blokSection={menuItems} className={className} hasExternalIcon />
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
