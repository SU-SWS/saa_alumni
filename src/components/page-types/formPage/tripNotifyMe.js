import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { getDate, getDuration } from '../../../utilities/dates';
import { Heading } from '../../simple/Heading';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import * as styles from './tripNotifyMe.styles';
import { SAACtaLink } from '../../cta/SAACtaLink';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';

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
  const title = `Receive notifiations: ${tripTitle}`;
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
      {/* <SAACtaLink
        leadingIcon="arrow-left"
        size="default"
        link={tripURL}
        className="su-rs-mb-6"
      >
        Back to {tripTitle}
      </SAACtaLink> */}
      <Helmet titleTemplate={title} title={title} />
      <Heading level={1} align="left" font="serif" id="page-title">
        {title}
      </Heading>
      {hasRichText(body) && (
        <RichTextRenderer
          wysiwyg={body}
          className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
        />
      )}
      <Grid xl={5} className={styles.summaryContent}>
        <GridCell xl={3} className={styles.summaryItem}>
          <Heading level={4} className={styles.summaryName}>
            Dates
          </Heading>
          <span className={styles.summaryValue}>{tripDates}</span>
        </GridCell>
        <GridCell xl={3} className={styles.summaryItem}>
          <Heading level={4} className={styles.summaryName}>
            Duration
          </Heading>
          <span className={styles.summaryValue}>{tripDuration}</span>
        </GridCell>
      </Grid>
    </SbEditable>
  );
};

export default TripNotifyMe;
