import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas as pfas } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FaIcon = ({
  iconChoice,
  iconType,
  isOutline,
  proFaIcon,
  srText,
  ...props
}) => {
  // Add all 3 types of FA icons to the library so you can use any of them
  library.add(
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    fas,
    fal,
    pfas
  );

  // If proFaIcon (newer and PRO icon name) is provided, it overrides the older icon added using the Storyblok plugin
  // Remove 'fa-' from Storyblok FA plugin to use Fontawesome React format
  const faIcon = proFaIcon || iconChoice.replace('fa-', '');

  // It the 'isOutline' option is selected, it uses the light style icons, otherwise uses the solid style
  const faStyle = (isOutline ? 'fal' : iconType) || 'fas';

  return (
    <>
      <FontAwesomeIcon icon={[faStyle, faIcon]} {...props} />
      {srText && <SrOnlyText srText={srText} />}
    </>
  );
};

export default FaIcon;
