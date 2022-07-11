import React from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Heading } from '../../simple/Heading';
import SbLink from '../../../utilities/sbLink';
import HeroIcon from '../../simple/heroIcon';

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
      <SbLink
        link={{ url: tripURL }}
        classes="su-group su-inline-block su-font-light su-rs-mb-6 su-no-underline su-transition-colors"
      >
        <HeroIcon
          iconType="arrow-left"
          className="su-inline-block su-text-digital-red-light group-hocus:su-text-cardinal-red"
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
        className="su-drop-shadow"
      >
        {heading}
      </Heading>
      {body && <p className="su-intro-text su-rs-mb-5">{body}</p>}
    </SbEditable>
  );
};

export default TripCustomJourneys;
