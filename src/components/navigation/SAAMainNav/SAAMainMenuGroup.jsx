/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import UseEscape from '../../../hooks/useEscape';
import UseOnClickOutside from '../../../hooks/useOnClickOutside';

export const SAAMainMenuGroupProps = {
  parentText: PropTypes.string.isRequired,
  parentLink: SBLinkType,
  childMenuItems: PropTypes.array,
  childMenuClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  childItemClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  panelFacing: PropTypes.string,
};

const SAAMainMenuGroup = ({
  parentText,
  parentLink,
  childMenuItems,
  childMenuClasses,
  childItemClasses,
  panelFacing = 'right',
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
