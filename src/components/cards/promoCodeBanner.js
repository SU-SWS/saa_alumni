import React from 'react';
import HeroIcon from '../simple/heroIcon';
import { Heading } from '../simple/Heading';
import { CopyButton } from '../composite/CopyButton/CopyButton';
import { FlexBox } from '../layout/FlexBox';

const PromoCodeBanner = ({ blok }) => (
  <FlexBox direction="col" alignItems="center" className="su-bg-saa-black">
    <Heading font="serif" size={3} className="su-text-black-20">
      {blok.introText}
    </Heading>
    <div className="su-type-1 su-rs-mb-0 su-text-center su-text-black-20">
      {blok.promoCode}
    </div>
    <CopyButton
      variant="link"
      className="su-rs-mb-4"
      copyText={blok.promoCode}
      copySuccess={
        <span>
          <HeroIcon
            iconType="check"
            className="su-text-[3rem] su-inline-block su-text-palo-verde su-mr-03em"
          />
          Promo code copied!
        </span>
      }
    >
      <HeroIcon
        iconType="document-duplicate"
        className="su-text-[3rem] su-inline-block su-text-black-80 su-mr-03em group-hocus:su-text-white"
      />
      Copy promo code
    </CopyButton>
  </FlexBox>
);

export default PromoCodeBanner;
