import React from 'react';
import PropTypes from 'prop-types';
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
import { SBLinkType } from '../../types/storyblok/SBLinkType';

export const SAALinkButtonProps = {
  size: PropTypes.string,
  buttonStyle: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  link: SBLinkType,
  rel: PropTypes.string,
  srText: PropTypes.string,
  ClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const SAALinkButton = React.forwardRef(
  (
    {
      size = 'default',
      buttonStyle = 'primary',
      icon = 'arrow-right',
      align = 'left',
      children,
      link,
      rel,
      srText,
      className,
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
              iconType={icon}
              className={styles.icon({ buttonStyle })}
              isAnimate
            />
          )}
        </SbLink>
      </div>
    );
  }
);
SAALinkButton.propTypes = SAALinkButtonProps;

export default SAALinkButton;
