import React from 'react';

const Heading = ({
  level,
  defaultLevel,
  classes,
  serif,
  weight,
  color,
  align,
  external,
  children,
}) => {
  const HeadingTag = level || defaultLevel || 'h3';

  return (
    <HeadingTag
      className={`
                ${classes || ''}
                ${serif ? 'su-font-serif' : ''}
                ${weight ? `su-font-${weight}` : ''}
                ${color ? `su-text-${color}` : ''}
                ${align ? `su-text-${align}` : ''}
                ${external ? 'su-link--external' : ''}
    `}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;
