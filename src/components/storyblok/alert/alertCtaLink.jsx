import React from 'react';
import PropTypes from 'prop-types';
import SbEditable from 'storyblok-react';
import { SAACtaLink } from '../../cta/SAACtaLink';
import { SAALinkButton } from '../../cta/SAALinkButton';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';

const SBAlertCtaLinkPropTypes = {
  ctaType: PropTypes.oneOf(['button', 'link']),
  link: SBLinkType,
  text: PropTypes.string,
  srText: PropTypes.string,
  isCtaDark: PropTypes.bool,
};

export const SBAlertCtaLink = ({ blok, isCtaDark }) => {
  const { ctaType, link, text, srText } = blok;

  let alertCta;
  if (ctaType === 'button') {
    alertCta = (
      <SAALinkButton
        buttonStyle={isCtaDark ? 'secondary-black' : 'secondary-white'}
        size="small-short"
        link={link}
        srText={srText}
      >
        {text}
      </SAALinkButton>
    );
  } else {
    alertCta = (
      <SAACtaLink
        link={link}
        linkText={text}
        srText={srText}
        textColor={isCtaDark ? 'all-black' : 'all-white'}
        trailingIcon="chevron-right"
        size="small"
      />
    );
  }

  return <SbEditable content={blok}>{alertCta}</SbEditable>;
};
SBAlertCtaLink.propTypes = SBAlertCtaLinkPropTypes;
