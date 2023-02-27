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
  }, [auth.isAuthenticating, auth.isAuthenticated]);

  return (
    <>
      {!auth.isAuthenticating && (
        <div className="su-cc">
          {!noCard && <h4>Your card</h4>}
          <div className="2xl:su-flex">
            <div
              className={dcnb(
                'su-text-white su-relative su-overflow-hidden su-rounded-[100px] su-min-w-[900px] su-w-[900px] su-h-[567px] su-mb-20 xl:mb-0',
                bgColor
              )}
            >
              {noCard ? (
                <img src={exampleImage} alt="" />
              ) : (
                <>
                  <div className="su-relative su-flex su-flex-col su-justify-between su-h-full su-flex su-pt-[30px] su-text-[38px] su-z-10">
                    <img
                      src={logo}
                      alt=""
                      className="su-max-w-[400px] mu-ml-20"
                    />
                    <div className="su-flex su-flex-col su-pb-[70px] su-pl-[37px] ">
                      <span className="su-text-[55px] su-font-semibold">
                        {auth.userProfile?.name?.fullNameParsed?.firstName}{' '}
                        {auth.userProfile?.name?.fullNameParsed?.lastName}
                      </span>
                      <span>{auth.userProfile?.membership?.id}</span>
                      <span>{auth.userProfile?.membership?.type}</span>
                    </div>
                  </div>
                  <div className="su-absolute su-top-1/2 -su-translate-y-1/2 su-left-[40%] f su-w-full su-h-0 su-pt-[90%] su-overflow-hidden su-rounded-full">
                    <div className="su-absolute su-inset-0">
                      <img
                        className="su-absolute su-inset-0 su-min-h-full"
                        src={bgImage}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="su-flex su-items-center 2xl:su-rs-ml-7 print:su-hidden">
              {noCard ? (
                <div>
                  <div className="su-mb-10">
                    You are not currently a Stanford Alumni Association (SAA)
                    Member
                  </div>
                  <ul className="su-list-none su-p-0 su-m-0">
                    <li>
                      <a href="#">Become an SAA Member</a>
                    </li>
                    <li>
                      <a href="#">See the full list of Benefits</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <CtaGroup blok={blok.ctaGroup[0]} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipCard;
