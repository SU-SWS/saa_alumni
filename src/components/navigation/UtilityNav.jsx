/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../utilities/createBloks';
import { SBBlokType } from '../../types/storyblok/SBBlokType';
import { ClassNameType } from '../../types/CommonType';
import AccountLinks from './accountLinks';
import useDisplay from '../../hooks/useDisplay';

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
}) => {
  const { showDesktop } = useDisplay('lg');

  return (
    <nav aria-label={ariaLabel} className={navClasses}>
      <ul className={menuClasses}>
        <CreateBloks
          blokSection={menuItems}
          className={`${itemClasses} children:su-font-normal`}
          hasExternalIcon
        />
        {showDesktop && <AccountLinks mainLinkClasses={itemClasses} />}
      </ul>
    </nav>
  );
};

UtilityNav.propTypes = UtilityNavProps;

export default UtilityNav;
