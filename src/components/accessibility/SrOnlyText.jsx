import React from 'react';
import PropTypes from 'prop-types';

const SrOnlyTextProps = {
  children: PropTypes.node.isRequired,
};

export const SrOnlyText = ({ children = '(link is external)' }) => (
  <span className="su-sr-only">{children}</span>
);
SrOnlyText.propTypes = SrOnlyTextProps;
