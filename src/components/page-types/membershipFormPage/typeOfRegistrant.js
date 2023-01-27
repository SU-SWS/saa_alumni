import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { findEmail, findPhoneNumber } from '../../../utilities/giveGabVars';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import Logo from '../../identity/logo';
import MembershipCard from './membershipCard';
import AuthContext from '../../../contexts/AuthContext';
import * as styles from './typeOfRegistrant.styles';
import {
  FormContextProvider,
  FormContext,
} from '../../../contexts/FormContext';
import CreateBloks from '../../../utilities/createBloks';
import MembershipPaymentCard from './membershipPaymentCard';

const TypeOfRegistrant = (props) => {
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

  const primaryRegistrantEmail = findEmail(userProfile?.emails);

  const primaryRegistrantPhoneNumber = findPhoneNumber(
    userProfile?.phoneNumbers
  );

  const primaryUser = {
    su_did: userProfile?.session?.encodedSUID,
    su_dname:
      userProfile?.name?.digtalName ||
      `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`,
    su_first_name:
      userProfile?.name?.fullNameParsed?.firstName ||
      userProfile?.session?.firstName,
    su_last_name:
      userProfile?.name?.fullNameParsed?.lastName ||
      userProfile?.session?.lastName,
    su_email: primaryRegistrantEmail || userProfile?.session?.email,
    su_phone: primaryRegistrantPhoneNumber,
    su_self_membership: 'yes',
    su_gift: 'no',
    su_reg_type: 'self',
  };

  const newContact = { su_reg_type: 'newContact' };

  const [paymentType, setPaymentType] = useState(false);
  const togglePaymentType = (type) => {
    console.log('TYPE:', type);
    console.log('PAYMENT TYPE:', paymentType);
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
                  const isContactSelected =
                    value[0].registrantsData.length === 0;

                  let nextPageLink = '/membership/register/form';

                  if (
                    value[0].registrantsData[0]?.su_reg_type === 'newContact'
                  ) {
                    nextPageLink = '/membership/register/related-contacts';
                    setPaymentType(false);
                  }
                  if (paymentType === 'installments') {
                    nextPageLink = '/membership/register/installments/form';
                  }

                  return (
                    <Grid gap xs={12} className={styles.contentWrapper}>
                      <GridCell
                        xs={12}
                        md={10}
                        xl={8}
                        xxl={6}
                        className={styles.benefitsWrapper}
                      >
                        <span className={styles.superHead}>
                          Stanford Alumni Association Membership
                        </span>
                        <Heading
                          level={1}
                          size={6}
                          align="center"
                          font="serif"
                          id="page-title"
                        >
                          Join now!
                        </Heading>
                        <div className={dcnb('su-p-36', styles.formWrapper)}>
                          <FlexBox
                            justifyContent="center"
                            className={styles.logoWrapper}
                          >
                            <Logo className={styles.logo} />
                          </FlexBox>
                          <CreateBloks blokSection={intro} />
                        </div>
                      </GridCell>
                      <GridCell xs={12}>
                        <div className={dcnb('su-rs-p-5', styles.formWrapper)}>
                          <Heading level={2} size={4} align="left" font="serif">
                            Who do you wish to purchase a membership for?
                          </Heading>
                          <Grid gap xs={12} className={styles.cardGridWrapper}>
                            <GridCell xs={12} md={6}>
                              <MembershipCard
                                heading="Myself"
                                subheading={`${primaryUser.su_first_name} ${primaryUser.su_last_name}`}
                                initial={primaryUser.su_first_name.slice(0, 1)}
                                memberData={primaryUser}
                              />
                            </GridCell>
                            <GridCell xs={12} md={6}>
                              <MembershipCard
                                heading="Someone else"
                                subheading="Existing contact or new contact"
                                initial="?"
                                memberData={newContact}
                              />
                            </GridCell>
                          </Grid>

                          {/* PAYMENT OPTIONS */}
                          {value[0].registrantsData[0]?.su_did ===
                          primaryUser.su_did ? (
                            <Container className="su-bg-gradient-to-tr su-from-saa-electric-blue-dark su-to-palo-verde-xdark su-px-48 su-pb-76">
                              <p>Payment options</p>
                              <p>One time or installments</p>
                              <Grid
                                gap
                                xs={12}
                                className="su-p-26 su-bg-saa-black su-rounded"
                              >
                                <GridCell xs={12} md={6}>
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
                                <GridCell xs={12} md={6}>
                                  <MembershipPaymentCard
                                    heading="Pay in installments"
                                    subheading="Over 5 years"
                                    onClick={togglePaymentType}
                                    id="installments"
                                    isSelected={paymentType === 'installments'}
                                  >
                                    <CreateBloks blokSection={installments} />
                                  </MembershipPaymentCard>
                                </GridCell>
                              </Grid>
                            </Container>
                          ) : null}
                          <FlexBox justifyContent="center">
                            <Link
                              to={nextPageLink}
                              className={styles.nextLink(isContactSelected)}
                              state={{ registrant: value[0].registrantsData }}
                            >
                              Select membership type
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

export default TypeOfRegistrant;
