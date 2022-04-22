import React, { useContext, useEffect } from 'react';
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
import TripRelationshipCard from './tripRelationshipCard';
import TripRelationshipList from './tripRelationshipList';
import AuthenticatedPage from '../../auth/AuthenticatedPage';

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
  const { userProfile } = useContext(AuthContext);
  const slug = location.pathname.replace(/\/$/, '');

  // TODO: ADAPT-4677 Remove fake data once relationships endpoint is working
  // const { relationships } = userProfile;
  const relationships = {
    relationships: [
      {
        id: '4e98cb4e-77e5-491a-9786-11ddd20ee4b2',
        type: 'Spouse/Partner',
        digitalName: 'Max Dataton',
        birthDate: '2015-02-10',
      },
      {
        id: '62364aca-1e2c-47f5-9cc2-d83986a5edfe',
        type: 'Child',
        digitalName: 'Asha Yost',
        birthDate: '1998-01-02',
      },
      {
        id: 'af1104c0-c373-427b-b564-87ed991af420',
        type: 'Child',
        digitalName: 'Dino Okuneva',
        birthDate: '1936-07-27',
      },
      {
        id: '9ad905be-79cf-4faf-b2bb-c944aa9e6f87',
        type: 'Child',
        digitalName: 'Lou Beier',
        birthDate: '2005-04-14',
      },
      {
        id: '1014caad-8e28-4508-b2a0-0ad7f3cf4cf2',
        type: 'Child',
        digitalName: 'Alessia Jacobi',
        birthDate: '1971-04-19',
      },
      {
        id: 'd0a82cf2-9271-4e68-801f-755a3f2fee00',
        type: 'Child',
        digitalName: 'Michael Rotkowitz',
        birthDate: '2006-02-17',
      },
    ],
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
                {relationships.relationships.length > 0 ? (
                  <Grid gap md={12}>
                    {/* TODO: ADAPT-4677 Determine how we want to pass the registrant's data (which must include their name, email, address) */}
                    <TripRelationshipCard traveler={userProfile?.user} />
                    {relationships.relationships.map((relationship) => (
                      <TripRelationshipCard
                        key={relationship.id}
                        traveler={relationship}
                      />
                    ))}
                  </Grid>
                ) : (
                  <p>No relationships are available at this time</p>
                )}
                {/* Relationship List */}
                <Heading level={2} align="left" font="serif">
                  Your trip registrants
                </Heading>
                <p>
                  Please confirm that you would like to register the following
                  people for this trip. Please note that you will be able to add
                  the above people later if you choose, but you will have to
                  enter their information manually.
                </p>
                <TripRelationshipList />
                <FormContext.Consumer>
                  {(value) => (
                    <Link
                      to={`${slug}/form`}
                      className="su-button"
                      state={{ guests: value[0].travelersData }}
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
