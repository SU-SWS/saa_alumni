import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { Button, CtaButton, Container } from 'decanter-react';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { getDate, getDuration } from '../../../utilities/dates';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { CopyButton } from '../../composite/CopyButton/CopyButton';
import * as styles from './TripPageOverviewSection.styles';
import CreateBloks from '../../../utilities/createBloks';

export const TripPageOverviewSectionProps = {
  onPrint: PropTypes.func,
  overviewHeading: PropTypes.string,
  overviewBody: SBRichTextType,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  durationText: PropTypes.string,
  cost: PropTypes.string,
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  overviewBelowContent: SBBlokType,
};

export const TripPageOverviewSection = (props) => {
  const {
    onPrint,
    overviewHeading,
    overviewBody,
    startDate,
    endDate,
    durationText,
    cost,
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
    <TripPageSectionWrapper heading="Overview">
      <Container width="site" className={styles.main}>
        <div className={styles.content}>
          <h3 className={styles.heading}>{overviewHeading}</h3>
          <RichTextRenderer wysiwyg={overviewBody} />
        </div>
        <div className={styles.summary}>
          <p className={styles.summaryItem}>
            <strong className={styles.summaryName}>Dates</strong>
            <span className={styles.summaryValue}>{tripDates}</span>
          </p>
          <p className={styles.summaryItem}>
            <strong className={styles.summaryName}>Duration</strong>
            <span className={styles.summaryValue}>{tripDuration}</span>
          </p>
          {cost && (
            <p className={styles.summaryItem}>
              <strong className={styles.summaryName}>Cost</strong>
              <span className={styles.summaryValue}>{cost}</span>
            </p>
          )}
          <div className={styles.actions}>
            {reservationURL?.cached_url && (
              <div>
                <CtaButton
                  className={styles.ctaBtn}
                  href={reservationURL?.cached_url}
                  text="Reserve"
                  icon="more"
                  animate="right"
                />
              </div>
            )}
            {!reservationURL?.cached_url && inquireURL?.cached_url && (
              <div>
                <CtaButton
                  className={styles.ctaBtn}
                  href={inquireURL.cached_url}
                  text="Inquire"
                  icon="more"
                  animate="right"
                />
              </div>
            )}
            {onPrint && (
              <div>
                <Button
                  className={styles.ctaBtn}
                  icon="more"
                  animate="right"
                  onClick={onPrint}
                  variant="outline"
                >
                  Print
                </Button>
              </div>
            )}
            <div>
              <CopyButton
                className={styles.ctaBtn}
                icon="more"
                animate="right"
                copyText={location.href}
                variant="outline"
              >
                Copy link to share
              </CopyButton>
            </div>
          </div>
        </div>
      </Container>
      {overviewBelowContent && overviewBelowContent.length > 0 && (
        <div className="trip-page-overview-below-content">
          <CreateBloks blokSection={overviewBelowContent} />
        </div>
      )}
    </TripPageSectionWrapper>
  );
};
TripPageOverviewSection.propTypes = TripPageOverviewSectionProps;
