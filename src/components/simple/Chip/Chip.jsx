import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import FaIcon from '../faIcon';
import * as styles from './Chip.styles';

const ChipProps = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export const Chip = ({
  className,
  label,
  icon = 'times',
  onClick,
  ...props
}) => (
  <button
    {...props}
    className={dcnb(className, styles.root)}
    type="button"
    onClick={onClick}
  >
    <div className={styles.inner}>
      {label} <FaIcon className={styles.icon} iconChoice={icon} isOutline />
    </div>
  </button>
);
Chip.propTypes = ChipProps;
