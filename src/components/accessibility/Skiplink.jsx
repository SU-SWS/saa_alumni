import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';

const SkiplinkProps = {
  anchorLink: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const Skiplink = ({
  anchorLink = '#main-content',
  children = 'Skip to main content',
  className,
  ...props
}) => (
  <a href={anchorLink} className={dcnb('su-skiplink', className)} {...props}>
    {children}
  </a>
);
Skiplink.propTypes = SkiplinkProps;
