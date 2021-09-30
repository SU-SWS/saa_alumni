/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';
import { SBBlokType } from '../../types/storyblok/SBBlokType';

export const UtilityNavProps = {
  menuItems: SBBlokType,
  navClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  menuClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  itemClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ariaLabel: PropTypes.string,
};

const UtilityNav = ({
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
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
