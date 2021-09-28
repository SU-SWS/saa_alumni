import PropTypes from 'prop-types';
import React from 'react';
import { FlexBox } from 'decanter-react';
import { SBImageType } from '../../../types/storyblok/SBAssetType';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import * as styles from './TripPageHeroSection.styles';

export const TripPageHeroSectinoProps = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shortDescription: PropTypes.string,
  heroImage: SBImageType,
};

export const TripPageHeroSection = ({
  title,
  subtitle,
  shortDescription,
  heroImage: { filename, alt, focus },
}) => (
  <header>
    <HeroImage filename={filename} alt={alt} focus={focus} overlay="dark">
      <FlexBox direction="col" className={styles.content}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {shortDescription && (
          <span className={styles.description}>{shortDescription}</span>
        )}
        {/* TODO: Section Mav Here */}
      </FlexBox>
    </HeroImage>
  </header>
);
