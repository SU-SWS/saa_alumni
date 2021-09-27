/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';

export const SAAMainMenuGroupProps = {
  parentText: PropTypes.string.isRequired,
  parentLink: SBLinkType,
  childMenuItems: PropTypes.array,
  childMenuClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  childItemClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const SAAMainMenuGroup = ({
  parentText,
  parentLink,
  childMenuItems,
  childMenuClasses,
  childItemClasses,
}) => (
  <li>
    <button type="button">{parentText}</button>
    <ul className={childMenuClasses}>
      <CreateBloks
        blokSection={childMenuItems}
        className={childItemClasses}
        hasExternalIcon
      />
    </ul>
  </li>
);
SAAMainMenuGroup.propTypes = SAAMainMenuGroupProps;

export default SAAMainMenuGroup;
