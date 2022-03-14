import React, { useMemo } from 'react';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { getDate, getDuration } from '../../../utilities/dates';
import { Heading } from '../../simple/Heading';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import { SAACtaLink } from '../../cta/SAACtaLink';
import CreateBloks from '../../../utilities/createBloks';

const TripNotifyMe = (props) => {
  const {
    blok: {
      notifyMeText: {
        content: { body },
      },
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
      <Link to={tripURL} className="su-rs-mb-6">
        Back to {tripTitle}
      </Link>
      {/* <SAACtaLink
        // leadingIcon="arrow-left"
        size="default"
        link={tripURL}
        className="su-rs-mb-6"
      >
        Back to {tripTitle}
      </SAACtaLink> */}
      <Heading level={1} align="left" font="serif">
        Receive notifiations: {tripTitle}
      </Heading>
      {hasRichText(body) && (
        <RichTextRenderer
          wysiwyg={body}
          className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
        />
      )}
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

export default TripNotifyMe;
