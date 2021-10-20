import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import * as styles from './TripPageExtensionSection.styles';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';

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

export const TripPageExtensionSection = React.forwardRef((props, ref) => {
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

  return (
    <div ref={ref}>
      <TripPageSectionWrapper isCenter={isCenterExtendHeader}>
        <TripPageSectionHeader
          isCenter={isCenterExtendHeader}
          heading={extendHeading}
          body={extendIntro}
        />
        {extendItinerary && extendItinerary.length > 0 && (
          <div className={dcnb('trip-extension-itinerary', styles.itinerary)}>
            <CreateBloks blokSection={extendItinerary} />
          </div>
        )}
        {hasRichText(extendBody) && (
          <div className={dcnb('trip-extension-body', styles.body)}>
            <RichTextRenderer wysiwyg={extendBody} />
          </div>
        )}
      </TripPageSectionWrapper>
    </div>
  );
});
TripPageExtensionSection.propTypes = TripPageExtensionSectionProps;
