import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import SbLink from '../../../utilities/sbLink';
import HeroIcon from '../../simple/heroIcon';
import FormProvider from '../../../contexts/FormContext';
import TripRelationshipCard from './tripRelationshipCard';
import TripRelationshipList from './tripRelationshipList';
// import AuthenticatedPage from '../../auth/AuthenticatedPage';

const RegistrationFormPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        full_slug: fullSlug,
        content: { title: tripTitle },
      },
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip: ${tripTitle}`;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;
  const [showForm, setShowForm] = useState(false);

  // TODO: ADAPT-4677 Remove fake data once relationships endpoint is working
  // const { userProfile } = useContext(AuthContext);
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

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  useEffect(() => {
    if (showForm) {
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', onBackButtonEvent);
    }
  }, [showForm]);

  const toggleForm = () => {
    setShowForm(true);
  };

  return (
    // <AuthenticatedPage>
    <FormProvider>
      <SbEditable content={blok}>
        <Layout {...props}>
          <Container
            as="main"
            id="main-content"
            className="basic-page su-relative su-flex-grow su-w-full"
            width="full"
          >
            <Helmet titleTemplate={title} title={title} />
            {showForm ? (
              <>
                <div className="su-fixed su-top-0 su-z-0 su-h-full su-w-full">
                  <HeroImage
                    filename={filename}
                    alt={alt}
                    focus={focus}
                    overlay="formDark"
                    aspectRatio="5x2"
                    className="su-object-cover su-h-full su-w-full"
                  />
                </div>
                <Grid
                  gap
                  xs={12}
                  className="su-relative su-cc su-z-10 su-rs-pb-8"
                >
                  <GridCell xs={12} lg={5} xl={5}>
                    <div className="su-sticky su-top-0 su-h-fit su-text-white su-rs-pt-6">
                      <SbLink
                        link={tripURL}
                        classes="su-group su-inline-block su-rs-mb-6 su-no-underline su-transition-colors"
                      >
                        <HeroIcon
                          iconType="arrow-left"
                          className="su-inline-block su-text-digital-red-light group-hocus:su-text-cardinal-red"
                          isAnimate
                        />
                        Back to {tripTitle}
                      </SbLink>
                      <Heading
                        level={1}
                        align="left"
                        font="serif"
                        id="page-title"
                      >
                        {title}
                      </Heading>
                      {hasRichText(body) && (
                        <RichTextRenderer
                          wysiwyg={body}
                          className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
                        />
                      )}
                    </div>
                  </GridCell>
                  <GridCell
                    xs={12}
                    lg={5}
                    xl={5}
                    className=" su-rs-pt-6 su-rs-mt-5"
                  >
                    <CreateBloks blokSection={giveGabForm} />
                  </GridCell>
                </Grid>
              </>
            ) : (
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
                    {relationships.relationships.map((relationship) => (
                      <TripRelationshipCard
                        key={relationship.id}
                        relationship={relationship}
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
                <button
                  type="button"
                  className="su-button"
                  onClick={toggleForm}
                >
                  Next
                </button>
              </Container>
            )}
            {numAnkle > 0 && <Ankle isDark {...props} />}
          </Container>
        </Layout>
      </SbEditable>
    </FormProvider>
    // </AuthenticatedPage>
  );
};

export default RegistrationFormPage;
