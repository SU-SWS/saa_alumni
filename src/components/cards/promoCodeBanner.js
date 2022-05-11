import React, { createRef, useState } from 'react';
import HeroIcon from '../simple/heroIcon';

const PromoCodeBanner = ({ blok }) => {
  const code = createRef();

  const [showCopyText, setShowCopyText] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code.current.innerText);
    setShowCopyText(true);

    const timer = setTimeout(() => {
      setShowCopyText(false);
    }, 10000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="su-type-3 su-font-bold su-font-serif su-mb-36">
        {blok.introText}
      </div>
      <div
        className="su-text-[29px] su-mb-[22px] su-text-center su-text-black-20"
        ref={code}
      >
        {blok.promoCode}
      </div>
      <div className="su-relative su-rs-mb-6">
        {!showCopyText && (
          <button
            type="button"
            className="su-group su-flex su-justify-center su-items-center su-cursor-pointer su-mx-auto su-transition-colors su-no-underline su-underline-offset hocus:su-underline hocus:su-text-black-20 !su-underline-digital-red-xlight"
            onClick={() => copy()}
          >
            <HeroIcon
              iconType="document-duplicate"
              className="su-text-[#585754] su-mr-6 su-mt-0 group-hover:su-text-white group-focus:su-text-white"
            />
            Copy promo code
            <HeroIcon
              iconType="arrow-right"
              className="su-text-digital-red-light su-relative su-top-4"
            />
          </button>
        )}

        {showCopyText && (
          <span className="su-flex su-justify-center su-items-center">
            <HeroIcon
              iconType="check"
              className="su-text-palo-verde su-mr-[10px]"
            />
            Copied
          </span>
        )}
      </div>
    </>
  );
};

export default PromoCodeBanner;
