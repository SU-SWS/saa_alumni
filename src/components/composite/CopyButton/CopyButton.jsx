import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useClipboard from 'react-use-clipboard';
import { SAAButton } from '../../simple/SAAButton';
import { ClassNameType } from '../../../types/CommonType';

/**
 * This components extends all of the decanter-react props
 */
export const CopyButtonProps = {
  /**
   * The text to be copied on click
   */
  copyText: PropTypes.string.isRequired,
  /**
   * How long to display copy success message
   */
  successDuration: PropTypes.number,
  /**
   * Copy success message
   */
  copySuccess: PropTypes.node,
  variant: PropTypes.oneOf(['link', 'button']),
  className: ClassNameType,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const CopyButton = ({
  copyText,
  successDuration = 5000,
  copySuccess = 'Link copied!',
  variant = 'button',
  children,
  className,
  onClick = () => undefined,
  ...rest
}) => {
  const [copied, copy] = useClipboard(copyText, { successDuration });
  const handleClick = useCallback(
    (...params) => {
      copy();
      onClick(...params);
    },
    [copy, onClick]
  );

  let buttonVariant = 'link';
  if (variant === 'button') {
    buttonVariant = copied ? 'secondary-gradient' : 'secondary';
  }

  return (
    <SAAButton
      aria-live="polite"
      size={variant === 'button' ? 'small-short' : 'link'}
      icon={variant === 'link' && copied ? 'none' : 'arrow-right'}
      buttonStyle={buttonVariant}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {copied ? copySuccess : children}
    </SAAButton>
  );
};
