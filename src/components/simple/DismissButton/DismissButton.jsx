import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { XCircleIcon, XIcon } from '@heroicons/react/solid';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import * as styles from './DismissButton.styles';
import { ClassNameType } from '../../../types/CommonType';

const DismissButtonProps = {
  text: PropTypes.string,
  srText: PropTypes.string,
  color: PropTypes.oneOf(['black', 'white']),
  icon: PropTypes.oneOf(['x-circle', 'x']),
  iconSize: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  className: ClassNameType,
};

export const DismissButton = React.forwardRef((props, ref) => {
  const {
    text,
    srText,
    color = 'black',
    icon,
    iconSize = 20,
    iconClass,
    onClick,
    className,
    ...rest
  } = props;

  let Icon;
  if (icon) {
    Icon = icon === 'x' ? XIcon : XCircleIcon;
  }

  return (
    <button
      type="button"
      className={dcnb(styles.root({ color }), className)}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {text}
      {srText && <SrOnlyText>{` ${srText}`}</SrOnlyText>}
      {icon && (
        <Icon
          aria-hidden="true"
          height={iconSize}
          width={iconSize}
          className={iconClass}
        />
      )}
    </button>
  );
});
DismissButton.propTypes = DismissButtonProps;
