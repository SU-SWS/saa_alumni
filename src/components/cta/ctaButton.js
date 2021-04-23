import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import Icon from 'react-hero-icon';
import { buttonSize, buttonStyle, heroicon, textAlign } from '../../utilities/dataSource';
import { SrOnlyText } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const CtaButton = React.forwardRef((props, ref) => {
  // Button size
  const ctaButtonSize = buttonSize[props.blok.size] ?? buttonSize['default'];

  // Button style
  const ctaButtonStyle = buttonStyle[props.blok.buttonStyle] ?? buttonSize['primary'];

  // For all button styles other than ghost-gradient, icon color is same as text color
  let iconColor;

  if (props.blok.buttonStyle === 'ghost-gradient') {
    iconColor = 'su-text-saa-electric-blue-light group-hover:su-text-white group-focus:su-text-white';
  }

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
    iconClasses = 'su-h-1em su-w-1em su-ml-04em su--mt-2';
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

  return (
    <SbEditable content={props.blok}>
      {props.blok.linkText &&
      <div className={`cta-button su-block su-mx-10 su-mb-20 last:su-mb-0 ${align}`}>
        <SbLink
          ref={ref}
          link={props.blok.link}
          attributes={props.blok.rel ? {rel: props.blok.rel} : {}}
          classes={dcnb('su-inline-block su-w-fit su-group su-border-solid su-border-3 su-transition-colors su-no-underline su-underline-custom su-font-regular hover:su-underline focus:su-underline hover:su-shadow-md focus:su-shadow-md', ctaButtonStyle, ctaButtonSize)}
        >
          {props.blok.linkText}
          {props.blok.srText &&
            <SrOnlyText srText={props.blok.srText} />
          }
          {props.blok.icon !== 'none' &&
            <Icon icon={linkIcon}
                  type='solid'
                  aria-hidden='true'
                  className={`su-inline-block ${iconColor} ${iconClasses} ${iconAnimate}`}
            />
          }
        </SbLink>
      </div>
      }
    </SbEditable>
  )
});

export default CtaButton;
