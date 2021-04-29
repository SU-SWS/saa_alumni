import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import Icon from 'react-hero-icon';
import { ctaLinkColor, ctaLinkTextSize, ctaLinkIconColor, heroicon, textAlign, tinyMarginBottom } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from 'decanter-react';

const CtaLink = React.forwardRef((
  {
    blok: {
      size,
      textColor,
      iconColor,
      icon,
      align:propsAlign,
      spacingBottom,
      link,
      rel,
      linkText,
      srText
    },
    blok
  }
  , ref) => {
  // Link text size
  const textSize = ctaLinkTextSize[size] ?? ctaLinkTextSize['default'];

  // Link text color
  textColor = ctaLinkColor[textColor] ?? ctaLinkColor['bright-red-hover-cardinal-red'];

  // Icon color
  iconColor = ctaLinkIconColor[iconColor] ?? ctaLinkIconColor['bright-red-hover-cardinal-red'];

  // Icon size/position finetuning based on icon choice
  let iconClasses;

  if (icon === 'external') {
    iconClasses = 'su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform su-rotate-45 group-hover:su-rotate-45 group-focus:su-rotate-45';
  }
  else if (icon === 'email' || icon === 'video') {
    iconClasses = 'su-h-08em su-w-08em su-ml-7 su--mt-2';
  }
  else if (icon === 'download') {
    iconClasses = 'su-h-08em su-w-08em su-ml-4 su--mt-3';
  }
  else if (icon === 'chevron-down') {
    iconClasses = 'su-h-[1.1em] su-w-[1.1em] su-ml-4 su--mt-3';
  }
  else {
    iconClasses = 'su-h-1em su-w-1em su-ml-04em su--mt-2';
  }

  // Icon animation
  let iconAnimate = 'su-transition-transform group-hover:su-transform group-focus:su-transform';

  if (icon === 'external') {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-x-01em group-focus:su-translate-x-01em group-hover:su--translate-y-01em group-focus:su--translate-y-01em');
  }
  else if (icon === 'download' || icon === 'chevron-down') {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-y-02em group-focus:su-translate-y-02em');
  }
  else {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-x-02em group-focus:su-translate-x-02em');
  }

  // Heroicon option
  const linkIcon = heroicon[icon] ?? heroicon['arrow-right'];

  // Horizontal alignment
  const align = textAlign[propsAlign] ?? textAlign['left'];

  // Margin bottom
  const marginBottom = tinyMarginBottom[spacingBottom] ?? tinyMarginBottom['md'];

  return (
    <SbEditable content={blok}>
      {linkText &&
        <div className={`su-block ${align} ${textSize} ${marginBottom}`}>
          <SbLink
            ref={ref}
            link={link}
            attributes={rel ? {rel: rel} : {}}
            classes={`su-w-fit su-group su-transition-colors su-no-underline su-underline-custom hover:su-underline focus:su-underline ${textColor}`}
          >
            {linkText}
            {srText &&
              <SrOnlyText srText={srText} />
            }
            {icon !== 'none' &&
              <Icon icon={linkIcon}
                    type='solid'
                    aria-hidden='true'
                    className={`su-inline-block ${iconClasses} ${iconColor} ${iconAnimate}`}
              />
            }
          </SbLink>
        </div>
      }
    </SbEditable>
  )
});

export default CtaLink;
