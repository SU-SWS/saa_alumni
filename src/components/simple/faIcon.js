import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FaIcon = ({
  iconChoice,
  iconType,
  isOutline,
  proFaIcon,
  iconStyle,
  srText,
  ...props
}) => {
  // Add all 3 types of FA icons to the library so you can use any of them
  library.add(fab, far, fas);

  // If proFaIcon (newer and PRO icon name) is provided, it overrides the older icon added using the Storyblok plugin
  // Remove "fa-" from Storyblok FA plugin to use Fontawesome React format
  const faIcon = proFaIcon || iconChoice.replace('fa-', '');

  // If iconStyle (newer icon type option) is selected, it overrides the older icon type added using the Storyblok plugin
  // It also orverrides the existing boolean option isOutline
  const faStyle = iconStyle || (isOutline ? 'far' : iconType) || 'fas';

  return (
    <>
      <FontAwesomeIcon icon={[faStyle, faIcon]} {...props} />
      {srText && <SrOnlyText srText={srText} />}
    </>
  );
};

export default FaIcon;
