import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import { SrOnlyText } from 'decanter-react';
import Icon from 'react-hero-icon';
import { ctaLinkColor, ctaLinkTextSize, heroicon, textAlign } from '../../utilities/dataSource';

const CtaLink = React.forwardRef((props, ref) => {
  // Horizontal alignment
  const align = textAlign[props.blok.align] ?? textAlign['left'];

  // Link text size
  const textSize = ctaLinkTextSize[props.blok.size] ?? ctaLinkTextSize['default'];

  // Link text color
  const textColor = ctaLinkColor[props.blok.textColor] ?? ctaLinkColor['bright-red'];

  // Heroicon option
  let linkIcon = heroicon[props.blok.icon] ?? heroicon['arrow-right'];

  return (
    <SbEditable content={props.blok}>
      {props.blok.linkText &&
        <div className={`su-block ${align} ${textSize}`}>
          <SbLink
            ref={ref}
            link={props.blok.link}
            attributes={props.blok.rel ? {rel: props.blok.rel} : {}}
            classes={`su-transition-color su-no-underline hocus:su-underline ${textColor}`}
          >
            {props.blok.linkText}
            {props.blok.srText &&
              <SrOnlyText srText={props.blok.srText} />
            }
            {props.blok.icon !== 'none' &&
            <Icon icon={linkIcon} type='solid' aria-hidden='true' />
            }
          </SbLink>
        </div>
      }
    </SbEditable>
  )
});

export default CtaLink;
