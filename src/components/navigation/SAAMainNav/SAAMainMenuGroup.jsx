/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import UseEscape from '../../../hooks/useEscape';
import UseOnClickOutside from '../../../hooks/useOnClickOutside';
import SbLink from '../../../utilities/sbLink';
import * as styles from './SAAMainMenuGroup.styles';
import { isExpanded } from '../../../utilities/menuHelpers';

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
  childItemClasses,
  panelFacing = 'right',
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const ref = useRef(null);
  const parentRef = useRef(null);

  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  // Close dropdown if escape key is pressed and return focus to the parent item button
  UseEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      setPanelOpened(false);
      parentRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setPanelOpened(false));

  return (
    <li className={styles.root} ref={ref}>
      {parentLink?.url === '' && parentLink?.cached_url === '' ? (
        <button
          type="button"
          onClick={togglePanel}
          aria-expanded={panelOpened}
          ref={parentRef}
          className={styles.parentButton({ panelOpened })}
        >
          {parentText}
        </button>
      ) : (
        <SbLink link={parentLink} classes={styles.topLink}>
          {parentText}
        </SbLink>
      )}
      <ul
        className={styles.childMenu({ panelFacing, panelOpened })}
        aria-hidden={!panelOpened}
      >
        <CreateBloks
          blokSection={childMenuItems}
          className={childItemClasses}
          hasExternalIcon
        />
      </ul>
    </li>
  );
};
SAAMainMenuGroup.propTypes = SAAMainMenuGroupProps;

export default SAAMainMenuGroup;
