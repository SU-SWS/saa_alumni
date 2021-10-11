import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { Heading, Grid, GridCell } from 'decanter-react';
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
import SAALinkButton from '../../cta/SAALinkButton';
import SAAButton from '../../simple/SAAButton';
import hasRichText from '../../../utilities/hasRichText';

export const TripPageOverviewSectionProps = {
  onPrint: PropTypes.func,
  overviewHeading: PropTypes.string,
  overviewBody: SBRichTextType,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  durationText: PropTypes.string,
  cost: SBRichTextType,
  tripSize: PropTypes.string,
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
    durationText,
    cost,
    tripSize,
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
    } - ${end.month} ${end.day}, ${end.year}`;
  }, [startDate, endDate]);
  const tripDuration = useMemo(() => {
    if (durationText) return durationText;

    const { days: dayDuration } = getDuration(startDate, endDate);

    if (dayDuration && dayDuration > 0) {
      const days = dayDuration;
      const nights = dayDuration - 1;

      return `${days} day${days === 1 ? '' : 's'}, ${nights} night${
        nights === 1 ? '' : 's'
      }`;
    }

    return '';
  }, [startDate, endDate, durationText]);
  const location = useLocation();

  return (
    <div ref={ref}>
      <TripPageSectionWrapper heading="Overview">
        <Grid gap xs={12} className={styles.main}>
          <GridCell xs={12} md={7} xl={8} xxl={7} className={styles.content}>
            <Heading
              level={3}
              font="serif"
              weight="bold"
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
                <Heading level={3} className={styles.summaryName}>
                  Dates
                </Heading>
                <span className={styles.summaryValue}>{tripDates}</span>
              </div>
              <div className={styles.summaryItem}>
                <Heading level={3} className={styles.summaryName}>
                  Duration
                </Heading>
                <span className={styles.summaryValue}>{tripDuration}</span>
              </div>
              {hasRichText(cost) && (
                <div className={styles.summaryItem}>
                  <Heading level={3} className={styles.summaryName}>
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
                  <Heading level={3} className={styles.summaryName}>
                    Trip size
                  </Heading>
                  <span className={styles.summaryValue}>{tripSize}</span>
                </div>
              )}
            </div>
            <div className={styles.actions}>
              {status === 'notify' && inquireURL?.cached_url && (
                <div>
                  <Heading level={3} className={styles.summaryName}>
                    Reservations are not yet open for this destination.
                  </Heading>
                  <span className={styles.summaryValue}>
                    Inquire now for the best chance at securing a spot. We’ll
                    notify you as soon as details are available and the trip is
                    open for registration.
                  </span>
                </div>
              )}
              {status === 'reserve' && reservationURL?.cached_url && (
                <SAALinkButton
                  link={reservationURL}
                  className={{ 'su-w-full': true, 'su-w-fit': false }}
                  align="center"
                  size="small"
                >
                  Reserve
                </SAALinkButton>
              )}
              {status === 'notify' && inquireURL?.cached_url && (
                <SAALinkButton
                  link={inquireURL}
                  className={{ 'su-w-full': true, 'su-w-fit': false }}
                  align="center"
                  size="small"
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
        {overviewBelowContent && overviewBelowContent.length > 0 && (
          <div className="trip-page-overview-below-content">
            <CreateBloks blokSection={overviewBelowContent} />
          </div>
        )}
      </TripPageSectionWrapper>
    </div>
  );
});
TripPageOverviewSection.propTypes = TripPageOverviewSectionProps;
