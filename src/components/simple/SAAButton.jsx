import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import {
  buttonSizes,
  buttonStyles,
  textAlign,
} from '../../utilities/dataSource';
import HeroIcon from './heroIcon';
import * as styles from '../cta/SAALinkButton.styles';

const SAAButton = React.forwardRef(
  ({
    size = 'default',
    type = 'button',
    buttonStyle = 'primary',
    icon = 'arrow-right',
    align = 'left',
    children,
    srText,
    className,
    ref,
    onClick,
  }) => {
    // Button size
    const ctaButtonSize = buttonSizes[size];

    // Button style
    const ctaButtonStyle = buttonStyles[buttonStyle];

    // Horizontal alignment
    const buttonAlign = textAlign[align];

    return (
      <div className={dcnb(styles.root, buttonAlign)}>
        <button
          type={type}
          ref={ref}
          className={dcnb(
            styles.link,
            ctaButtonStyle,
            ctaButtonSize,
            className
          )}
          onClick={onClick}
        >
          {children}
          {srText && <SrOnlyText srText={` ${srText}`} />}
          {icon !== 'none' && (
            <HeroIcon
              iconType={icon}
              className={styles.icon({ buttonStyle })}
              isAnimate
            />
          )}
        </button>
      </div>
    );
  }
);

export default SAAButton;
