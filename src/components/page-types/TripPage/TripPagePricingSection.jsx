import React from 'react';
import PropTypes from 'prop-types';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { SBRichTextType } from '../../../types/storyblok/SBRichTextType';
import { TripPageSectionWrapper } from './TripPageSectionWrapper';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import getNumBloks from '../../../utilities/getNumBloks';

export const TripPagePricingSectionProps = {
  pricingHeading: PropTypes.string,
  pricingBody: SBRichTextType,
  pricingBelowContent: SBBlokType,
  isCenterPricingHeader: PropTypes.bool,
};

export const TripPagePricingSection = React.forwardRef((props, ref) => {
  const {
    pricingHeading,
    pricingBody,
    pricingBelowContent,
    isCenterPricingHeader,
  } = props;

  return (
    <div ref={ref}>
      <TripPageSectionWrapper
        heading="Pricing"
        isCenter={isCenterPricingHeader}
      >
        <TripPageSectionHeader
          isCenter={isCenterPricingHeader}
          heading={pricingHeading}
          body={pricingBody}
        />
        {getNumBloks(pricingBelowContent) > 0 && (
          <div className="trip-page-pricing-below-content">
            <CreateBloks blokSection={pricingBelowContent} />
          </div>
        )}
      </TripPageSectionWrapper>
    </div>
  );
});
TripPagePricingSection.propTypes = TripPagePricingSectionProps;
