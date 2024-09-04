import React from 'react';

const CenteredContainer = ({
  element,
  centeredDisabled,
  flex,
  srOnly,
  classes,
  children,
}) => {
  const Element = element ?? 'div';

  return (
    <Element
      className={`
       ${centeredDisabled ? '' : 'su-cc'}
       ${flex ? 'flex' : ''}
       ${srOnly ? 'su-sr-only-element' : ''}
       ${classes ?? ''}
  `}
    >
      {children}
    </Element>
  );
};

export default CenteredContainer;
