/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';
import { SBBlokType } from '../../types/storyblok/SBBlokType';
import { ClassNameType } from '../../types/CommonType';
import AccountLinks from './accountLinks';

export const UtilityNavProps = {
  menuItems: SBBlokType,
  navClasses: ClassNameType,
  menuClasses: ClassNameType,
  itemClasses: ClassNameType,
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
      <AccountLinks />
    </ul>
  </nav>
);
UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
