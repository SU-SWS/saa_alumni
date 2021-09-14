import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialIconLink = ({ srText, icon, size, ...props }) => (
  <a {...props}>
    <SrOnlyText srText={srText} />
    <FontAwesomeIcon icon={icon} size={size} aria-hidden="true" />
  </a>
);

export default SocialIconLink;
