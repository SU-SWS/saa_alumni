import React, { useEffect, useContext } from 'react';
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
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { FormContextProvider } from '../../../contexts/FormContext';
import AuthContext from '../../../contexts/AuthContext';

const RegistrationFormPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        content: { title: tripTitle },
      },
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
    location,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip: ${tripTitle}`;
  const { userProfile } = useContext(AuthContext);

  const guests = location?.state?.guests;
  // TODO: REMOVE THIS CONSOLE LOG BEFORE MERGE. This is for testing purposes only.
  console.log('Prefill Data Obj: ', guests);

  useEffect(() => {
    // StoryBlok trip related data
    window.trip_id = blok.trip.id;
    window.trip_name = blok.trip.content.title;
    window.trip_url = blok.trip.content.url;
    window.trip_start_date = blok.trip.content.startDate;
    window.trip_end_date = blok.trip.content.endDate;
    window.trip_pre_extension = blok.trip.content.preExtension || '';
    window.trip_post_extension = blok.trip.content.postExtension || '';

    const structureGuestsData = (selectedGuests) => {
      let guestsData = [];
      let data = {};
      selectedGuests.forEach((guest) => {
        // Check if registrant is selected as a guest.
        if (guest?.encodedSUID === userProfile?.encodedSUID) {
          data = {
            did: userProfile?.encodedSUID,
            su_title: userProfile?.name?.fullnameParsed?.prefix,
            su_first_name: userProfile?.name?.fullnameParsed?.firstName,
            su_middle_name:
              (guest?.relatedContactFullNameParsed?.relatedContactMiddleName ||
                guest?.name?.fullNameParsed?.middleName) === null
                ? '&nbsp;'
                : guest?.relatedContactFullNameParsed
                    ?.relatedContactMiddleName ||
                  guest?.name?.fullNameParsed?.middleName,
            su_last_name:
              guest?.relatedContactFullNameParsed?.relatedContactLastName ||
              guest?.name?.fullNameParsed?.lastName ||
              '',
            su_dob: guest?.relatedContactBirthDate || guest?.birthDate,
            su_relation: guest?.relationshipType,
            su_affiliation: guest?.affiliation || 'None',
            su_reg: 'Primary Traveler',
          };
          guestsData = [data, ...guestsData];
        } else {
          data = {
            did: guest?.relatedContactEncodedID,
            dname: `${guest?.relatedContactFullNameParsed?.relatedContactFirstName} ${guest?.relatedContactFullNameParsed?.relatedContactLastName}`,
            su_title: guest?.relatedContactFullNameParsed?.relatedContactPrefix,
            su_first_name:
              guest?.relatedContactFullNameParsed?.relatedContactFirstName,
            su_middle_name:
              guest?.relatedContactFullNameParsed?.relatedContactMiddleName ===
              null
                ? '&nbsp;'
                : guest?.relatedContactFullNameParsed?.relatedContactMiddleName,
            su_last_name:
              guest?.relatedContactFullNameParsed?.relatedContactLastName,
            su_affiliation: guest?.affiliation || 'None',
            su_relation: guest?.relationshipType,
            su_dob: guest?.relatedContactBirthDate,
            su_reg: 'Related contact',
            su_email: null,
            su_phone: null,
          };
          guestsData = [...guestsData, data];
        }
      });

      return guestsData;
    };

    if (guests) {
      const guestsData = structureGuestsData(guests);
      // TODO: REMOVE THIS CONSOLE LOG BEFORE MERGE. This is for testing purposes only.
      console.log('Guests Data: ', guestsData);
      window.prefillData = guestsData;
    }
  }, [guests, userProfile, blok]);

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
              {numAnkle > 0 && <Ankle isDark {...props} />}
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default RegistrationFormPage;
