import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import QRCode from 'qrcode.react';
import { Grid } from '../layout/Grid';
import CardImage from '../media/cardImage';
import CircularImage from '../media/circularImage';
import BasicCardContent from './basicCardContent';
import appleWalletBadge from '../../assets/apple-wallet-badge.svg';
import AuthContext from '../../contexts/AuthContext';

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
  const [userData, setUserData] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.userProfile) {
      const { firstName, lastName, membershipNumber } = auth.userProfile;
      setUserData({ firstName, lastName, membershipNumber });
    }
  }, [auth.userProfile]);

  useEffect(() => {
    if (downloadUrl) {
      // Create an anchor tag and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'membershipCard.pkpass'; // This can be omitted to use the filename from the Content-Disposition header
      document.body.appendChild(link); // Append to body
      link.click(); // Simulate click to trigger download
      document.body.removeChild(link); // Clean up
    }
  }, [downloadUrl]); // This useEffect hook runs whenever downloadUrl changes

  const handleAddToWallet = async () => {
    if (!userData) {
      console.error('User data not available');
      alert('User data is not available. Please log in.');
      return;
    }

    try {
      const { membershipNumber, firstName, lastName } = userData;

      const response = await fetch('/api/applewalletcard/generate-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membershipNumber, firstName, lastName }),
      });

      if (!response.ok) {
        console.error(
          `Error from server: ${response.statusText} (${response.status})`
        );
        alert(
          `Failed to generate pass: ${response.statusText}. Please try again later.`
        );
        return;
      }

      const passData = await response.blob();
      if (passData.size === 0) {
        console.error('Received an empty pass file from the server.');
        alert('Failed to generate the pass correctly. Please contact support.');
        return;
      }

      const url = URL.createObjectURL(passData);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error generating pass:', error);
      alert(
        `Error generating pass: ${error.message}. Please check the console for more details.`
      );
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
        <div>
          {downloadUrl ? (
            <>
              <div>
                <p>
                  Scan this QR Code with your mobile device to add to Apple
                  Wallet:
                </p>
                <QRCode
                  value={downloadUrl}
                  size={128}
                  level="H"
                  includeMargin
                />
              </div>
              <a
                href={downloadUrl}
                download="pass.pkpass"
                style={{ display: 'none' }}
              >
                Download Pass
              </a>
            </>
          ) : (
            <button
              onClick={handleAddToWallet}
              style={{ background: 'none', border: 'none' }}
            >
              <img src={appleWalletBadge} alt="Add to Apple Wallet" />
            </button>
          )}
        </div>
      </Grid>
    </SbEditable>
  );
};

export default WillCard;
