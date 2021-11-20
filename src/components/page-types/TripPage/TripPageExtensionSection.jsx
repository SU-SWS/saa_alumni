import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCell } from 'decanter-react';
import { Heading } from '../../simple/Heading';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import * as styles from './TripPageExtensionSection.styles';
import * as overviewStyles from './TripPageOverviewSection.styles';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import { getDate, getDuration } from '../../../utilities/dates';
import getNumBloks from '../../../utilities/getNumBloks';

export const TripPageExtensionSectionProps = {
  extendHeading: PropTypes.string,
  extendIntro: SBRichTextType,
  extendBody: SBRichTextType,
  extendStartDate: PropTypes.string,
  extendEndDate: PropTypes.string,
  extendPrice: PropTypes.string,
  extendTripSize: PropTypes.string,
  extendAboveContent: SBBlokType,
  extendItinerary: SBBlokType,
  isCenterExtendHeader: PropTypes.bool,
};

export const TripPageExtensionSection = (props) => {
  const {
    extendHeading,
    extendIntro,
    extendBody,
    extendStartDate,
    extendEndDate,
    extendPrice,
    extendTripSize,
    extendAboveContent,
    extendItinerary,
    isCenterExtendHeader,
  } = props;
  const extendDates = useMemo(() => {
    const start = getDate(extendStartDate);
    const end = getDate(extendEndDate);
    return `${start.month} ${start.day}${
      start.year !== end.year ? `, ${start.year}` : ''
    }–${
      end.month === start.month && end.year === start.year
        ? ''
        : `${end.month} `
    }${end.day}, ${end.year}`;
  }, [extendStartDate, extendEndDate]);
  const extendDuration = useMemo(() => {
    const { days: dayDuration } = getDuration(extendStartDate, extendEndDate);

    if (dayDuration >= 0) {
      const days = dayDuration + 1;
      return `${days} day${days === 1 ? '' : 's'}`;
    }
    return '';
  }, [extendStartDate, extendEndDate]);

  return (
    <section className={styles.root}>
      <TripPageSectionHeader
        isCenter={isCenterExtendHeader}
        heading={extendHeading}
        body={extendIntro}
      />
      <Grid gap xs={12} className={styles.main}>
        <GridCell
          xs={12}
          md={7}
          xl={8}
          xxl={7}
          className={overviewStyles.content}
        >
          {hasRichText(extendBody) && (
            <div className="trip-extension-body">
              <RichTextRenderer wysiwyg={extendBody} />
            </div>
          )}
        </GridCell>
        <GridCell xs={12} md={4} xl={3} className={styles.summary}>
          <div className={overviewStyles.summaryContent}>
            {extendStartDate && (
              <div className={overviewStyles.summaryItem}>
                <Heading level={4} className={overviewStyles.summaryName}>
                  Dates
                </Heading>
                <span className={overviewStyles.summaryValue}>
                  {extendDates}
                </span>
              </div>
            )}
            {extendDuration && (
              <div className={overviewStyles.summaryItem}>
                <Heading level={4} className={overviewStyles.summaryName}>
                  Duration
                </Heading>
                <span className={overviewStyles.summaryValue}>
                  {extendDuration}
                </span>
              </div>
            )}
            {extendPrice && (
              <div className={overviewStyles.summaryItem}>
                <Heading level={4} className={overviewStyles.summaryName}>
                  Price
                </Heading>
                <span className={overviewStyles.summaryValue}>
                  {extendPrice}
                </span>
              </div>
            )}
            {extendTripSize && (
              <div className={overviewStyles.summaryItem}>
                <Heading level={4} className={overviewStyles.summaryName}>
                  Trip size
                </Heading>
                <span className={overviewStyles.summaryValue}>
                  {extendTripSize} participants
                </span>
              </div>
            )}
          </div>
        </GridCell>
      </Grid>
      {getNumBloks(extendAboveContent) > 0 && (
        <CreateBloks blokSection={extendAboveContent} />
      )}
      {getNumBloks(extendItinerary) > 0 && (
        <div className={styles.itinerary}>
          <CreateBloks blokSection={extendItinerary} />
        </div>
      )}
    </section>
  );
};
TripPageExtensionSection.propTypes = TripPageExtensionSectionProps;
