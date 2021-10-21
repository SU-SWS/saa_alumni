import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCell, Heading } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import * as styles from './TripPageExtensionSection.styles';
import * as overviewStyles from './TripPageOverviewSection.styles';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import { getDuration } from '../../../utilities/dates';
import getNumBloks from '../../../utilities/getNumBloks';

export const TripPageExtensionSectionProps = {
  extendHeading: PropTypes.string,
  extendIntro: SBRichTextType,
  extendBody: SBRichTextType,
  extendStartDate: PropTypes.string,
  extendEndDate: PropTypes.string,
  extendPrice: PropTypes.string,
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
    extendItinerary,
    isCenterExtendHeader,
  } = props;

  const extendDuration = useMemo(() => {
    const { days: dayDuration } = getDuration(extendStartDate, extendEndDate);

    if (dayDuration >= 0) {
      const days = dayDuration + 1;
      const nights = dayDuration;

      return `${days} day${days === 1 ? '' : 's'}, ${nights} night${
        nights === 1 ? '' : 's'
      }`;
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
            <div className={overviewStyles.summaryItem}>
              <Heading level={3} className={overviewStyles.summaryName}>
                Duration
              </Heading>
              <span className={overviewStyles.summaryValue}>
                {extendDuration}
              </span>
            </div>
          </div>
          {extendPrice && (
            <div className={overviewStyles.summaryContent}>
              <div className={overviewStyles.summaryItem}>
                <Heading level={3} className={overviewStyles.summaryName}>
                  Price
                </Heading>
                <span className={overviewStyles.summaryValue}>
                  {extendPrice}
                </span>
              </div>
            </div>
          )}
        </GridCell>
      </Grid>
      {getNumBloks(extendItinerary) > 0 && (
        <CreateBloks blokSection={extendItinerary} />
      )}
    </section>
  );
};
TripPageExtensionSection.propTypes = TripPageExtensionSectionProps;
