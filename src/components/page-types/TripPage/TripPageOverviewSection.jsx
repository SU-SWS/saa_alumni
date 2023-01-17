import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { faGameConsoleHandheld } from '@fortawesome/pro-solid-svg-icons';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import { Heading } from '../../simple/Heading';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { getDate, getDuration } from '../../../utilities/dates';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { CopyButton } from '../../composite/CopyButton/CopyButton';
import * as styles from './TripPageOverviewSection.styles';
import * as headerStyles from './TripPageSectionHeader.styles';
import CreateBloks from '../../../utilities/createBloks';
import { SAALinkButton } from '../../cta/SAALinkButton';
import { SAAButton } from '../../simple/SAAButton';
import hasRichText from '../../../utilities/hasRichText';
import getNumBloks from '../../../utilities/getNumBloks';
import HeroIcon from '../../simple/heroIcon';
import { SrOnlyText } from '../../accessibility/SrOnlyText';

export const TripPageOverviewSectionProps = {
  onPrint: PropTypes.func,
  overviewHeading: PropTypes.string,
  overviewBody: SBRichTextType,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  cost: SBRichTextType,
  tripSize: PropTypes.string,
  minAge: PropTypes.string,
  status: PropTypes.oneOf(['notify', 'reserve']),
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  overviewBelowContent: SBBlokType,
};

export const TripPageOverviewSection = React.forwardRef((props, ref) => {
  const {
    onPrint,
    overviewHeading,
    overviewBody,
    startDate,
    endDate,
    cost,
    tripSize,
    minAge,
    status,
    reservationURL,
    inquireURL,
    overviewBelowContent,
  } = props;
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
  const location = useLocation();

  // Checks to see if reservationURL is an internal or external URL
  if (
    reservationURL.cached_url &&
    !reservationURL.cached_url.includes('http')
  ) {
    // If internal url, remove the paramaters that match the current trip page url and return the end snippet
    // e.g. reservationURL.cached_url = `register`
    reservationURL.cached_url = reservationURL.cached_url.replace(
      location.pathname.replace(/^\//, ''),
      ''
    );
  }

  return (
    <div ref={ref}>
      <TripPageSectionWrapper heading="Overview">
        <Grid gap xs={12} className={styles.main}>
          <GridCell xs={12} md={7} xl={8} xxl={7} className={styles.content}>
            <Heading
              level={3}
              font="serif"
              className={headerStyles.sectionHeading({ isCenter: false })}
            >
              {overviewHeading}
            </Heading>
            {hasRichText(overviewBody) && (
              <RichTextRenderer
                wysiwyg={overviewBody}
                className={styles.body}
              />
            )}
          </GridCell>
          <GridCell xs={12} md={4} xl={3} className={styles.summary}>
            <div className={styles.summaryContent}>
              <div className={styles.summaryItem}>
                <Heading level={4} className={styles.summaryName}>
                  Dates
                </Heading>
                <span className={styles.summaryValue}>{tripDates}</span>
              </div>
              <div className={styles.summaryItem}>
                <Heading level={4} className={styles.summaryName}>
                  Duration
                </Heading>
                <span className={styles.summaryValue}>{tripDuration}</span>
              </div>
              {hasRichText(cost) && (
                <div className={styles.summaryItem}>
                  <Heading level={4} className={styles.summaryName}>
                    Price
                  </Heading>
                  <RichTextRenderer
                    wysiwyg={cost}
                    className={styles.summaryCost}
                  />
                </div>
              )}
              {tripSize && (
                <div className={styles.summaryItem}>
                  <Heading level={4} className={styles.summaryName}>
                    Trip size
                  </Heading>
                  <span className={styles.summaryValue}>
                    {tripSize} participants
                  </span>
                </div>
              )}
              {minAge && (
                <div className={styles.summaryItem}>
                  <Heading level={4} className={styles.summaryName}>
                    Minimum age
                  </Heading>
                  <span className={styles.summaryValue}>{minAge} years</span>
                </div>
              )}
            </div>
            <div className={styles.actions}>
              {status === 'notify' && inquireURL?.cached_url && (
                <div>
                  <Heading level={4} className={styles.summaryName}>
                    Ready to go? Looking for more information?
                  </Heading>
                  <span className={styles.summaryValue}>
                    Reservations aren’t yet open for this trip. Request to be
                    notified when more details are available and reservations
                    open.
                  </span>
                </div>
              )}
              {status === 'reserve' && reservationURL?.cached_url && (
                <a
                  href={reservationURL?.cached_url}
                  className={styles.reserveBtn}
                  rel="noopener nofollow noreferrer"
                  target="_blank"
                >
                  Reserve
                  <SrOnlyText>(opens new window)</SrOnlyText>
                  <HeroIcon iconType="external" isAnimate />
                </a>
              )}
              {status === 'notify' && inquireURL?.cached_url && (
                <SAALinkButton
                  link={inquireURL}
                  className={{ 'su-w-full': true, 'su-w-fit': false }}
                  align="center"
                  size="small"
                  rel="nofollow"
                >
                  Notify me
                </SAALinkButton>
              )}
              {onPrint && (
                <SAAButton
                  className={{ 'su-w-full': true, 'su-w-fit': false }}
                  onClick={onPrint}
                  buttonStyle="secondary"
                  size="small-short"
                  align="center"
                >
                  Print
                </SAAButton>
              )}
              <div>
                <CopyButton
                  copyText={location.href}
                  className={{ 'su-w-full': true, 'su-w-fit': false }}
                >
                  Copy link to share
                </CopyButton>
              </div>
            </div>
          </GridCell>
        </Grid>
        {getNumBloks(overviewBelowContent) > 0 && (
          <div className="trip-page-overview-below-content">
            <CreateBloks blokSection={overviewBelowContent} />
          </div>
        )}
      </TripPageSectionWrapper>
    </div>
  );
});
TripPageOverviewSection.propTypes = TripPageOverviewSectionProps;
