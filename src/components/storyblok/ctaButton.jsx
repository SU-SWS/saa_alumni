import React from 'react';
import SbEditable from 'storyblok-react';
import { SAALinkButton } from '../cta/SAALinkButton';

export const SBCtaButton = ({ blok }) => {
  const { size, buttonStyle, icon, align, linkText, link, rel, referrerpolicy, srText } = blok;

  return (
    <SbEditable content={blok}>
      <SAALinkButton
        size={size}
        buttonStyle={buttonStyle}
        icon={icon}
        align={align}
        link={link}
        rel={rel}
        referrerpolicy={referrerpolicy}
        srText={srText}
      >
        {linkText}
      </SAALinkButton>
    </SbEditable>
  );
};
