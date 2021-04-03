import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../utilities/sbLink';
import { SrOnlyText } from 'decanter-react';
import Icon from 'react-hero-icon';
import { ctaLinkTextSize, textAlign } from '../../utilities/dataSource';

const CtaLink = React.forwardRef((props, ref) => {
  // Horizontal alignment
  const align = textAlign[props.blok.align] ?? textAlign['left'];

  // Link text size
  const textSize = ctaLinkTextSize[props.blok.size] ?? ctaLinkTextSize['default'];

  return (
    <SbEditable content={props.blok}>
      {props.blok.linkText &&
        <div className={`su-block ${align} ${textSize}`}>
          <SbLink
            ref={ref}
            link={props.blok.link}
            attributes={props.blok.rel ? {rel: props.blok.rel} : {}}
          >
            {props.blok.linkText}
            {props.blok.srText &&
              <SrOnlyText srText={props.blok.srText} />
            }
          </SbLink>
        </div>
      }
    </SbEditable>
  )
});

export default CtaLink;
