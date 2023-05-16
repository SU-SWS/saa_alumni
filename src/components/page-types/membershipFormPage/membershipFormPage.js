import React, { useEffect, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { fetchEmail, fetchPhone } from '../../../utilities/giveGabVars';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import Logo from '../../identity/logo';
import MembershipCard from './membershipCard';
import AuthContext from '../../../contexts/AuthContext';
import * as styles from './membershipFormPage.styles';
import {
  FormContextProvider,
  FormContext,
} from '../../../contexts/FormContext';
import CreateBloks from '../../../utilities/createBloks';
import MembershipPaymentCard from './membershipPaymentCard';
import { formatUsDate } from '../../../utilities/transformDate';
import { isAlum } from '../../../utilities/isAlum';

// The type of registrant interstitial page has been set as the default preview within StoryBlok
const MembershipFormPage = (props) => {
  const {
    blok: {
      heroImage: { filename, alt, focus } = {},
      intro,
      membershipCardNote,
      oneTimePayment,
      installments,
    },
    blok,
  } = props;
  const { userProfile } = useContext(AuthContext);
  const helmetTitle = 'Stanford Alumni Association Membership';

  // Determine if user is an Alum
  const affiliations = userProfile?.affiliation.affiliations || [];

  // If url parameters include an appeal_code, parse and set the promo code input value
  const location = useLocation();
  const [promoCode, setPromoCode] = useState('');
  let paymentTypeCode = isAlum(affiliations)
    ? 'alum_myself_full'
    : 'aff_fr_myself';

  const appealCode = location?.href
    ? new URL(location.href).searchParams.get('appeal_code')
    : '';

  useEffect(() => {
    if (appealCode) setPromoCode(appealCode);
  }, [appealCode]);

  const getPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  // If the user has an existing SAA membership, they should not be permitted to purchase another membership for themselves
  // See MembershipCard(~L290) for "Myself" for additional conditionals and config
  const memberships = userProfile?.memberships || [];
  const isSaaMember = memberships.filter(
    (membership) =>
      !!(
        membership.membershipGroup === 'SAA' &&
        membership.membershipStatus === 'Active'
      )
  );

  const emailData = fetchEmail(
    userProfile?.emails,
    userProfile?.contact?.preferredEmail
  );

  const primaryRegistrantEmail = emailData?.email
    ? emailData.email
    : userProfile?.session.email;
  const primaryRegistrantEmailType = emailData?.type ? emailData.type : null;

  const phoneData = fetchPhone(
    userProfile?.phoneNumbers,
    userProfile?.contact?.preferredPhoneType
  );

  const primaryRegistrantPhoneNumber = phoneData?.phoneNumber
    ? phoneData.phoneNumber
    : null;
  const primaryRegistrantPhoneNumberType = phoneData?.type
    ? phoneData.type
    : null;

  const primaryUser = {
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
    su_email: primaryRegistrantEmail,
    su_phone: primaryRegistrantPhoneNumber,
    su_recipient_dob: userProfile?.contact.birthDate
      ? formatUsDate(userProfile?.contact.birthDate)
      : '',
    su_recipient_first_name:
      userProfile?.contact.name?.fullNameParsed?.firstName ||
      userProfile?.session?.firstName,
    su_recipient_last_name:
      userProfile?.contact.name?.fullNameParsed?.lastName ||
      userProfile?.session?.lastName,
    su_recipient_relationship: 'Guest',
    su_recipient_suid: userProfile?.session?.encodedSUID,
    su_recipient_email: primaryRegistrantEmail,
    su_recipient_email_type: primaryRegistrantEmailType || undefined,
    su_recipient_phone: primaryRegistrantPhoneNumber,
    su_recipient_phone_type: primaryRegistrantPhoneNumberType || undefined,
    su_self_membership: 'yes',
    su_gift: 'no',
    su_reg_type: 'self',
    su_affiliations: affiliations,
  };

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

  const [paymentType, setPaymentType] = useState('oneTime');
  const togglePaymentType = (type) => {
    // Reset to false if the payment type is the same
    setPaymentType(type === paymentType ? false : type);
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
                  // This function handles whether an active or disabled button should appear
                  // based on whether the user is an Alum or Friend/Unknown.
                  // If the user is an Alum, they will need to select the payment type before being able to process
                  // If the user is an Friend/Unknown, they can continue to the full payment form
                  const isContactSelected = () => {
                    if (
                      value[0].registrantsData[0]?.su_reg_type === 'self' &&
                      (paymentType || !isAlum(affiliations))
                    ) {
                      return true;
                    }
                    if (
                      value[0].registrantsData[0]?.su_reg_type === 'newContact'
                    ) {
                      return true;
                    }
                    return false;
                  };

                  // Set the pay in full form as the default location
                  let nextPageLink = `${location.pathname.replace(
                    /\/$/,
                    ''
                  )}/form`;

                  // If the user is purchasing for Someone else, set the payment type to false and direct them to the related contacts page
                  if (
                    value[0].registrantsData[0]?.su_reg_type === 'newContact'
                  ) {
                    setPaymentType(false);
                    nextPageLink = `${location.pathname.replace(
                      /\/$/,
                      ''
                    )}/related-contacts`;
                    // If the user is purchasing for a Someone else, the payment code should always be defined as buy_someone
                    paymentTypeCode = 'buy_someone';
                    // If there is no related contacts available, go directly to the form
                    if (
                      !userProfile?.relationships ||
                      userProfile?.relationships.length === 0
                    ) {
                      nextPageLink = `${location.pathname.replace(
                        /\/$/,
                        ''
                      )}/form`;
                    }
                  }

                  // If the user is purchasing for Myself and decided to purchase with an installment, confirm they are an Alum before continuing to the installments form
                  if (paymentType === 'installments' && isAlum(affiliations)) {
                    nextPageLink = `${location.pathname.replace(
                      /\/$/,
                      ''
                    )}/installment/form`;
                    // If there is no promo code, set the urlData to alum_myself_install
                    if (appealCode?.length === 0 || promoCode.length === 0) {
                      paymentTypeCode = 'alum_myself_install';
                    }
                  }

                  // If user is an Alum and selects "Myself", toggle the payment option section
                  let paymentOptionSection = false;
                  if (
                    value[0].registrantsData[0]?.su_recipient_suid ===
                      primaryUser.su_recipient_suid &&
                    isAlum(affiliations)
                  ) {
                    paymentOptionSection = true;
                  }

                  return (
                    <Grid gap xs={12} className={styles.contentWrapper}>
                      <GridCell
                        xs={12}
                        xxl={10}
                        className={styles.benefitsWrapper}
                      >
                        <span className={styles.superHead}>
                          Stanford Alumni Association <br /> Membership
                        </span>
                        <Heading
                          level={1}
                          size={6}
                          align="center"
                          font="serif"
                          id="page-title"
                          className={styles.heading}
                        >
                          Join now!
                        </Heading>
                        <div className={styles.formWrapper}>
                          <FlexBox
                            justifyContent="center"
                            className={styles.logoWrapper}
                          >
                            <Logo className={styles.logo} />
                          </FlexBox>
                          <CreateBloks blokSection={intro} />
                        </div>
                      </GridCell>
                      <GridCell
                        xs={12}
                        xxl={10}
                        className={styles.purchaseWrapper}
                      >
                        <div className={styles.formWrapper}>
                          <Heading
                            level={2}
                            size={3}
                            align="left"
                            font="serif"
                            className={styles.cardGridHeading}
                          >
                            Who do you wish to purchase a membership for?
                          </Heading>
                          <Grid gap xs={12} className={styles.cardGridWrapper}>
                            <GridCell xs={12} xl={6}>
                              <MembershipCard
                                heading="Myself"
                                subheading={`${primaryUser.su_first_name} ${primaryUser.su_last_name}`}
                                initial={primaryUser.su_first_name.slice(0, 1)}
                                memberData={primaryUser}
                                aria-expanded={paymentOptionSection}
                                id="su-myself-payment"
                                membershipInfo={
                                  isSaaMember.length > 0
                                    ? isSaaMember[0]
                                    : false
                                }
                                enabled
                              />
                            </GridCell>
                            <GridCell xs={12} xl={6}>
                              <MembershipCard
                                heading="Someone else"
                                subheading="Existing contact or new contact"
                                initial="?"
                                memberData={newContact}
                              />
                            </GridCell>
                          </Grid>
                          {/* PAYMENT OPTIONS */}
                          <div
                            className={styles.paymentOuterWrapper(
                              paymentOptionSection
                            )}
                            aria-labelledby="su-myself-payment"
                          >
                            <div className={styles.paymentInnerWrapper}>
                              <div className={styles.paymentHeadingWrapper}>
                                <Heading
                                  level={2}
                                  size={2}
                                  font="serif"
                                  className="su-mb-0"
                                >
                                  Payment options
                                </Heading>
                                <p>One time or installments</p>
                              </div>
                              <Grid
                                gap
                                xs={12}
                                className={styles.paymentCardsWrapper}
                              >
                                <GridCell xs={12} xl={6}>
                                  <MembershipPaymentCard
                                    heading="Pay in full"
                                    subheading="One time payment"
                                    caption="Most value"
                                    onClick={togglePaymentType}
                                    id="oneTime"
                                    isSelected={paymentType === 'oneTime'}
                                  >
                                    <CreateBloks blokSection={oneTimePayment} />
                                  </MembershipPaymentCard>
                                </GridCell>
                                <GridCell xs={12} xl={6}>
                                  <MembershipPaymentCard
                                    heading="Pay in installments"
                                    subheading="Your credit card will be automatically charged annually for a total of 5 equal payments over 5 years"
                                    onClick={togglePaymentType}
                                    id="installments"
                                    isSelected={paymentType === 'installments'}
                                  >
                                    <CreateBloks blokSection={installments} />
                                  </MembershipPaymentCard>
                                </GridCell>
                              </Grid>
                            </div>
                          </div>
                          <FlexBox alignItems="center" direction="col">
                            <FlexBox
                              direction="col"
                              className={styles.promoWrapper}
                            >
                              <label
                                htmlFor="su-promocode"
                                className={styles.promoLabel}
                              >
                                Promo code
                              </label>
                              <input
                                id="su-promocode"
                                className={styles.promoInput}
                                value={promoCode}
                                onChange={getPromoCode}
                              />
                            </FlexBox>
                          </FlexBox>
                          <FlexBox justifyContent="center">
                            {isContactSelected() ? (
                              <Link
                                to={nextPageLink}
                                className={styles.nextLinkActive}
                                state={{
                                  registrant: value[0].registrantsData,
                                  promoCode: promoCode || paymentTypeCode,
                                }}
                              >
                                Continue
                                <HeroIcon
                                  iconType="arrow-right"
                                  className={styles.nextLinkIcon}
                                  isAnimate
                                />
                              </Link>
                            ) : (
                              <div className={styles.nextLinkDisabled}>
                                Continue
                                <HeroIcon
                                  iconType="arrow-right"
                                  className={styles.nextLinkIcon}
                                />
                              </div>
                            )}
                          </FlexBox>
                          <Grid gap xs={12}>
                            <GridCell
                              xs={12}
                              md={8}
                              className={styles.cardNoteWrapper}
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

export default MembershipFormPage;
