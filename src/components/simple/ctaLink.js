import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import Icon from 'react-hero-icon';
import { ctaLinkColor, ctaLinkTextSize, ctaLinkIconColor, heroicon, textAlign, tinyMarginBottom } from '../../utilities/dataSource';

const CtaLink = React.forwardRef((props, ref) => {
  // Link text size
  const textSize = ctaLinkTextSize[props.blok.size] ?? ctaLinkTextSize['default'];

  // Icon size
  let iconSize;

  if (props.blok.size === 'large') {
    iconSize = 23;
  }
  else if (props.blok.size === 'small') {
    iconSize = 19;
  }
  else {
    iconSize = 20;
  }

  // Link text color
  const textColor = ctaLinkColor[props.blok.textColor] ?? ctaLinkColor['bright-red'];

  // Icon color
  const iconColor = ctaLinkIconColor[props.blok.iconColor] ?? ctaLinkIconColor['bright-red'];

  // Icon animation
  let iconAnimate = 'su-transition-transform group-hover:su-transform group-focus:su-transform';

  if (props.blok.icon === 'external') {
    iconAnimate += ' group-hover:su-translate-x-01em group-focus:su-translate-x-01em group-hover:su--translate-y-01em group-focus:su--translate-y-01em';
  }
  else if (props.blok.icon === 'download' || props.blok.icon === 'chevron-down') {
    iconAnimate += ' group-hover:su-translate-y-02em group-focus:su-translate-y-02em'
  }
  else {
    iconAnimate += ' group-hover:su-translate-x-02em group-focus:su-translate-x-02em';
  }

  // Heroicon option
  const linkIcon = heroicon[props.blok.icon] ?? heroicon['arrow-right'];

  // External link icon custom rotation
  let iconRotate;

  if (props.blok.icon === 'external') {
    iconRotate = 'su-transform su-rotate-45 group-hover:su-rotate-45 group-focus:su-rotate-45';
  }

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
            classes={`su-flex su-items-center su-w-fit su-group su-transition-colors su-no-underline hover:su-underline focus:su-underline ${textColor}`}
          >
            {props.blok.linkText}
            {props.blok.srText &&
              <span className='su-sr-only'>{` ${props.blok.srText}`}</span>
            }
            {props.blok.icon !== 'none' &&
              <Icon icon={linkIcon}
                    width={iconSize}
                    height={iconSize}
                    type='solid'
                    aria-hidden='true'
                    className={`su-inline-block su-ml-03em ${iconRotate} ${iconColor} ${iconAnimate}`}
              />
            }
          </SbLink>
        </div>
      }
    </SbEditable>
  )
});

export default CtaLink;
