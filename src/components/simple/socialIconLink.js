import React from 'react';
import FaIcon from './faIcon';

const SocialIconLink = ({ srText, icon, size, ...props }) => (
  <a {...props}>
    <FaIcon iconChoice={icon} iconType="fab" size={size} srText={srText} />
  </a>
);

export default SocialIconLink;
