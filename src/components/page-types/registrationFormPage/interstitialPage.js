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
import TripPrimaryCard from './tripPrimaryCard';
import TripTravelerCard from './tripTravelerCard';
import TripTravelerList from './tripTravelerList';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import {
  findSelectOption,
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
import HeroIcon from '../../simple/heroIcon';
import * as styles from './interstitialPage.styles';
import { formatUsDate } from '../../../utilities/transformDate';

const InterstitialPage = (props) => {
  const {
    blok: {
      trip: {
        content: {
          title: tripTitle,
          tripDeposit,
          preTripExtensionDeposit,
          postTripExtensionDeposit,
        },
      },
      heroImage: { filename, alt, focus } = {},
      ankleContent,
    },
    blok,
    location,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const helmetTitle = `Register for your trip: ${tripTitle}`;
  const slug = location.pathname.replace(/\/$/, '');
  const heroProps = {
    image: { filename, alt, focus },
    sansSuper: 'Registration for',
    headline: tripTitle,
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
        su_title:
          relationship?.relatedContactFullNameParsed?.relatedContactPrefix,
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
        su_relation: relationship?.relationshipType,
        su_dob: relationship?.relatedContactBirthDate
          ? formatUsDate(relationship?.relatedContactBirthDate)
          : undefined,
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
    su_title: userProfile?.name?.fullNameParsed?.prefix,
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
    su_dob: userProfile?.birthDate
      ? formatUsDate(userProfile?.birthDate)
      : undefined,
    su_relation: 'Guest',
    su_reg: 'Primary registrant',
  };

  const extensionDeposit =
    preTripExtensionDeposit || postTripExtensionDeposit || false;

  const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
          <Layout hasHero="true" {...props}>
            <Container
              as="main"
              id="main-content"
              className={styles.container}
              width="full"
            >
              <Hero blok={heroProps} />
              <Container className={styles.contentWrapper}>
                <Grid gap xs={12} className={styles.depositWrapper}>
                  <GridCell
                    xs={12}
                    lg={10}
                    xl={8}
                    className={styles.depositContent}
                  >
                    <Heading
                      level={3}
                      size={5}
                      align="left"
                      font="serif"
                      className={styles.noMarginBottom}
                    >
                      Before you register
                    </Heading>
                    <p className={styles.gridText}>
                      A deposit of {formatUSD.format(tripDeposit)} per traveler
                      is required upon registration.
                      <br />
                      {extensionDeposit && (
                        <>
                          For extensions, an additional deposit of{` `}
                          {formatUSD.format(extensionDeposit)} per traveler is
                          required.
                        </>
                      )}
                    </p>
                    <p className={styles.gridText}>
                      Looking to surprise someone with this trip? Enter your
                      email in place of theirs to ensure that your gift is kept
                      private.
                    </p>
                  </GridCell>
                </Grid>
                <Grid gap xs={12} className={styles.gridContent}>
                  <GridCell xs={12} lg={8}>
                    <Heading
                      level={3}
                      size={5}
                      align="left"
                      font="serif"
                      className={styles.noMarginBottom}
                    >
                      Add existing connections
                    </Heading>
                    <p className={styles.gridText}>
                      If you are traveling with any of the friends or family
                      listed below, select them here to use the information we
                      have on record for them. You will be able to add
                      additional guests later.
                    </p>
                  </GridCell>
                </Grid>
                <Grid gap xs={12}>
                  <GridCell xs={12} md={7} lg={8}>
                    <FlexBox
                      direction="col"
                      className={styles.gridTravelerList}
                    >
                      <TripPrimaryCard traveler={primaryRegistrant} />
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
                        <p className={styles.travelerEmptyText}>
                          No existing connections are available at this time
                        </p>
                      )}
                    </FlexBox>
                  </GridCell>
                  <GridCell xs={12} md={5} lg={4}>
                    <div className={styles.gridTravelerBox}>
                      <Heading level={4} size="3" align="left" font="serif">
                        Added travelers
                      </Heading>
                      <TripTravelerList />
                      <FormContext.Consumer>
                        {(value) => (
                          <FlexBox justifyContent="center">
                            <Link
                              to={`${slug}/form`}
                              className={styles.travelerLink}
                              state={{ travelers: value[0].travelersData }}
                            >
                              Next
                              <HeroIcon
                                iconType="arrow-right"
                                className={styles.travelerLinkIcon}
                                isAnimate
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
