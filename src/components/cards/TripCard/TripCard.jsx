import React from 'react';
import PropTypes from 'prop-types';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import CardImage from '../../media/cardImage';
import { Date } from '../../simple/Date/Date';
import HeroIcon from '../../simple/heroIcon';
import TabLabel from '../../simple/tabLabel';
import { TripType } from '../../../types/TripType';
import { HeadingLevelType } from '../../../types/HeadingLevelType';
import * as styles from './TripCard.styles';
import SbLink from '../../../utilities/sbLink';

export const TripCardProps = {
  trip: PropTypes.shape(TripType),
  headingLevel: HeadingLevelType,
};

const TripCard = ({
  trip: {
    full_slug: fullSlug,
    content: {
      title,
      subtitle,
      shortDescription,
      startDate,
      endDate,
      heroImage,
      cardTitle,
      cardSubtitle,
      cardDescription,
      cardImage,
      tag,
    },
  },
  headingLevel = 3,
}) => {
  // Resolve Card props
  const tripTitle = cardTitle || title;
  const tripSubtitle = cardSubtitle || subtitle;
  const description = cardDescription || shortDescription;
  const image = cardImage?.filename ? cardImage : heroImage;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <div className={styles.imageWrapper}>
        <CardImage
          className={styles.image}
          filename={image.filename}
          smartFocus={image.focus}
          loading="lazy"
          size="vertical_3x2"
          width="600"
          height="400"
        />
      </div>
      <div>
        <div className={styles.date}>
          <Date startDate={startDate} endDate={endDate} isSmall />
        </div>
        <div className={styles.content}>
          <SbLink link={{ url: tripURL }} classes={styles.link}>
            <Heading
              level={headingLevel}
              font="serif"
              tracking="normal"
              className={styles.heading}
            >
              {tag && <SrOnlyText>{`${tag}: `}</SrOnlyText>}
              {tripTitle}
            </Heading>
            <HeroIcon
              iconType="arrow-right"
              className={styles.icon}
              isAnimate
            />
          </SbLink>
          {tag && <TabLabel text={tag} aria-hidden />}
          <p className={styles.subheading}>{tripSubtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </FlexBox>
  );
};
TripCard.propTypes = TripCardProps;

export default TripCard;
