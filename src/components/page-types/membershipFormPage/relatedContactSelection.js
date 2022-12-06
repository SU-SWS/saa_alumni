import React, { useContext, useState } from 'react';
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
import { SAAButton } from '../../simple/SAAButton';

const RelatedContactSelection = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {} },
    blok,
    location,
  } = props;
  const helmetTitle = `Stanford Alumni Association Membership`;
  const slug = location.pathname.replace(/\/$/, '');
  const [selectedContact, setSelectedContact] = useState([]);

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

  const selectRelatedContact = (relatedContact) => {
    console.log('Selected!');
    return setSelectedContact[relatedContact];
  };

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
        <Layout hasHero="true" {...props}>
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
              <GridCell
                xs={12}
                md={10}
                xl={8}
                xxl={6}
                className={styles.formWrapper}
              >
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
                  {/* Alumni logo here */}
                  <Heading>Select a recipient</Heading>
                  <p>
                    Help someone become a membership of the Stanford Alumni
                    Association.
                  </p>
                  <p>
                    Please select a recipient from your list of contacts below.
                  </p>
                  <FlexBox>
                    {/* DISPLAY RELATED CONTACTS HERE */}
                    {relatedContacts.map((relatedContact) => (
                      <div className="su-p-2 su-b-1">
                        <p>{relatedContact.su_dname}</p>
                        <p>{relatedContact.su_reg}</p>
                        <SAAButton
                          icon="none"
                          onClick={selectRelatedContact(relatedContact)}
                        >
                          Select
                        </SAAButton>
                      </div>
                    ))}
                    <div className="su-p-2 su-b-1">
                      <p>Add New Contact</p>
                      <p>New contact</p>
                      <SAAButton icon="plus">Create new</SAAButton>
                    </div>
                  </FlexBox>
                  <FlexBox>
                    <Link
                      to={`${slug}/form`}
                      className={styles.contactLink}
                      state={{ registrant: selectedContact }}
                    >
                      Next
                      <HeroIcon
                        iconType="arrow-right"
                        className={styles.contactLinkIcon}
                        isAnimate
                      />
                    </Link>
                  </FlexBox>
                  <p>
                    Please note: All memberships, both domestic and
                    international, will have access to a{' '}
                    <a href="/">digital membership card</a> in lieu of a
                    physical membership packet. Additionally, we are unable to
                    send SAA Member key tags to addresses outside of the US.
                    (note linked digital membership card)
                  </p>
                </div>
              </GridCell>
            </Grid>
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default RelatedContactSelection;
