import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import QRCode from 'qrcode.react'; // Import QRCode component
import AuthContext from '../../contexts/AuthContext';
import { isIOS, isAndroid } from 'react-device-detect'; // For device detection

const ScanAppleCard = (props) => {
  const { blok } = props;
  const apiUrl = `${window.location.origin}/api/walletpass/`;
  const [membershipNumber, setMembershipNumber] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {
    const memberships = auth.userProfile ? auth.userProfile.memberships : [];
    memberships.forEach((membership) => {
      if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        (membership.membershipAffiliation?.includes('Alum') || membership.membershipAffiliation?.includes('Affiliate'))
      ) {
        setMembershipNumber(membership.membershipNumber);
      }
    });
  }, [auth]);

  const deviceUrl = isIOS ? `${apiUrl}apple` : isAndroid ? `${apiUrl}android` : apiUrl;

  return (
    <SbEditable content={blok}>
      <div className="su-mt-30">
        {membershipNumber ? (
          <>
            {isIOS || isAndroid ? (
              <a href={deviceUrl}>
                <img src={`/images/${isIOS ? 'apple-wallet-badge.svg' : 'google-wallet-badge.svg'}`} alt="Add to Wallet" />
              </a>
            ) : (
              <QRCode
                value={deviceUrl}
                size={128}
                level="H"
                includeMargin
                renderAs="svg" // Renders the QR code as an SVG
              />
            )}
            <p className="su-text-center su-text-m">Scan or click to add to your wallet</p>
          </>
        ) : (
          <p className="su-text-center su-text-m">
            Please log in to add your membership card to your wallet.
          </p>
        )}
      </div>
    </SbEditable>
  );
};

export default ScanAppleCard;
