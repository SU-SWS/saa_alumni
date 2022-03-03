/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container } from '../layout/Container';
import Embed from './embed';
import DynaScript from './dynaScript';
import setGiveGabVars from '../../utilities/giveGabVars';
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
  const { user, isAuthenticated, isAuthenticating } = useContext(AuthContext);
  const preBlok = { markup: pre_markup };
  const postBlok = { markup: post_markup };

  useEffect(() => {
    // Information from StoryBlok GiveGabForm Component
    // TODO: The ciid is subject to change. Please update once the final name has been confirmed
    window.ciid = tripId || '';
    window.amt = depositAmount || '';
    // TODO: The following fields does not exist within the GG form yet.
    window.su_trip_name = tripName || '';
    window.su_extension = extension || '';
    window.su_extension_amount = extensionAmount || '';
  }, [tripId, tripName, depositAmount, extension, extensionAmount]);

  if (isAuthenticating) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className="su-bg-white su-rs-p-5"
      >
        <ClipLoader color="#00BFFF" height={50} width={50} />
        <p>Loading form...</p>
        <noscript>
          Sorry, but you must have Javascript enabled to use the form.
        </noscript>
      </div>
    );
  }

  // If the user is logged in, provide the prefill variables to the window.
  if (isAuthenticated) {
    setGiveGabVars(user);
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
        className="children:su-bg-white children:su-shadow-lg"
      >
        <div className="su-rs-p-5">
          <Embed blok={preBlok} />
          <DynaScript src={url} id={htmlId} errorText={errorText} />
        </div>
        <div className="su-rs-mt-3 children:children:su-p-38 md:children:children:su-p-72 xl:children:children:su-p-76 children:children:empty:su-p-0">
          <Embed blok={postBlok} />
        </div>
      </Container>
    </SbEditable>
  );
};

export default GiveGabForm;
