import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import AuthContext from '../../contexts/AuthContext';

/*
 * @TODO: ADAPTSM-174 — Build out StoryBlok component for the GSB Digital Membership Card display
 */
const GsbCard = ({ blok }) => {
  const [noCard, setNoCard] = useState(false);
  const [bgImage, setBgImage] = useState(null);
  const [exampleImage, setExampleImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const auth = useContext(AuthContext);

  const fetchImages = async (loggedIn, logoPath, bgPath) => {
    try {
      if (loggedIn) {
        const responseLogo = await import(`../../images/${logoPath}`);
        setLogo(responseLogo.default);
        const responseBg = await import(`../../images/${bgPath}`);
        setBgImage(responseBg.default);
      } else {
        const response = await import(`../../images/gsb-example.png`);
        setExampleImage(response.default);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const membership = auth.userProfile.membership || {};
    if (membership.membershipGroup?.includes('GSB')) {
      fetchImages(true, 'gsb-card-logo.png', 'gsb-card-bg.jpg');
    } else {
      setNoCard(true);
      fetchImages(false);
    }
  }, [auth]);

  return (
    <SbEditable content={blok}>
      {!auth.isAuthenticating && (
        <div className="print:su-w-[3in] print:su-h-[2in] sm:su-w-[520px] md:su-w-full md:su-w-full su-mx-auto lg:su--mt-[70px]">
          {!noCard && (
            <h2 className="su-mb-34 md:su-mb-58 su-font-serif">Your card</h2>
          )}
          <div className="lg:su-flex lg:su-px-20">
            <div className="su-relative su-overflow-hidden su-rounded-[3rem] sm:su-w-[520px] su-mb-50 sm:su-mb-90 lg:su-mb-0 su-bg-[#C3363A]">
              {noCard ? (
                <img src={exampleImage} alt="Example GSB Digital Member Card" />
              ) : (
                <div className="su-relative su-w-full su-pt-[63%]">
                  <div className="su-absolute su-top-0 su-w-full su-h-full">
                    <div className="su-relative su-flex su-flex-col su-h-full su-flex su-text-[38px] su-z-10 su-justify-between">
                      <div className="su-top-0 su-left-0 su-flex su-items-center su-w-[85%] su-h-[50%]">
                        <img
                          src={logo}
                          alt=""
                          className="su-max-w-full su-max-h-full"
                        />
                      </div>
                      <div className="su-flex su-flex-col su-pb-[2.3rem] md:su-pb-[4rem] su-text-14 sm:su-text-22 su-px-[1.2rem] md:su-px-[2.5rem]">
                        <span className="su-text-22 sm:su-type-2 su-font-semibold">
                          {auth.userProfile?.name?.fullNameParsed?.firstName}{' '}
                          {auth.userProfile?.name?.fullNameParsed?.lastName}
                        </span>
                        <span>
                          {auth.userProfile?.membership?.membershipNumber}
                        </span>
                        <span>{auth.userProfile?.membership?.type}</span>
                      </div>
                    </div>
                    <div className="'su-absolute su-w-full su-top-1/2 -su-translate-y-1/2 su-left-[40%] su-rounded-full su-h-0 su-pt-[90%] su-overflow-hidden'">
                      <div className="su-absolute su-inset-0">
                        <img
                          className="su-absolute su-min-h-full su-inset-0"
                          src={bgImage}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SbEditable>
  );
};

export default GsbCard;
