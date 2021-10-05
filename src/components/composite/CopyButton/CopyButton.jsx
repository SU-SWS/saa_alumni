import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'decanter-react';
import useClipboard from 'react-use-clipboard';

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
   * TODO: Display in toast message or whatever design decides
   */
  copySuccess: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const CopyButton = ({
  copyText,
  successDuration = 5000,
  copySuccess = 'Copied!',
  children,
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

  // TODO: This is temporary until toast is implemented
  useEffect(() => {
    if (copied) console.log(copySuccess);
  }, [copied, copySuccess]);

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
};
