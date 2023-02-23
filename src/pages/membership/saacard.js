import React, { useState, useContext, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import { PrinterIcon, StarIcon, CashIcon } from '@heroicons/react/outline';
import AuthContext from '../../contexts/AuthContext';
import { SAACtaLink } from '../../components/cta/SAACtaLink';

const SaaCard = () => {
  const [bgColor, setBgColor] = useState('su-bg-[#C3363A]');
  const [noCard, setNoCard] = useState(false);
  const [bgImage, setBgImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const auth = useContext(AuthContext);

  const fetchImages = async (logoPath, bgPath) => {
    try {
      const responseLogo = await import(`../../images/${logoPath}`); // change relative path to suit your needs
      const responseBg = await import(`../../images/${bgPath}`); // change relative path to suit your needs
      setLogo(responseLogo.default);
      setBgImage(responseBg.default);
    } catch (err) {
      console.log(err);
    }
  };

  const print = (e) => {
    e.preventDefault();
    window.print();
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      // TODO: Check if the logic is correct
      if (auth.userProfile.affiliations.length === 0) {
        setNoCard(true);
      } else if (
        auth.userProfile.affiliations.filter((s) => s.includes('GSB'))
      ) {
        fetchImages('gsb-card-logo.png', 'gsb-card-bg.jpg');
        setBgColor('su-bg-[#C3363A]');
      } else if (
        auth.userProfile.affiliations.filter((s) => s.includes('SAA'))
      ) {
        // TODO: Replace names when the correct images will be added
        fetchImages('gsb-card-logo.png', 'gsb-card-bg.jpg');
        setBgColor('su-bg-[#B30838]');
      } else {
        // TODO: Replace names when the correct images will be added
        fetchImages('gsb-card-logo.png', 'gsb-card-bg.jpg');
        setBgColor('su-bg-[#C3363A]');
        setBgColor('#E4D4B0');
      }
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      {auth.isAuthenticated && (
        <div className="su-cc">
          {!noCard && <h4>Your card</h4>}
          <div className="2xl:su-flex">
            <div
              className={dcnb(
                'su-text-white su-relative su-overflow-hidden su-rounded-[100px] su-min-w-[900px] su-w-[900px] su-h-[567px] su-mb-20 xl:mb-0',
                bgColor
              )}
            >
              <div className="su-relative su-flex su-flex-col su-justify-between su-h-full su-flex su-pt-[30px] su-text-[38px] su-z-10">
                <img src={logo} alt="" className="su-max-w-[400px] mu-ml-20" />

                {!noCard && (
                  <div className="su-flex su-flex-col su-pb-[70px] su-pl-[37px] ">
                    <span className="su-text-[55px] su-font-semibold">
                      {auth.userProfile?.name?.fullNameParsed?.firstName}{' '}
                      {auth.userProfile?.name?.fullNameParsed?.lastName}
                    </span>
                    <span>{auth.userProfile.membership?.id}</span>
                    <span>{auth.userProfile.membership?.type}</span>
                  </div>
                )}
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
                <ul className="su-list-none su-p-0 su-m-0">
                  <li className="su-flex">
                    <PrinterIcon className="su-w-26 su-mr-20" />
                    <SAACtaLink
                      linkText="Print your membership card"
                      trailingIcon="arrow-right"
                      size="small"
                      isOutlineFaIcon
                      onClick={(e) => print(e)}
                      className="!su-text-digital-red-light"
                      textColor="all-black"
                    />
                  </li>
                  <li className="su-flex">
                    <StarIcon className="su-w-26 su-mr-20" />
                    <SAACtaLink
                      link="#"
                      linkText="View membership benefits"
                      trailingIcon="arrow-right"
                      size="small"
                      isOutlineFaIcon
                      className="!su-text-digital-red-light"
                      textColor="all-black"
                    />
                  </li>
                  <li className="su-flex">
                    <CashIcon className="su-w-26 su-mr-20" />
                    <SAACtaLink
                      link="#"
                      linkText="Make an installment payment online"
                      trailingIcon="arrow-right"
                      isOutlineFaIcon
                      size="small"
                      className="!su-text-digital-red-light"
                      textColor="all-black"
                    />
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaaCard;
