import React, { useMemo } from 'react';
import SbEditable from 'storyblok-react';
import { getDate, getDuration } from '../../../utilities/dates';
import { Heading } from '../../simple/Heading';

import { SAACtaLink } from '../../cta/SAACtaLink';

const tripNotifyMe = (props) => {
  const {
    blok: {
      heading,
      body,
      trip: {
        full_slug: fullSlug,
        content: { title: tripTitle, startDate, endDate },
      },
    },
    blok,
  } = props;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;
  const tripDates = useMemo(() => {
    const start = getDate(startDate);
    const end = getDate(endDate);
    return `${start.month} ${start.day}${
      start.year !== end.year ? `, ${start.year}` : ''
    }–${
      end.month === start.month && end.year === start.year
        ? ''
        : `${end.month} `
    }${end.day}, ${end.year}`;
  }, [startDate, endDate]);
  const tripDuration = useMemo(() => {
    const { days: dayDuration } = getDuration(startDate, endDate);

    if (dayDuration >= 0) {
      const days = dayDuration + 1;
      return `${days} day${days === 1 ? '' : 's'}`;
    }

    return '';
  }, [startDate, endDate]);

  return (
    <SbEditable content={blok}>
      {/* TODO: Temporary Back to trip Link placeholder */}
      <SAACtaLink
        textColor="bright-red-hover-cardinal-red"
        leadingIcon="arrow-left"
        size="default"
        link={tripURL}
        className="su-rs-mb-6"
      >
        Back to {tripTitle}
      </SAACtaLink>
      <Heading>
        {heading} {tripTitle}
      </Heading>
      <p>{body}</p>
      <div>
        <Heading level={4}>Dates</Heading>
        <span>{tripDates}</span>
      </div>
      <div>
        <Heading level={4}>Duration</Heading>
        <span>{tripDuration}</span>
      </div>
    </SbEditable>
  );
};

export default tripNotifyMe;
