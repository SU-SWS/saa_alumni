import React from 'react';
import SbEditable from 'storyblok-react';
import { SAACtaLink } from '../cta/SAACtaLink';

export const SBCtaLink = ({ blok, as }) => {
  const {
    size,
    textColor,
    leadingIcon: { icon: leadingIconChoice, leadingIconType } = {},
    proFaIcon,
    isOutlineFaIcon,
    icon,
    align,
    spacingBottom,
    link,
    rel,
    linkText,
    srText,
  } = blok;

  return (
    <SbEditable content={blok}>
      <SAACtaLink
        as={as}
        size={size}
        textColor={textColor}
        leadingIcon={leadingIconChoice}
        leadingIconType={leadingIconType}
        proFaIcon={proFaIcon}
        isOutlineFaIcon={isOutlineFaIcon}
        trailingIcon={icon}
        align={align}
        spacingBottom={spacingBottom}
        link={link}
        rel={rel}
        linkText={linkText}
        srText={srText}
      />
    </SbEditable>
  );
};
