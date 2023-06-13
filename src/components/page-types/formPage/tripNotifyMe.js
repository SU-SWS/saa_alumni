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
  const tripTitle = trip?.content?.title;
  const title = `Notify me: ${tripTitle}`;
  const tripURL = `/${trip?.fullSlug?.replace(/^\//, '')}`;
  const tripDates = useMemo(() => {
    const start = getDate(trip?.content?.startDate);
    const end = getDate(trip?.content?.endDate);
    return `${start.month} ${start.day}${
      start.year !== end.year ? `, ${start.year}` : ''
    }–${
      end.month === start.month && end.year === start.year
        ? ''
        : `${end.month} `
    }${end.day}, ${end.year}`;
  }, [trip?.content?.startDate, trip?.content?.endDate]);
  const tripDuration = useMemo(() => {
    const { days: dayDuration } = getDuration(
      trip?.content?.startDate,
      trip?.content?.endDate
    );

    if (dayDuration >= 0) {
      const days = dayDuration + 1;
      return `${days} day${days === 1 ? '' : 's'}`;
    }

    return '';
  }, [trip?.content?.startDate, trip?.content?.endDate]);

  return (
    <SbEditable content={blok}>
      <Helmet titleTemplate={title} title={title} />
      <Grid xs={12}>
        <GridCell xs={12} md={6} lg={12}>
          <SbLink link={{ url: tripURL }} classes={styles.backToLink}>
            <HeroIcon
              iconType="arrow-left"
              className={styles.leadingIcon}
              isAnimate
            />
            Back to {tripTitle}
          </SbLink>
          <Heading
            level={1}
            size={6}
            align="left"
            font="serif"
            id="page-title"
            className={styles.heading}
          >
            {trip?.content?.title ? title : 'Something went wrong.'}
          </Heading>
          {trip?.content?.title && body ? (
            <p className={styles.body}>{body}</p>
          ) : (
            <p>
              A technical error has occurred. Please refresh the page or try
              again later. If the problem persists,{' '}
              <SbLink
                link="https://stanford.service-now.com/alumni_donor_services?id=sc_cat_item&sys_id=18a4d6751b237050d78786ecdc4bcbe4"
                classes={styles.helpLink}
              >
                please submit a help ticket{' '}
                <HeroIcon
                  iconType="external"
                  className={styles.helpLinkIcon}
                  isAnimate
                />
              </SbLink>
            </p>
          )}
        </GridCell>
        {trip?.content?.startDate && (
          <GridCell
            xs={12}
            sm={6}
            md={4}
            lg={12}
            className={styles.contentGrid}
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
        )}
      </Grid>
    </SbEditable>
  );
};

export default TripNotifyMe;
