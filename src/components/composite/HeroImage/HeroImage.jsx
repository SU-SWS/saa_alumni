import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { Container, FlexBox } from 'decanter-react';
import FullWidthImage from '../../media/fullWidthImage';
import * as styles from './HeroImage.styles';

export const HeroImageProps = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string,
  focus: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,

  isDarkGradient: PropTypes.bool,
  overlay: PropTypes.oneOf('normal', 'dark', false),
};

export const HeroImage = ({
  filename,
  alt,
  focus,
  className,
  children,
  overlay = 'normal',
}) => (
  <Container
    className="hero su-relative su-bg-saa-black lg:su-top-0"
    width="full"
  >
    {filename && (
      <figure className="su-absolute su-top-0 su-overflow-hidden su-w-full su-h-full">
        <FullWidthImage
          filename={filename}
          smartFocus={focus}
          className="su-w-full su-h-full su-object-cover"
          loading="eager"
          alt={alt}
        />
      </figure>
    )}
    <div className={styles.overlay({ overlay })} aria-hidden />
    <Container className="su-relative su-rs-pt-9 su-rs-pb-8">
      {children}
    </Container>
  </Container>
);
