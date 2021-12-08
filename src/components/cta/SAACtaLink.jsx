import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from '../accessibility/SrOnlyText';
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
import { SBLinkType } from '../../types/storyblok/SBLinkType';
import { ClassNameType } from '../../types/CommonType';
import * as styles from './SAACtaLink.styles';

const SAACtaLinkProps = {
  as: PropTypes.oneOf(['div', 'li']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  textColor: PropTypes.oneOf([
    'bright-red-hover-cardinal-red',
    'bright-red-hover-white',
    'white',
    'black',
    'all-white',
  ]),
  leadingIcon: PropTypes.string,
  leadingIconType: PropTypes.oneOf(['fas', 'fab', 'far']),
  proFaIcon: PropTypes.string,
  isOutlineFaIcon: PropTypes.bool,
  trailingIcon: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  spacingBottom: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  link: SBLinkType.isRequired,
  rel: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  srText: PropTypes.string,
  className: ClassNameType,
};

export const SAACtaLink = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    size = 'default',
    textColor = 'bright-red-hover-cardinal-red',
    leadingIcon,
    leadingIconType,
    proFaIcon,
    isOutlineFaIcon,
    trailingIcon,
    align: alignProp = 'left',
    spacingBottom,
    link,
    rel,
    linkText,
    srText,
    className,
    ...rest
  } = props;

  // Link text size
  const textSize = ctaLinkTextSize[size];

  // Link text color
  const ctaTextColor = ctaLinkColor[textColor];

  // Horizontal alignment
  const align = textAlign[alignProp];
  const justifyLink = horizontalAlign[alignProp];

  // Margin bottom
  const marginBottom = tinyMarginBottom[spacingBottom];

  return (
    <Element
      className={dcnb(styles.root, align, textSize, marginBottom)}
      {...rest}
    >
      <SbLink
        ref={ref}
        link={link}
        attributes={rel ? { rel } : {}}
        classes={dcnb(styles.link, ctaTextColor, justifyLink, className)}
      >
        {(proFaIcon || leadingIcon) && (
          <div className={styles.leadingIconWrapper}>
            <FaIcon
              proFaIcon={proFaIcon}
              iconChoice={leadingIcon}
              iconType={leadingIconType}
              isOutline={isOutlineFaIcon}
              className={styles.leadingIcon}
              fixedWidth
            />
          </div>
        )}
        <div>
          {linkText}
          {srText && <SrOnlyText>{` ${srText}`}</SrOnlyText>}
          {trailingIcon !== 'none' && (
            <HeroIcon
              iconType={trailingIcon}
              className={styles.trailingIcon({ textColor })}
              isAnimate
            />
          )}
        </div>
      </SbLink>
    </Element>
  );
});
SAACtaLink.propTypes = SAACtaLinkProps;
