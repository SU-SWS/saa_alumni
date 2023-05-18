import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Redirect, useLocation } from '@reach/router';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import Layout from '../../partials/layout';
import { Grid } from '../../layout/Grid';
import AuthContext from '../../../contexts/AuthContext';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { GridCell } from '../../layout/GridCell';
import * as styles from './relatedContactSelection.styles';
import { formatUsDate } from '../../../utilities/transformDate';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import { findEmail, findPhoneNumber } from '../../../utilities/giveGabVars';
import MembershipCard from './membershipCard';
import {
  FormContext,
  FormContextProvider,
} from '../../../contexts/FormContext';
import CreateBloks from '../../../utilities/createBloks';

const RelatedContactSelection = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {}, membershipCardNote },
    blok,
    location,
    pageContext,
  } = props;

  const urlLocation = useLocation();
  const helmetTitle = `Stanford Alumni Association Membership`;
  const slug = urlLocation.pathname.replace(/\/?related-contacts\/?$/, '');
  const formLink = `${slug}/form`;
  const promoCode = location?.state?.promoCode;
  const { userProfile } = useContext(AuthContext);

  // In the event that the user goes directly to the related contact page,
  // redirect user back to insteritial page to select registration type
  if (!location?.state?.registrant && pageContext?.story) {
    return <Redirect to={pageContext.story.full_slug} noThrow />;
  }

  // Map related contacts/relationships data to GiveGab ADC values
  const primaryRegistrantEmail = findEmail(userProfile?.emails);
  const primaryRegistrantPhoneNumber = findPhoneNumber(
    userProfile?.phoneNumbers
  );

  const relationships = userProfile?.relationships;
  const structureRelatedContactData = (relationshipsData = []) => {
    let relatedContacts = [];
    let data = {};
    relationshipsData?.forEach((relationship) => {
      data = {
        su_did: userProfile?.session?.encodedSUID,
        su_dname:
          userProfile?.contact.name?.digtalName ||
          `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`,
        su_first_name:
          userProfile?.contact.name?.fullNameParsed?.firstName ||
          userProfile?.session?.firstName,
        su_last_name:
          userProfile?.contact.name?.fullNameParsed?.lastName ||
          userProfile?.session?.lastName,
        su_email: primaryRegistrantEmail || userProfile?.session?.email,
        su_phone: primaryRegistrantPhoneNumber,
        su_recipient_dob: relationship?.birthDate
          ? formatUsDate(relationship?.birthDate)
          : '',
        su_recipient_first_name:
          relationship?.relatedContactFullNameParsed?.relatedContactFirstName,
        su_recipient_last_name:
          relationship?.relatedContactFullNameParsed?.relatedContactLastName,
        su_recipient_relationship: relationship?.type,
        su_recipient_suid: relationship?.relatedContactEncodedSUID,
        su_recipient_email: undefined,
        su_recipient_email_type: undefined,
        su_recipient_phone: undefined,
        su_recipient_phone_type: undefined,
        su_self_membership: 'no',
        su_gift: 'yes',
        su_affiliations: userProfile?.affiliations,
      };
      relatedContacts = [...relatedContacts, data];
    });
    return relatedContacts;
  };
  const relatedContacts = structureRelatedContactData(relationships);

  const newContact = {
    su_did: userProfile?.session?.encodedSUID,
    su_dname:
      userProfile?.contact.name?.digtalName ||
      `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`,
    su_first_name:
      userProfile?.contact.name?.fullNameParsed?.firstName ||
      userProfile?.session?.firstName,
    su_last_name:
      userProfile?.contact.name?.fullNameParsed?.lastName ||
      userProfile?.session?.lastName,
    su_email: primaryRegistrantEmail || userProfile?.session?.email,
    su_phone: primaryRegistrantPhoneNumber,
    su_reg_type: 'newContact',
    su_self_membership: 'no',
  };

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
          <Layout {...props}>
            <Container
              as="main"
              id="main-content"
              className={styles.container}
              width="full"
            >
              <div className={styles.fixedHero}>
                <HeroImage
                  filename={filename}
                  alt={alt}
                  focus={focus}
                  overlay="formDark"
                  aspectRatio="5x2"
                  className={styles.fixedHeroImg}
                />
              </div>
              <FormContext.Consumer>
                {(value) => {
                  const isContactSelected =
                    value[0].registrantsData.length === 0;
                  return (
                    <Grid
                      gap
                      xs={12}
                      className={styles.contentWrapper}
                      id="su-gg-embed"
                    >
                      <GridCell
                        xs={12}
                        xxl={10}
                        className={styles.gridCellWrapper}
                      >
                        <div className={styles.contentStyle}>
                          <span className={styles.superHead}>
                            Stanford Alumni Association
                            <br />
                            Membership
                          </span>
                          <Heading
                            level={1}
                            size="6"
                            align="center"
                            font="serif"
                            id="page-title"
                            className={styles.heading}
                          >
                            Welcome,{' '}
                            {userProfile?.contact.name?.fullNameParsed
                              ?.firstName || userProfile?.session.firstName}
                          </Heading>
                        </div>
                        <div className={styles.contactWrapper}>
                          <Heading level={2} size="4" font="serif">
                            Select a recipient
                          </Heading>
                          <p className={styles.helpText}>
                            Please select a recipient from your list of contacts
                            below.
                          </p>
                          <Grid gap xs={12} className={styles.cardGroupWrapper}>
                            {/* DISPLAY RELATED CONTACTS HERE */}
                            {relatedContacts.map((relatedContact) => (
                              <GridCell
                                xs={12}
                                xl={6}
                                className={styles.cardGridWrapper}
                              >
                                <MembershipCard
                                  heading={`${relatedContact.su_recipient_first_name} ${relatedContact.su_recipient_last_name}`}
                                  subheading={
                                    relatedContact.su_recipient_relationship
                                  }
                                  initial={relatedContact.su_recipient_first_name.slice(
                                    0,
                                    1
                                  )}
                                  memberData={relatedContact}
                                />
                              </GridCell>
                            ))}
                            <GridCell
                              xs={12}
                              xl={6}
                              className={styles.cardGridWrapper}
                            >
                              <MembershipCard
                                heading="New Contact"
                                subheading="Add new contact"
                                memberData={newContact}
                                newContact
                              />
                            </GridCell>
                          </Grid>
                          <FlexBox
                            justifyContent="center"
                            alignItems="center"
                            className={styles.linkWrapper}
                          >
                            <Link
                              to={slug + location.search}
                              className={styles.goBackLink}
                            >
                              <HeroIcon
                                iconType="arrow-left"
                                className={styles.goBackLinkIcon}
                                isAnimate
                              />
                              Go back
                            </Link>
                            {isContactSelected ? (
                              <div className={styles.nextLinkDisabled}>
                                Next
                                <HeroIcon
                                  iconType="arrow-right"
                                  className={styles.nextLinkIcon}
                                />
                              </div>
                            ) : (
                              <Link
                                to={formLink}
                                className={styles.nextLinkActive}
                                state={{
                                  registrant: value[0].registrantsData,
                                  promoCode,
                                }}
                              >
                                Next
                                <HeroIcon
                                  iconType="arrow-right"
                                  className={styles.nextLinkIcon}
                                  isAnimate
                                />
                              </Link>
                            )}
                          </FlexBox>
                          <Grid gap xs={12}>
                            <GridCell
                              xs={12}
                              md={8}
                              className="md:su-col-start-3"
                            >
                              <CreateBloks blokSection={membershipCardNote} />
                            </GridCell>
                          </Grid>
                        </div>
                      </GridCell>
                    </Grid>
                  );
                }}
              </FormContext.Consumer>
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default RelatedContactSelection;
