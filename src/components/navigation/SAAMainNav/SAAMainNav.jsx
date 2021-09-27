/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';

export const SAAMainNavProps = {
  menuItems: PropTypes.array,
  navClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  menuClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  itemClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ariaLabel: PropTypes.string,
};

const SAAMainNav = ({
  menuItems,
  navClasses,
  menuClasses,
  itemClasses,
  ariaLabel,
}) => (
  <nav aria-label={ariaLabel} className={navClasses}>
    <ul className={menuClasses}>
      <CreateBloks
        blokSection={menuItems}
        className={itemClasses}
        hasExternalIcon
      />
    </ul>
  </nav>
);
SAAMainNav.propTypes = SAAMainNavProps;

export default SAAMainNav;
