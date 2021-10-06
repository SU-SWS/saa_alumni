import React from 'react';
import SbEditable from 'storyblok-react';
import SAALinkButton from '../cta/SAALinkButton';

export const SBCtaButton = ({ blok }) => {
  const { size, buttonStyle, icon, align, linkText, link, rel, srText } = blok;

  return (
    <SbEditable content={blok}>
      <SAALinkButton
        size={size}
        buttonStyle={buttonStyle}
        icon={icon}
        align={align}
        link={link}
        rel={rel}
        srText={srText}
      >
        {linkText}
      </SAALinkButton>
    </SbEditable>
  );
};
