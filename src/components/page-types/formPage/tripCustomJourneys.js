import React from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Heading } from '../../simple/Heading';
import SbLink from '../../../utilities/sbLink';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './tripCustomJourneys.styles';

const TripCustomJourneys = (props) => {
  const {
    blok: {
      customJourneysText: {
        content: { heading, body },
      },
    },
    blok,
    trip,
  } = props;
  const {
    full_slug: fullSlug,
    content: { title },
  } = trip;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;

  return (
    <SbEditable content={blok}>
      <SbLink link={{ url: tripURL }} classes={styles.backToLink}>
        <HeroIcon
          iconType="arrow-left"
          className={styles.leadingIcon}
          isAnimate
        />
        Back to {title}
      </SbLink>
      <Helmet titleTemplate={title} title={title} />
      <Heading
        level={1}
        align="left"
        font="serif"
        id="page-title"
        className={styles.heading}
      >
        {heading}
      </Heading>
      {body && <p className={styles.body}>{body}</p>}
    </SbEditable>
  );
};

export default TripCustomJourneys;
