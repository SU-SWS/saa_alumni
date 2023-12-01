import React, { useState, useContext } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Grid } from '../layout/Grid';
import CardImage from '../media/cardImage';
import CircularImage from '../media/circularImage';
import BasicCardContent from './basicCardContent';
import AuthContext from '../../contexts/AuthContext'; // Import the AuthContext

const WillCard = ({
  blok: {
    cta,
    borderColor,
    isRound,
    isMinimal,
    isBigHeadline,
    image: { filename, focus } = {},
    imageFocus,
    headline,
    headingLevel,
    text,
  },
  blok,
  isDark,
}) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const auth = useContext(AuthContext); // Use the AuthContext to get user data

  // Handler for adding to Apple Wallet
  const handleAddToWallet = async () => {
    if (!auth.userProfile || auth.isAuthenticating) {
      console.error('User not authenticated');
      return;
    }

    // Extract user details from auth context
    const membershipNumber = auth.userProfile?.memberships[0]?.membershipNumber;
    const firstName = auth.userProfile?.contact?.name?.fullNameParsed?.firstName;
    const lastName = auth.userProfile?.contact?.name?.fullNameParsed?.lastName;

    try {
      const response = await fetch('http://localhost:64946/.netlify/functions/generate-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membershipNumber, firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const passData = await response.blob();
      const url = URL.createObjectURL(passData);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error generating pass:', error);
    }
  };

  // Default wrapper classes for white, non-minimal cards
  let wrapperClasses =
    'su-bg-white su-text-black su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm su-rs-pt-2 su-rs-px-2 su-rs-pb-3';

  // Basic card image has aspect ratio 3x2 for non-round option
  let cardImage = (
    <div className="su-aspect-w-3 su-aspect-h-2" aria-hidden="true">
      <CardImage
        filename={filename}
        size="vertical"
        imageFocus={imageFocus}
        smartFocus={focus}
        loading="lazy"
        width="600"
        height="400"
      />
    </div>
  );

  if (isRound && filename) {
    cardImage = (
      <CircularImage
        borderColor={borderColor}
        filename={filename}
        smartFocus={focus}
        loading="lazy"
        width="126"
        height="126"
      />
    );
  }

  if (isMinimal) {
    wrapperClasses = '';
  }

  let cardGrid;

  if (filename) {
    cardGrid = 'md:su-grid-cols-2 print:su-grid-cols-2';

    if (isRound) {
      cardGrid =
        'md:su-grid-flow-col print:su-grid-flow-col md:su-grid-cols-auto-1fr print:su-grid-cols-auto-1fr';
    }
  }

  return (
    <SbEditable content={blok}>
      <Grid
        gap
        alignItems="start"
        className={dcnb(
          'basic-card-horizontal su-gap-x-xl su-w-full su-basefont-23 su-break-words',
          wrapperClasses,
          cardGrid
        )}
      >
        {filename?.startsWith('http') && cardImage}
        <BasicCardContent
          headline={headline}
          headingLevel={headingLevel}
          isBigHeadline={isBigHeadline}
          isDark={isDark && isMinimal}
          text={text}
          cta={cta}
          className={dcnb(
            'card-body',
            `${isRound && filename ? '' : 'su-mt-[-0.3em]'}`
          )}
        />
        <button onClick={handleAddToWallet} disabled={auth.isAuthenticating}>Add to Apple Wallet</button>
        {downloadUrl && <a href={downloadUrl} download="pass.pkpass">Download Pass</a>}
      </Grid>
    </SbEditable>
  );
};

export default WillCard;
