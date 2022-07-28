/* eslint-disable camelcase */
import React, { useContext } from 'react';
import SbEditable from 'storyblok-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { dcnb } from 'cnbuilder';
import { Container } from '../layout/Container';
import DynaScript from './dynaScript';
import AuthContext from '../../contexts/AuthContext';

// Give Gab Form Component
// -----------------------------------------------------------------------------
const GiveGabForm = ({
  blok: {
    failureMessage: { content },
    url,
    uuid,
  },
  blok,
  tripId,
  bgCardStyle,
}) => {
  const htmlId = uuid;
  const { isAuthenticating } = useContext(AuthContext);

  const embedUrl = new URL(url);
  if (tripId) {
    embedUrl.searchParams.set('urlData', tripId);
  }

  if (isAuthenticating) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className={dcnb(
          'su-shadow-lg su-text-white su-rs-p-5 md:su-rs-p-6 su-bg-gradient-to-tl su-to-saa-black su-from-saa-black-opacity-40 su-backdrop-blur-sm',
          bgCardStyle ? 'su-bg-saa-black-dark' : ''
        )}
      >
        <ClipLoader color="#00BFFF" height={50} width={50} />
        <p>Loading form...</p>
        <noscript>
          Sorry, but you must have Javascript enabled to use the form.
        </noscript>
      </div>
    );
  }

  return (
    <SbEditable content={blok}>
      <Container
        width="full"
        className={dcnb(
          'children:backdrop-opacity-30 children:su-bg-gradient-to-tl children:su-backdrop-blur-sm children:su-shadow-lg children:su-text-white',
          bgCardStyle
        )}
      >
        <div className="form-gradient su-rs-p-5 md:su-rs-p-6 2xl:su-pb-[10.8rem]">
          <DynaScript src={embedUrl} id={htmlId} errorBlok={content} />
        </div>
      </Container>
    </SbEditable>
  );
};

export default GiveGabForm;
