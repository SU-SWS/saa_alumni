import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import FaIcon from '../faIcon';
import * as styles from './FilterCheckbox.styles';

export const FilterCheckboxPropTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

// NOTE: This will likely need some a11y massaging
export const FilterCheckbox = ({ className, label, onChange, checked }) => (
  <div className={dcnb(className, styles.root({ checked }))}>
    <label className={styles.label}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <div className={styles.icon({ checked })} aria-hidden>
        <FaIcon iconChoice="check" isOutline />
      </div>
      <div>{label}</div>
    </label>
  </div>
);
FilterCheckbox.propTypes = FilterCheckboxPropTypes;
