import React, { useState, useContext, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import SbEditable from 'storyblok-react';
import AuthContext from '../../contexts/AuthContext';
import CreateBloks from '../../utilities/createBloks';
import SaaCardBg from '../../images/saa-card-bg.png';
import SaaExampleCard from '../../images/saa-example.png';
import SaaLogoWhite from '../../images/stanford_alumni-white.png';
import SaaLogoColor from '../../images/stanford_alumni-color.png';

const MembershipCard = ({ blok: { publicCtaGroup, ctaGroup }, blok }) => {
  const [bgColor, setBgColor] = useState('su-bg-[#C3363A]');
  const [userType, setUserType] = useState(undefined);
  const [noCard, setNoCard] = useState(true);
  const [bgImage, setBgImage] = useState(null);
  const [exampleImage, setExampleImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [membershipNumber, setMembershipNumber] = useState('');
  const auth = useContext(AuthContext);

  const fetchImages = async (loggedIn, logoPath, bgPath) => {
    if (loggedIn) {
      setLogo(logoPath);
      setBgImage(bgPath);
    } else {
      setExampleImage(SaaExampleCard);
    }
  };

  useEffect(() => {
    const memberships = auth.userProfile.memberships || [];
    fetchImages(false);
    memberships.forEach((membership) => {
      if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        membership.membershipAffiliation?.includes('Alum')
      ) {
        fetchImages(true, SaaLogoWhite, SaaCardBg);
        setBgColor(
          'su-bg-gradient-to-b su-from-[#8E1515] su-to-digital-red-light'
        );
        setUserType('saa');
        setNoCard(false);
        setMembershipNumber(membership.membershipNumber);
      } else if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        membership.membershipAffiliation?.includes('Affiliate')
      ) {
        fetchImages(true, SaaLogoColor, SaaCardBg);
        setBgColor(
          'su-bg-gradient-to-b su-from-illuminating-dark su-to-illuminating-light'
        );
        setUserType('affiliate');
        setNoCard(false);
        setMembershipNumber(membership.membershipNumber);
      }
    });
  }, [auth]);

  return (
    <SbEditable content={blok}>
      {!auth.isAuthenticating && (
        <div className="print:su-w-[3in] print:su-h-[2in] sm:su-w-[520px] md:su-w-full md:su-w-full su-mx-auto lg:su--mt-[70px]">
          {!noCard && (
            <h2 className="su-mb-34 md:su-mb-58 su-font-serif">Your card</h2>
          )}
          <div className="lg:su-flex lg:su-px-20">
            <div
              className={dcnb(
                'su-relative su-overflow-hidden su-rounded-[3rem] sm:su-w-[520px] su-mb-50 sm:su-mb-90 lg:su-mb-0',
                userType !== 'affiliate' ? 'su-text-white' : '',
                bgColor
              )}
            >
              {noCard ? (
                <img src={exampleImage} alt="Example SAA Digital Member Card" />
              ) : (
                <div className="su-relative su-w-full su-pt-[63%]">
                  <div className="su-absolute su-top-0 su-w-full su-h-full">
                    <div className="su-relative su-flex su-flex-col su-h-full su-flex su-text-[38px] su-z-10 su-pl-[5%]">
                      <div className="su-top-0 su-left-0 su-flex su-items-center su-w-[63%] su-h-[35%]">
                        <img
                          src={logo}
                          alt=""
                          className="su-max-w-full su-max-h-full"
                        />
                      </div>

                      <div className="su-font-bold su-font-serif su-text-18 sm:su-text-22 su-w-[50%] su-h-[30%] su-pr-8 su-flex su-items-center">
                        {userType === 'saa' ? 'Alumni' : 'Affiliate'} Membership
                      </div>

                      <div
                        className={dcnb(
                          'su-flex su-flex-col su-pb-[2.3rem] md:su-pb-[4rem] su-text-14 sm:su-text-22 su-mt-auto'
                        )}
                      >
                        <span className="su-text-22 sm:su-type-2 su-font-semibold">
                          {
                            auth.userProfile?.contact?.name?.fullNameParsed
                              ?.firstName
                          }{' '}
                          {
                            auth.userProfile?.contact?.name?.fullNameParsed
                              ?.lastName
                          }
                        </span>
                        <span>{membershipNumber}</span>
                      </div>
                    </div>
                    <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
                      <div className="su-absolute su-inset-0">
                        <img
                          className={dcnb(
                            'su-absolute su-h-full su-top-0 su-right-0'
                          )}
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
                  <p className="su-card-paragraph">
                    You are not currently a Stanford Alumni Association (SAA)
                    Member
                  </p>
                  <div className="[&>.cta-group]:su-gap-[10px] [&>.cta-group]:sm:su-gap-[20px]">
                    <CreateBloks blokSection={publicCtaGroup} />
                  </div>
                </div>
              ) : (
                <div className="[&>.cta-group]:su-gap-[10px] [&>.cta-group]:sm:su-gap-[20px]">
                  <CreateBloks blokSection={ctaGroup} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SbEditable>
  );
};

export default MembershipCard;
