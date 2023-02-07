import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Redirect } from '@reach/router';
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
import Logo from '../../identity/logo';
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
    pageContext: {
      story: { full_slug: registrationSlug },
    },
  } = props;
  const helmetTitle = `Stanford Alumni Association Membership`;
  // @TODO: Determine how slug can be passed into the Gatsby Link as an absolute vs addition
  const slug = pageContext.slug.replace(/\/$/, '');
  let promoCode = location?.state?.promoCode;
  const { userProfile } = useContext(AuthContext);
  if (promoCode === 'alum_myself_full') {
    promoCode = 'buy_someone';
  }

  // In the event that the user goes directly to the related contact page,
  // redirect user back to insteritial page to select registration type
  if (!location?.state?.registrant) {
    return <Redirect to={registrationSlug} noThrow />;
  }

  // Map related contacts/relationships data to GiveGab ADC values
  const relationships = userProfile?.relationships;
  const structureRelatedContactData = (relationshipsData = []) => {
    let relatedContacts = [];
    let data = {};
    relationshipsData?.forEach((relationship) => {
      data = {
        // @TODO: Should su_did be the related contact or the registering user's encodedSUID?
        su_did: relationship?.relatedContactEncodedID,
        su_dname: relationship?.relatedContactDigitalName,
        su_first_name:
          relationship?.relatedContactFullNameParsed?.relatedContactFirstName,
        su_last_name:
          relationship?.relatedContactFullNameParsed?.relatedContactLastName,
        su_recipient_dob: relationship?.relatedContactBirthDate
          ? formatUsDate(relationship?.relatedContactBirthDate)
          : '',
        su_recipient_first_name:
          relationship?.relatedContactFullNameParsed?.relatedContactFirstName,
        su_recipient_last_name:
          relationship?.relatedContactFullNameParsed?.relatedContactLastName,
        su_recipient_relationship: relationship?.relationshipType,
        su_recipient_suid: relationship?.relatedContactEncodedID,
        su_email: undefined,
        su_phone: undefined,
        su_recipient_email: undefined,
        su_recipient_email_type: undefined,
        su_recipient_phone: undefined,
        su_recipient_phone_type: undefined,
        su_self_membership: 'no',
        su_gift: 'yes',
      };
      relatedContacts = [...relatedContacts, data];
    });
    return relatedContacts;
  };
  const relatedContacts = structureRelatedContactData(relationships);

  const newContact = {
    su_reg_type: 'newContact',
    su_self_membership: 'no',
    su_gift: 'yes',
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
                      <GridCell xs={12} md={10} className={styles.formWrapper}>
                        <div className={styles.contentStyle}>
                          <span className={styles.superHead}>
                            Stanford Alumni Association Membership
                          </span>
                          <Heading
                            level={1}
                            size="6"
                            align="center"
                            font="serif"
                            id="page-title"
                          >
                            Welcome,{' '}
                            {userProfile?.name?.fullNameParsed?.firstName ||
                              userProfile?.session.firstName}
                          </Heading>
                        </div>
                        <div className={styles.contactWrapper}>
                          <FlexBox
                            justifyContent="center"
                            className="su-rs-py-2"
                          >
                            <Logo className="su-w-200 md:su-w-300 2xl:su-w-[350px]" />
                          </FlexBox>
                          <Heading>Select a recipient</Heading>
                          <p className="su-mb-0">
                            Help someone become a membership of the Stanford
                            Alumni Association.
                          </p>
                          <p>
                            Please select a recipient from your list of contacts
                            below.
                          </p>
                          <Grid gap xs={12} className="su-rs-pb-2 su-rs-pt-1">
                            {/* DISPLAY RELATED CONTACTS HERE */}
                            {relatedContacts.map((relatedContact) => (
                              <GridCell xs={12} md={6}>
                                <MembershipCard
                                  heading={`${relatedContact.su_first_name} ${relatedContact.su_last_name}`}
                                  subheading={
                                    relatedContact.su_recipient_relationship
                                  }
                                  initial={relatedContact.su_first_name.slice(
                                    0,
                                    1
                                  )}
                                  memberData={relatedContact}
                                  disabled={
                                    value[0].registrantsData.length !== 0 &&
                                    value[0].registrantsData[0]?.su_did !==
                                      relatedContact.su_did
                                  }
                                />
                              </GridCell>
                            ))}
                            <GridCell xs={12} md={6}>
                              <MembershipCard
                                heading="New Contact"
                                subheading="Add new contact"
                                memberData={newContact}
                                disabled={
                                  value[0].registrantsData.length !== 0 &&
                                  value[0].registrantsData[0]?.su_did !==
                                    newContact.su_did
                                }
                                newContact
                              />
                            </GridCell>
                          </Grid>
                          <FlexBox
                            justifyContent="evenly"
                            alignItems="center"
                            className="su-rs-mb-4"
                          >
                            <Link
                              to="/membership/register"
                              className={styles.goBackLink}
                            >
                              <HeroIcon
                                iconType="arrow-left"
                                className={styles.goBackLinkIcon}
                                isAnimate
                              />
                              Go back
                            </Link>
                            <Link
                              to="/membership/register/form"
                              className={styles.nextLink(isContactSelected)}
                              state={{
                                registrant: value[0].registrantsData,
                                promoCode,
                              }}
                            >
                              Next
                              <HeroIcon
                                iconType="arrow-right"
                                className={styles.nextLinkIcon}
                                isAnimate={!isContactSelected}
                              />
                            </Link>
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
