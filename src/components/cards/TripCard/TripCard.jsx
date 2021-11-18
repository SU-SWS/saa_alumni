import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FlexBox, SrOnlyText } from 'decanter-react';
import { Heading } from '../../simple/Heading';
import CardImage from '../../media/cardImage';
import { Date } from '../../simple/Date/Date';
import HeroIcon from '../../simple/heroIcon';
import TabLabel from '../../simple/tabLabel';
import { TripType } from '../../../types/TripType';
import { HeadingLevelType } from '../../../types/HeadingLevelType';
import * as styles from './TripCard.styles';

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
    <FlexBox direction="col" element="article" className={styles.root}>
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
          <Link to={tripURL} className={styles.link}>
            <Heading
              level={headingLevel}
              font="serif"
              tracking="normal"
              className={styles.heading}
            >
              {tag && <SrOnlyText srText={`${tag}: `} />}
              {tripTitle}
            </Heading>
            <HeroIcon
              iconType="arrow-right"
              className={styles.icon}
              isAnimate
            />
          </Link>
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
