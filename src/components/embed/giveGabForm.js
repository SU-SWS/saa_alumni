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
  urlData,
  kwoCredentials,
  bgCardStyle,
}) => {
  const htmlId = uuid;
  const { isAuthenticating } = useContext(AuthContext);

  const embedUrl = new URL(url);
  if (urlData) {
    embedUrl.searchParams.set('urlData', urlData.replace(' ', ''));
  }

  if (kwoCredentials) {
    embedUrl.searchParams.set(
      'kwoCredentials',
      kwoCredentials.replace(' ', '')
    );
  }

  if (isAuthenticating) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className={dcnb(
          'su-flex su-flex-row su-shadow-lg su-text-white su-rs-p-5 md:su-rs-p-6 su-bg-gradient-to-tl su-to-saa-black su-from-saa-black-opacity-40 su-backdrop-blur-sm',
          bgCardStyle
        )}
      >
        <ClipLoader color="#00BFFF" height={50} width={50} />
        <p className="su-pl-03em">Loading form...</p>
        <noscript>
          Sorry, but you must have Javascript enabled to use the form.
        </noscript>
      </div>
    );
  }

  return (
    <SbEditable content={blok}>
      <Container width="full" className={bgCardStyle}>
        <div
          className={dcnb(
            'su-rs-p-5 su-rs-pb-6 lg:su-rs-p-6 lg:su-rs-pb-7',
            bgCardStyle.includes('dark') && 'form-gradient',
            bgCardStyle
          )}
        >
          <DynaScript src={embedUrl} id={htmlId} errorBlok={content} />
        </div>
      </Container>
    </SbEditable>
  );
};

export default GiveGabForm;
