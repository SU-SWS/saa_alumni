import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { Grid } from '../../layout/Grid';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
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
} from './registationFormOptions';
import {
  findPreferredEmail,
  findPreferredEmailType,
  findPreferredPhoneNumber,
  findPreferredPhoneNumberType,
} from '../../../utilities/giveGabVars';

const InterstitialPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        content: { title: tripTitle },
      },
      ankleContent,
    },
    blok,
    location,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip: ${tripTitle}`;
  const slug = location.pathname.replace(/\/$/, '');
  const { userProfile } = useContext(AuthContext);
  const relationships = userProfile?.relationships;

  const structureTravelerData = (relationshipsData = []) => {
    let relatedContacts = [];
    let data = {};
    relationshipsData?.forEach((relationship) => {
      data = {
        su_did: relationship?.relatedContactEncodedID,
        su_dname: `${relationship?.relatedContactFullNameParsed?.relatedContactFirstName} ${relationship?.relatedContactFullNameParsed?.relatedContactLastName}`,
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
        removeBtn: false,
      };
      relatedContacts = [...relatedContacts, data];
    });
    return relatedContacts;
  };

  const relatedContacts = structureTravelerData(relationships);
  const primaryRegistrant = {
    su_did: userProfile?.encodedSUID,
    su_dname: `${userProfile?.name?.fullNameParsed?.firstName} ${userProfile?.name?.fullNameParsed?.lastName}`,
    su_title: findSelectOption(
      prefixSelectList,
      userProfile?.name?.fullNameParsed?.prefix
    ),
    su_first_name: userProfile?.name?.fullNameParsed?.firstName,
    su_middle_name:
      userProfile?.name?.fullNameParsed?.middleName === null
        ? '&nbsp;'
        : userProfile?.name?.fullNameParsed?.middleName,
    su_last_name: userProfile?.name?.fullNameParsed?.lastName,
    su_email: findPreferredEmail(userProfile?.emails),
    su_email_type: findPreferredEmailType(userProfile?.emails),
    su_phone: findPreferredPhoneNumber(userProfile?.phoneNumbers),
    su_phone_type: findPreferredPhoneNumberType(userProfile?.phoneNumbers),
    su_dob: userProfile?.birthDate,
    su_relation: 'Self',
    su_reg: 'Primary registrant',
    removeBtn: false,
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
              <Helmet titleTemplate={title} title={title} />
              <Container className="su-cc su-rs-pb-8">
                <Heading level={1} align="left" font="serif" id="page-title">
                  {title}
                </Heading>
                {hasRichText(body) && (
                  <RichTextRenderer
                    wysiwyg={body}
                    className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
                  />
                )}
                {relationships?.length > 0 ? (
                  <Grid gap md={12}>
                    {/* TODO: ADAPT-4677 Determine how we want to pass the registrant's data (which must include their name, email, address) */}
                    <TripTravelerCard traveler={primaryRegistrant} />
                    {relatedContacts.map((relatedContact) => (
                      <TripTravelerCard
                        key={relatedContact.did}
                        traveler={relatedContact}
                      />
                    ))}
                  </Grid>
                ) : (
                  <p>No relationships are available at this time</p>
                )}
                {/* Relationship? List */}
                <Heading level={2} align="left" font="serif">
                  Your trip registrants
                </Heading>
                <p>
                  Please confirm that you would like to register the following
                  people for this trip. Please note that you will be able to add
                  the above people later if you choose, but you will have to
                  enter their information manually.
                </p>
                <TripTravelerList />
                <FormContext.Consumer>
                  {(value) => (
                    <Link
                      to={`${slug}/form`}
                      className="su-button"
                      state={{ travelers: value[0].travelersData }}
                    >
                      Next
                    </Link>
                  )}
                </FormContext.Consumer>
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
