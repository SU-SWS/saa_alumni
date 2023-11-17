import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import AuthContext from '../../contexts/AuthContext';
import CreateBloks from '../../utilities/createBloks';
import GsbCardBg from '../../images/gsb-card-bg.png';
import GsbLogoWhite from '../../images/gsb_alumni-white.png';
import RichTextRenderer from '../../utilities/richTextRenderer';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';

const GsbCard = ({ blok: { ctaGroup, noAccessMessage }, blok }, props) => {
  const [isGsbMember, setIsGsbMember] = useState(false);
  const { userProfile } = useContext(AuthContext);
  const { degreeStringNametagWithCert } = userProfile.contact;

  useEffect(() => {
    const gsbAffiliations = ['GSB Alum', 'GSB SEP', 'GSB Life Member'];
    const affiliations = userProfile.affiliation.affiliations || [];
    const isGsbAlum = gsbAffiliations.some((affiliation) =>
      affiliations.includes(affiliation)
    );
    if (isGsbAlum) setIsGsbMember(true);
  }, [userProfile]);

  return (
    <SbEditable content={blok}>
      <Grid gap className="su-cc" xs={12}>
        <GridCell className="lg:su-col-start-2" xs={12} md={12} lg={10}>
          {isGsbMember ? (
            <div className="print:su-w-[3in] print:su-h-[2in] sm:su-w-[520px] md:su-w-full md:su-w-full su-mx-auto lg:su--mt-[70px]">
              <div className="sm:su-mx-auto sm:su-w-fit su-flex-col lg:su-w-full lg:su-flex-row lg:su-flex">
                <div className="su-relative su-overflow-hidden su-rounded-[3rem] sm:su-w-[520px] su-mb-50 sm:su-mb-90 lg:su-mb-0 su-text-white su-bg-cardinal-red-light">
                  <div className="su-relative su-w-full su-pt-[63%]">
                    <div className="su-absolute su-top-0 su-w-full su-h-full">
                      <div className="su-relative su-flex su-flex-col su-h-full su-flex su-text-[38px] su-z-10 su-pl-[5%]">
                        <div className="su-top-0 su-left-0 su-flex su-items-center su-w-[63%] su-h-[35%]">
                          <img
                            src={GsbLogoWhite}
                            alt=""
                            className="su-max-w-full su-max-h-full"
                          />
                        </div>
                        <div className="su-flex su-flex-col su-pb-[2.3rem] md:su-pb-[4rem] su-text-14 sm:su-text-22 su-mt-auto">
                          <span className="su-text-22 sm:su-type-2 su-font-semibold">
                            {
                              userProfile?.contact?.name?.fullNameParsed
                                ?.firstName
                            }{' '}
                            {
                              userProfile?.contact?.name?.fullNameParsed
                                ?.lastName
                            }
                          </span>
                          <span>{degreeStringNametagWithCert}</span>
                        </div>
                      </div>
                      <div className="su-absolute su-w-full su-h-full su-top-0 su-right-0">
                        <div className="su-absolute su-inset-0">
                          <img
                            className="su-absolute su-h-full su-top-0 su-right-0"
                            src={GsbCardBg}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="su-flex su-items-center lg:su-rs-ml-5 xl:su-rs-ml-7 print:su-hidden">
                  <div className="[&>.cta-group]:su-gap-[10px] [&>.cta-group]:sm:su-gap-[20px]">
                    <CreateBloks blokSection={ctaGroup} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <RichTextRenderer wysiwyg={noAccessMessage} />
            </div>
          )}
        </GridCell>
      </Grid>
    </SbEditable>
  );
};

export default GsbCard;
