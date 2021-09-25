/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';

export const UtilityNavProps = {
  menuItems: PropTypes.array,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const UtilityNav = ({ menuItems, className }) => (
  <CreateBloks blokSection={menuItems} className={className} hasExternalIcon />
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
