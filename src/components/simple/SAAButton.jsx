import React from 'react';
import PropTypes from 'prop-types';
import { SrOnlyText } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import {
  buttonSizes,
  buttonStyles,
  textAlign,
} from '../../utilities/dataSource';
import HeroIcon from './heroIcon';
import * as styles from '../cta/SAALinkButton.styles';

export const SAAButtonProps = {
  size: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  buttonStyle: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  srText: PropTypes.string,
  ClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
};

const SAAButton = React.forwardRef(
  (
    {
      size = 'default',
      type = 'button',
      buttonStyle = 'primary',
      icon = 'arrow-right',
      align = 'left',
      children,
      srText,
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Button size
    const ctaButtonSize = buttonSizes[size];

    // Button style
    const ctaButtonStyle = buttonStyles[buttonStyle];

    // Horizontal alignment
    const buttonAlign = textAlign[align];

    return (
      <div className={dcnb(styles.root, buttonAlign)}>
        <button
          // eslint-disable-next-line react/button-has-type
          type={type}
          ref={ref}
          className={dcnb(
            styles.link,
            ctaButtonStyle,
            ctaButtonSize,
            className
          )}
          onClick={onClick}
          {...rest}
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
SAAButton.propTypes = SAAButtonProps;

export default SAAButton;
