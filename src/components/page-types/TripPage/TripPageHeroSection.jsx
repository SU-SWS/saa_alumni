import PropTypes from 'prop-types';
import React from 'react';
import { FlexBox, Heading } from 'decanter-react';
import { SBImageType } from '../../../types/storyblok/SBAssetType';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import * as styles from './TripPageHeroSection.styles';

export const TripPageHeroSectionProps = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shortDescription: PropTypes.string,
  heroImage: SBImageType,
};

export const TripPageHeroSection = React.forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    shortDescription,
    heroImage: { filename, alt, focus },
  } = props;

  return (
    <header ref={ref}>
      <HeroImage filename={filename} alt={alt} focus={focus} overlay="dark">
        <FlexBox direction="col" className={styles.content}>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          {title && (
            <Heading
              level={1}
              font="serif"
              weight="bold"
              className={styles.title}
            >
              {title}
            </Heading>
          )}
          {shortDescription && (
            <span className={styles.description}>{shortDescription}</span>
          )}
          {/* TODO: Section Mav Here */}
        </FlexBox>
      </HeroImage>
    </header>
  );
});
TripPageHeroSection.propTypes = TripPageHeroSectionProps;
