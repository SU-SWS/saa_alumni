import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SrOnlyText } from '../accessibility/SrOnlyText';

const SocialIconLink = ({ srText, icon, size, ...props }) => (
  <a {...props}>
    <SrOnlyText>SrText</SrOnlyText>
    <FontAwesomeIcon icon={icon} size={size} aria-hidden="true" />
  </a>
);

export default SocialIconLink;
