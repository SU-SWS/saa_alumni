import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import FullWidthImage from '../../media/fullWidthImage';
import * as styles from './HeroImage.styles';

export const HeroImageProps = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string,
  focus: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  overlay: PropTypes.oneOf(['normal', 'dark', false]),
  aspectRatio: PropTypes.string,
};

export const HeroImage = ({
  filename,
  alt,
  focus,
  className,
  children,
  overlay = 'normal',
  aspectRatio,
}) => (
  <Container className={dcnb('hero', className, styles.root)} width="full">
    {filename && (
      <figure className={styles.imgWrapper({ children })}>
        <FullWidthImage
          filename={filename}
          smartFocus={focus}
          className={styles.img}
          loading="eager"
          aspectRatio={aspectRatio}
          alt={alt}
        />
      </figure>
    )}
    {overlay && <div className={styles.overlay({ overlay })} aria-hidden />}
    {children && <Container className={styles.content}>{children}</Container>}
  </Container>
);
