import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from 'decanter-react';
import {
  ctaLinkColor,
  ctaLinkTextSize,
  textAlign,
  tinyMarginBottom,
  horizontalAlign,
} from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';
import FaIcon from '../simple/faIcon';
import HeroIcon from '../simple/heroIcon';

const CtaLink = React.forwardRef(
  (
    {
      blok: {
        size,
        textColor: propsTextColor,
        leadingIcon: { icon: propsIcon, type } = {},
        proFaIcon,
        isOutlineFaIcon,
        icon,
        align: propsAlign,
        spacingBottom,
        link,
        rel,
        linkText,
        srText,
      },
      blok,
      as,
    },
    ref
  ) => {
    const WrapperElement = as || 'div';

    // Link text size
    const textSize = ctaLinkTextSize[size] ?? ctaLinkTextSize.default;

    // Link text color
    const textColor =
      ctaLinkColor[propsTextColor ?? 'bright-red-hover-cardinal-red'];

    // Icon color
    let iconColor = 'su-text-digital-red-xlight group-hocus:su-text-black-20';

    if (propsTextColor === 'bright-red-hover-cardinal-red') {
      iconColor = 'su-text-digital-red-light group-hocus:su-text-cardinal-red';
    }

    // Horizontal alignment
    const align = textAlign[propsAlign] ?? textAlign.left;
    const justifyLink = horizontalAlign[propsAlign] ?? horizontalAlign.left;

    // Margin bottom
    const marginBottom = tinyMarginBottom[spacingBottom] ?? tinyMarginBottom.md;

    return (
      <SbEditable content={blok}>
        {linkText && (
          <WrapperElement
            className={dcnb('su-block', align, textSize, marginBottom)}
          >
            <SbLink
              ref={ref}
              link={link}
              attributes={rel ? { rel } : {}}
              classes={dcnb(
                'su-flex su-w-fit su-group su-transition-colors su-no-underline su-underline-offset hocus:su-underline',
                textColor,
                justifyLink
              )}
            >
              {(proFaIcon || propsIcon) && (
                <div className="su-w-fit su-max-w-3rem su-flex-shrink-0">
                  <FaIcon
                    proFaIcon={proFaIcon}
                    iconChoice={propsIcon}
                    iconType={type}
                    isOutline={isOutlineFaIcon}
                    className="su-mr-06em su-backface-hidden su-text-black-80"
                    fixedWidth
                  />
                </div>
              )}
              <div>
                {linkText}
                {srText && <SrOnlyText srText={` ${srText}`} />}
                {icon !== 'none' && (
                  <HeroIcon
                    iconType={icon}
                    className={dcnb('su-inline-block', iconColor)}
                    isAnimate
                  />
                )}
              </div>
            </SbLink>
          </WrapperElement>
        )}
      </SbEditable>
    );
  }
);

export default CtaLink;
