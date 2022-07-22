import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import Hero from '../../composite/hero';
import { Grid } from '../../layout/Grid';
import {
  FormContextProvider,
  FormContext,
} from '../../../contexts/FormContext';
import AuthContext from '../../../contexts/AuthContext';
import TripTravelerCard from './tripTravelerCard';
import TripTravelerList from './tripTravelerList';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import {
  findSelectOption,
  prefixSelectList,
  relationshipSelectList,
  emailTypeList,
  phoneNumberTypeList,
} from './registationFormOptions';
import {
  findEmail,
  findPreferredEmailType,
  findPhoneNumber,
  findPreferredPhoneNumberType,
} from '../../../utilities/giveGabVars';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import FaIcon from '../../simple/faIcon';

const InterstitialPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        content: { title: tripTitle },
      },
      heroImage: { filename, alt, focus } = {},
      ankleContent,
    },
    blok,
    location,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip`;
  const helmetTitle = `Register for your trip: ${tripTitle}`;
  const slug = location.pathname.replace(/\/$/, '');
  const heroProps = {
    image: { filename, alt, focus },
    headline: title,
    headlineSize: 'medium',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };
  const { userProfile } = useContext(AuthContext);
  const relationships = userProfile?.relationships;

  const structureTravelerData = (relationshipsData = []) => {
    let relatedContacts = [];
    let data = {};
    relationshipsData?.forEach((relationship) => {
      data = {
        su_did: relationship?.relatedContactEncodedID,
        su_dname: relationship?.relatedContactDigitalName
          ? relationship?.relatedContactDigitalName
          : `${relationship?.relatedContactFullNameParsed?.relatedContactFirstName} ${relationship?.relatedContactFullNameParsed?.relatedContactLastName}`,
        su_title: findSelectOption(
          prefixSelectList,
          relationship?.relatedContactFullNameParsed?.relatedContactPrefix
        ),
        su_first_name:
          relationship?.relatedContactFullNameParsed?.relatedContactFirstName,
        su_middle_name:
          relationship?.relatedContactFullNameParsed
            ?.relatedContactMiddleName === null
            ? '&nbsp;'
            : relationship?.relatedContactFullNameParsed
                ?.relatedContactMiddleName,
        su_last_name:
          relationship?.relatedContactFullNameParsed?.relatedContactLastName,
        su_relation: findSelectOption(
          relationshipSelectList,
          relationship?.relationshipType
        ),
        su_dob: relationship?.relatedContactBirthDate,
        su_reg: 'Related contact',
        su_email: undefined,
        su_phone: undefined,
      };
      relatedContacts = [...relatedContacts, data];
    });
    return relatedContacts;
  };
  const relatedContacts = structureTravelerData(relationships);

  const primaryRegistrantEmail = findEmail(userProfile?.emails);
  const primaryRegistrantEmailType = findPreferredEmailType(
    userProfile?.emails,
    primaryRegistrantEmail
  );
  const primaryRegistrantPhoneNumber = findPhoneNumber(
    userProfile?.phoneNumbers
  );
  const primaryRegistrantPhoneNumberType = findPreferredPhoneNumberType(
    userProfile?.phoneNumbers,
    primaryRegistrantPhoneNumber
  );

  let digitalName;
  if (userProfile?.name?.digitalName) {
    digitalName = userProfile?.name?.digitalName;
  } else if (userProfile?.name?.fullNameParsed?.firstName) {
    digitalName = `${userProfile?.name?.fullNameParsed?.firstName} ${userProfile?.name?.fullNameParsed?.lastName}`;
  } else {
    digitalName = `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`;
  }

  const primaryRegistrant = {
    su_did: userProfile?.session?.encodedSUID,
    su_dname: digitalName,
    su_title: findSelectOption(
      prefixSelectList,
      userProfile?.name?.fullNameParsed?.prefix || 'Mx.'
    ),
    su_first_name:
      userProfile?.name?.fullNameParsed?.firstName ||
      userProfile?.session?.firstName,
    su_middle_name:
      userProfile?.name?.fullNameParsed?.middleName === null ||
      userProfile?.name?.fullNameParsed?.middleName === undefined
        ? '&nbsp;'
        : userProfile?.name?.fullNameParsed?.middleName,
    su_last_name:
      userProfile?.name?.fullNameParsed?.lastName ||
      userProfile?.session?.lastName,
    su_email: primaryRegistrantEmail || userProfile?.session?.email,
    su_email_type: findSelectOption(emailTypeList, primaryRegistrantEmailType),
    su_phone: primaryRegistrantPhoneNumber,
    su_phone_type: findSelectOption(
      phoneNumberTypeList,
      primaryRegistrantPhoneNumberType
    ),
    su_dob: userProfile?.birthDate,
    su_relation: 'Guest',
    su_reg: 'Primary registrant',
  };

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Layout {...props}>
            <Container
              as="main"
              id="main-content"
              className="basic-page su-relative su-flex-grow su-w-full"
              width="full"
            >
              <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
              <Hero blok={heroProps} />
              <Container className="su-cc su-rs-pb-8 su-bg-saa-black su-text-white">
                <Grid xs={12} className="su-rs-pb-8">
                  <GridCell
                    xs={12}
                    lg={6}
                    className="lg:su-col-start-4 xl:su-col-start-4"
                  >
                    <Heading
                      level={2}
                      align="center"
                      font="serif"
                      className="su-rs-mt-7"
                    >
                      {tripTitle}:<br />
                      Registration
                    </Heading>
                    {body && (
                      <p className="su-subheading su-text-center">{body}</p>
                    )}
                  </GridCell>
                </Grid>
                <Grid xs={12}>
                  <GridCell xs={12} md={6}>
                    <Heading level={3} align="left" font="serif">
                      Add existing connections and past travelers to your trip
                    </Heading>
                  </GridCell>
                  <GridCell xs={12} md={7} lg={8}>
                    <p className="su-intro-text">
                      We recommend adding the people listed below in this step,
                      as you won’t be able to later. You will be able to add
                      people not listed below later in the process.
                    </p>
                  </GridCell>
                </Grid>
                <Grid gap xs={12}>
                  <GridCell xs={12} md={7} lg={8}>
                    <FlexBox direction="col" gap>
                      <TripTravelerCard traveler={primaryRegistrant} />
                      {relationships?.length > 0 ? (
                        <>
                          {relatedContacts.map((relatedContact) => (
                            <TripTravelerCard
                              key={relatedContact.su_did}
                              traveler={relatedContact}
                            />
                          ))}
                        </>
                      ) : (
                        <p className="su-text-center su-basefont-23">
                          No additional travelers are available at this time
                        </p>
                      )}
                    </FlexBox>
                  </GridCell>
                  <GridCell xs={12} md={5} lg={4}>
                    <div className="su-border-3 su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue su-px-58 su-pt-58 su-pb-72">
                      <Heading level={4} size="3" align="left" font="serif">
                        Added travelers
                      </Heading>
                      <TripTravelerList />
                      <FormContext.Consumer>
                        {(value) => (
                          <FlexBox justifyContent="center">
                            <Link
                              to={`${slug}/form`}
                              className="su-button su-mt-36 su-px-20 su-pt-10 su-pb-11 md:su-px-36 md:su-pt-[22px] md:su-pb-[24px] su-text-18 md:su-text-24"
                              state={{ travelers: value[0].travelersData }}
                            >
                              Next
                              <FaIcon
                                iconChoice="fa-long-arrow-right"
                                iconType="far"
                                isOutline="false"
                                fixedWidth
                                className="su-ml-02em su-transition-colors"
                              />
                            </Link>
                          </FlexBox>
                        )}
                      </FormContext.Consumer>
                    </div>
                  </GridCell>
                </Grid>
              </Container>
              {numAnkle > 0 && <Ankle isDark {...props} />}
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default InterstitialPage;
