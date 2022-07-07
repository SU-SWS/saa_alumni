import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { getDate, getDuration } from '../../../utilities/dates';
import { Heading } from '../../simple/Heading';
import * as styles from './tripNotifyMe.styles';
import SbLink from '../../../utilities/sbLink';
import HeroIcon from '../../simple/heroIcon';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';

const TripNotifyMe = (props) => {
  const {
    blok: {
      notifyMeText: {
        content: { body },
      },
    },
    blok,
    trip,
  } = props;
  const {
    full_slug: fullSlug,
    content: { title: tripTitle, startDate, endDate },
  } = trip;
  const title = `Notify me: ${tripTitle}`;
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
      <Grid xs={12}>
        <GridCell xs={12} md={6} lg={12}>
          <SbLink
            classes="su-group su-inline-block su-font-semibold su-basefont-23 su-rs-mb-6 su-no-underline su-transition-colors su-text-digital-red-xlight hocus:su-text-white hocus:su-underline hocus:su-underline-offset-[3px]"
            link={{ url: tripURL }}
          >
            <HeroIcon
              iconType="arrow-left"
              className="su-inline-block su-text-digital-red-xlight group-hocus:su-text-white"
              isAnimate
            />
            Back to {tripTitle}
          </SbLink>
          <Helmet titleTemplate={title} title={title} />
          <Heading
            level={1}
            size={6}
            align="left"
            font="serif"
            id="page-title"
            className="su-drop-shadow"
          >
            {title}
          </Heading>
          {body && (
            <p className="su-intro-text children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0">
              {body}
            </p>
          )}
        </GridCell>
        <GridCell
          xs={12}
          sm={6}
          md={4}
          lg={12}
          className="md:su-col-start-8 lg:su-col-start-1 su-rs-mt-7 lg:su-mt-0"
        >
          <Grid xl={5} className={styles.summaryContent}>
            <GridCell xl={3} className={styles.summaryItem}>
              <Heading level={2} className={styles.summaryName}>
                Dates
              </Heading>
              <span className={styles.summaryValue}>{tripDates}</span>
            </GridCell>
            <GridCell xl={3} className={styles.summaryItem}>
              <Heading level={2} className={styles.summaryName}>
                Duration
              </Heading>
              <span className={styles.summaryValue}>{tripDuration}</span>
            </GridCell>
          </Grid>
        </GridCell>
      </Grid>
    </SbEditable>
  );
};

export default TripNotifyMe;
