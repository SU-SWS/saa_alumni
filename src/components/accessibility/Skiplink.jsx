import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { ClassNameType } from '../../types/CommonType';

const SkiplinkProps = {
  anchorLink: PropTypes.string,
  children: PropTypes.string,
  className: ClassNameType,
};

export const Skiplink = ({
  anchorLink = '#main-content',
  children = 'Skip to main content',
  className,
  ...props
}) => {
  const ref = useRef(null);
  return (
    <a
      href={anchorLink}
      className={dcnb('su-skiplink', className)}
      ref={ref}
      onFocus={() => ref.current.scrollIntoView()}
      {...props}
    >
      {children}
    </a>
  );
};
Skiplink.propTypes = SkiplinkProps;
