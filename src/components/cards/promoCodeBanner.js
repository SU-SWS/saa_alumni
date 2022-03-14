import React, {createRef, useState} from 'react';
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
  }

  return (
    <>
      <div className="su-type-3 su-font-bold su-font-serif su-mb-36">{blok.introText}</div>
      <div className="su-text-[29px] su-mb-[22px] su-text-center su-text-black-20"
           ref={code}>{blok.promoCode}</div>
      <div className="su-relative">
        <span className="su-flex su-justify-center su-items-center su-cursor-pointer"
              onClick={() => copy()}>
          <HeroIcon
            iconType="document-duplicate"
            className="su-text-[#585754] su-mr-12 su-mt-0"
          />
          Copy promo code
          <HeroIcon
            iconType="arrow-right"
            className="su-text-digital-red-light su-mt-4"
          />
        </span>

        {showCopyText &&
        <span className="su-flex su-absolute su-right-0 su-top-0">
          <HeroIcon
            iconType="check"
            className="su-text-palo-verde su-mr-[20px]"
          />
          Copied
        </span>
        }
      </div>
    </>
  )
}

export default PromoCodeBanner;
