import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
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

const RelatedContactSelection = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {} },
    blok,
    pageContext,
  } = props;
  const helmetTitle = `Stanford Alumni Association Membership`;
  // @TODO: Determine how slug can be passed into the Gatsby Link as an absolute vs addition
  const slug = pageContext.slug.replace(/\/$/, '');

  const { userProfile } = useContext(AuthContext);
  const relationships = userProfile?.relationships;

  const structureRelatedContactData = (relationshipsData = []) => {
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
          : '',
        su_reg: 'Related contact',
        su_email: undefined,
        su_phone: undefined,
      };
      relatedContacts = [...relatedContacts, data];
    });
    return relatedContacts;
  };
  const relatedContacts = structureRelatedContactData(relationships);

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
                    <FlexBox justifyContent="center" className="su-rs-py-2">
                      <Logo className="su-w-200 md:su-w-300 2xl:su-w-[350px]" />
                    </FlexBox>
                    <Heading>Select a recipient</Heading>
                    <p className="su-mb-0">
                      Help someone become a membership of the Stanford Alumni
                      Association.
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
                            heading={relatedContact.su_dname}
                            subheading={relatedContact.su_relation}
                            initial={relatedContact.su_dname.slice(0, 1)}
                            member={relatedContact}
                          />
                        </GridCell>
                      ))}
                      <GridCell xs={12} md={6}>
                        <MembershipCard
                          heading="New Contact"
                          subheading="Add new contact"
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
                      <FormContext.Consumer>
                        {(value) => {
                          const isContactSelected =
                            value[0].registrantsData.length === 0;
                          return (
                            <Link
                              to="/membership/register/form"
                              className={styles.nextLink(isContactSelected)}
                              state={{ registrant: value[0].registrantsData }}
                            >
                              Next
                              <HeroIcon
                                iconType="arrow-right"
                                className={styles.nextLinkIcon}
                                isAnimate={!isContactSelected}
                              />
                            </Link>
                          );
                        }}
                      </FormContext.Consumer>
                    </FlexBox>
                    {/* @TODO: Inquire about digital membership card link */}
                    <Grid gap xs={12}>
                      <GridCell xs={12} md={8} className="md:su-col-start-3">
                        <p className="su-text-center">
                          Please note: All memberships, both domestic and
                          international, will have access to a{' '}
                          <a
                            className="su-text-white hocus:su-text-digital-red-light"
                            href="/"
                          >
                            digital membership card
                          </a>{' '}
                          in lieu of a physical membership packet. Additionally,
                          we are unable to send SAA Member key tags to addresses
                          outside of the US. (note linked digital membership
                          card)
                        </p>
                      </GridCell>
                    </Grid>
                  </div>
                </GridCell>
              </Grid>
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default RelatedContactSelection;
