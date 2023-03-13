import React, { useState, useContext, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import CtaGroup from '../cta/ctaGroup';
import AuthContext from '../../contexts/AuthContext';

const MembershipCard = ({ blok }) => {
  const [bgColor, setBgColor] = useState('su-bg-[#C3363A]');
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
        const response = await import(`../../images/exampleMembershipCard.png`);
        setExampleImage(response.default);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!auth.isAuthenticating) {
      if (auth.isAuthenticated) {
        // TODO: Figure out why this discrepancy in data
        const affiliations =
          auth.userProfile.affiliations.affiliations ||
          auth.userProfile.affiliations;
        // TODO: Check if the logic is correct
        if (affiliations.length === 0) {
          setNoCard(true);
        } else if (affiliations.filter((s) => s.includes('GSB'))) {
          fetchImages(true, 'gsb-card-logo.png', 'gsb-card-bg.jpg');
          setBgColor('su-bg-[#C3363A]');
        } else if (affiliations.filter((s) => s.includes('SAA'))) {
          // TODO: Replace names when the correct images will be added
          fetchImages(true, 'gsb-card-logo.png', 'gsb-card-bg.jpg');
          setBgColor('su-bg-[#B30838]');
        } else {
          // TODO: Replace names when the correct images will be added
          fetchImages(true, 'gsb-card-logo.png', 'gsb-card-bg.jpg');
          setBgColor('su-bg-[#C3363A]');
        }
      } else {
        setNoCard(true);
        fetchImages(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticating, auth.isAuthenticated]);

  return (
    <>
      {!auth.isAuthenticating && (
        <div className="sm:su-w-[520px] md:su-w-full md:su-w-full su-mx-auto lg:su--mt-[70px]">
          {!noCard && (
            <h2 className="su-mb-34 md:su-mb-58 su-font-serif">Your card</h2>
          )}
          <div className="lg:su-flex lg:su-px-20">
            <div
              className={dcnb(
                'su-text-white su-relative su-overflow-hidden su-rounded-[25px] md:su-rounded-[50px] md:su-rounded-[70px] sm:su-w-[520px] su-mb-50 sm:su-mb-90 lg:su-mb-0',
                bgColor
              )}
            >
              {noCard ? (
                <img src={exampleImage} alt="" />
              ) : (
                <div className="su-relative su-w-full su-pt-[63%]">
                  <div className="su-absolute su-top-0 su-w-full su-h-full">
                    <div className="su-relative su-flex su-flex-col su-justify-between su-h-full su-flex su-text-[38px] su-z-10">
                      <div className="su-top-0 su-left-0 su-w-[85%] su-h-[50%] su-flex su-items-center">
                        <img
                          src={logo}
                          alt=""
                          className="su-max-w-full su-max-h-full"
                        />
                      </div>

                      <div className="su-flex su-flex-col su-pb-[23px] md:su-pb-[40px] su-px-[12px] md:su-px-[25px] su-text-[14px] sm:su-text-[22px]">
                        <span className="su-text-[22px] sm:su-text-[30px] su-font-semibold">
                          {auth.userProfile?.name?.fullNameParsed?.firstName}{' '}
                          {auth.userProfile?.name?.fullNameParsed?.lastName}
                        </span>
                        <span>{auth.userProfile?.membership?.id}</span>
                        <span>{auth.userProfile?.membership?.type}</span>
                      </div>
                    </div>
                    <div className="su-absolute su-top-1/2 -su-translate-y-1/2 su-left-[40%] su-w-full su-h-0 su-pt-[90%] su-overflow-hidden su-rounded-full">
                      <div className="su-absolute su-inset-0">
                        <img
                          className="su-absolute su-inset-0 su-min-h-full"
                          src={bgImage}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="su-flex su-items-center lg:su-rs-ml-5 xl:su-rs-ml-7 print:su-hidden">
              {noCard ? (
                <div>
                  <div className="su-mb-10">
                    You are not currently a Stanford Alumni Association (SAA)
                    Member
                  </div>
                  <ul className="su-list-none su-p-0 su-m-0">
                    <li>
                      <a href="http://TODO">Become an SAA Member</a>
                    </li>
                    <li>
                      <a href="http://TODO">See the full list of Benefits</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="[&>.cta-group]:su-gap-[10px] [&>.cta-group]:sm:su-gap-[20px]">
                  <CtaGroup blok={blok.ctaGroup[0]} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipCard;
