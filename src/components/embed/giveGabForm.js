/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container } from '../layout/Container';
import Embed from './embed';
import DynaScript from './dynaScript';
import AuthContext from '../../contexts/AuthContext';

// Give Gab Form Component
// -----------------------------------------------------------------------------
const GiveGabForm = ({
  blok: {
    css_styles,
    error_text: errorText,
    head_js,
    pre_markup,
    url,
    post_markup,
    deposit_amount: depositAmount,
    trip_id: tripId,
    trip_name: tripName,
    extension,
    extension_amount: extensionAmount,
    uuid,
  },
  blok,
}) => {
  const htmlId = uuid;
  const { isAuthenticating } = useContext(AuthContext);
  const preBlok = { markup: pre_markup };
  const postBlok = { markup: post_markup };
  // TODO: ADAPT-4776 The ciid is subject to change. Please update once the final name has been confirmed
  let ggUrl;
  if (tripId) {
    ggUrl = `${url}?ciid=${tripId}`;
  }

  useEffect(() => {
    // Information from StoryBlok GiveGabForm Component
    // TODO: ADAPT-4776 The ciid is subject to change. Please update once the final name has been confirmed
    window.trip_id = tripId || '';
    window.amt = depositAmount || '';
    // TODO: ADAPT-4681/ADAPT-4776 The following fields does not exist within the GG form yet.
    window.trip_name = tripName || '';
    window.su_extension = extension || '';
    window.su_extension_amount = extensionAmount || '';
  }, [tripId, tripName, depositAmount, extension, extensionAmount]);

  if (isAuthenticating) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className="su-bg-gradient-to-tl su-to-saa-black su-from-saa-black-opacity-40 su-backdrop-blur-sm su-shadow-lg su-text-white su-rs-p-5"
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
      {css_styles && (
        <Helmet>
          <style type="text/css">{css_styles}</style>
        </Helmet>
      )}
      {head_js && (
        <Helmet>
          <script>{head_js}</script>
        </Helmet>
      )}
      <Container
        width="full"
        className="children:backdrop-opacity-30 children:su-bg-gradient-to-tl children:su-backdrop-blur-sm children:su-shadow-lg children:su-text-white"
      >
        <div className="form-gradient su-rs-p-5 2xl:su-pb-[10.8rem]">
          <Embed blok={preBlok} />
          <DynaScript src={url} id={htmlId} errorText={errorText} />
        </div>
        <div className="form-gradient su-rs-mt-3 children:children:su-p-38 md:children:children:su-p-72 xl:children:children:su-p-76 children:children:empty:su-p-0">
          <Embed blok={postBlok} />
        </div>
      </Container>
    </SbEditable>
  );
};

export default GiveGabForm;
