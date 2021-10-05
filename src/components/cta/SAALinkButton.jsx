import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import {
  buttonSizes,
  buttonStyles,
  textAlign,
} from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';
import HeroIcon from '../simple/heroIcon';
import * as styles from './SAALinkButton.styles';

const SAALinkButton = React.forwardRef(
  ({
    size,
    buttonStyle,
    icon,
    align,
    children,
    link,
    rel,
    srText,
    className,
    ref,
  }) => {
    // Button size
    const ctaButtonSize = buttonSizes[size] || buttonSizes.default;

    // Button style
    const ctaButtonStyle = buttonStyles[buttonStyle] || buttonStyles.primary;

    // Horizontal alignment
    const buttonAlign = textAlign[align] || textAlign.left;

    return (
      <div className={dcnb(styles.root, buttonAlign)}>
        <SbLink
          ref={ref}
          link={link}
          attributes={rel ? { rel } : {}}
          classes={dcnb(styles.link, ctaButtonStyle, ctaButtonSize, className)}
        >
          {children}
          {srText && <SrOnlyText srText={` ${srText}`} />}
          {icon !== 'none' && (
            <HeroIcon
              iconType={icon || 'arrow-right'}
              className={styles.icon({ buttonStyle })}
              isAnimate
            />
          )}
        </SbLink>
      </div>
    );
  }
);

export default SAALinkButton;
