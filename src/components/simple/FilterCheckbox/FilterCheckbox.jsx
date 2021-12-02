import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { CheckIcon } from '@heroicons/react/solid';
import * as styles from './FilterCheckbox.styles';

export const FilterCheckboxPropTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  count: PropTypes.number,
  isScrollIntoView: PropTypes.bool,
};

export const FilterCheckbox = ({
  className,
  label,
  onChange,
  checked,
  count,
  isScrollIntoView,
}) => {
  const inputRef = useRef(null);
  return (
    <div className={dcnb(className, styles.root({ checked }))}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.input}
          ref={inputRef}
          onFocus={() =>
            isScrollIntoView ? inputRef.current.scrollIntoView() : null
          }
        />
        <div className={styles.icon({ checked })} aria-hidden>
          <CheckIcon aria-hidden />
        </div>
        <div>
          {label}
          {count && <span className={styles.count}> ({count})</span>}
        </div>
      </label>
    </div>
  );
};
FilterCheckbox.propTypes = FilterCheckboxPropTypes;
