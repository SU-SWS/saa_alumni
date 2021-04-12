import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import Icon from 'react-hero-icon';
import { ctaLinkColor, ctaLinkTextSize, ctaLinkIconColor, heroicon, textAlign, tinyMarginBottom } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';

const CtaLink = React.forwardRef((props, ref) => {
  // Link text size
  const textSize = ctaLinkTextSize[props.blok.size] ?? ctaLinkTextSize['default'];

  // Link text color
  const textColor = ctaLinkColor[props.blok.textColor] ?? ctaLinkColor['bright-red-hover-cardinal-red'];

  // Icon color
  const iconColor = ctaLinkIconColor[props.blok.iconColor] ?? ctaLinkIconColor['bright-red-hover-cardinal-red'];

  // Icon size/position finetuning based on icon choice
  let iconClasses;

  if (props.blok.icon === 'external') {
    iconClasses = 'su-h-08em su-w-08em su-ml-4 su--mt-2 su-transform su-rotate-45 group-hover:su-rotate-45 group-focus:su-rotate-45';
  }
  else if (props.blok.icon === 'email' || props.blok.icon === 'video') {
    iconClasses = 'su-h-08em su-w-08em su-ml-7 su--mt-2';
  }
  else if (props.blok.icon === 'download') {
    iconClasses = 'su-h-08em su-w-08em su-ml-4 su--mt-3';
  }
  else if (props.blok.icon === 'chevron-down') {
    iconClasses = 'su-h-[1.1em] su-w-[1.1em] su-ml-4 su--mt-3';
  }
  else {
    iconClasses = 'su-h-09em su-w-09em su-ml-6 su--mt-2';
  }

  // Icon animation
  let iconAnimate = 'su-transition-transform group-hover:su-transform group-focus:su-transform';

  if (props.blok.icon === 'external') {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-x-01em group-focus:su-translate-x-01em group-hover:su--translate-y-01em group-focus:su--translate-y-01em');
  }
  else if (props.blok.icon === 'download' || props.blok.icon === 'chevron-down') {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-y-02em group-focus:su-translate-y-02em');
  }
  else {
    iconAnimate = dcnb(iconAnimate, 'group-hover:su-translate-x-02em group-focus:su-translate-x-02em');
  }

  // Heroicon option
  const linkIcon = heroicon[props.blok.icon] ?? heroicon['arrow-right'];

  // Horizontal alignment
  const align = textAlign[props.blok.align] ?? textAlign['left'];

  // Margin bottom
  const marginBottom = tinyMarginBottom[props.blok.spacingBottom] ?? tinyMarginBottom['md'];

  return (
    <SbEditable content={props.blok}>
      {props.blok.linkText &&
        <div className={`su-block ${align} ${textSize} ${marginBottom}`}>
          <SbLink
            ref={ref}
            link={props.blok.link}
            attributes={props.blok.rel ? {rel: props.blok.rel} : {}}
            classes={`su-w-fit su-group su-transition-colors su-no-underline su-underline-offset hover:su-underline focus:su-underline ${textColor}`}
          >
            {props.blok.linkText}
            {props.blok.srText &&
              <span className='su-sr-only'>{` ${props.blok.srText}`}</span>
            }
            {props.blok.icon !== 'none' &&
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
