import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import QRCode from 'qrcode.react'; // Import QRCode component
import AuthContext from '../../contexts/AuthContext';

const QrCodeApple = (props) => {
  const { blok } = props;
  const apiUrl = `${window.location.origin}/api/walletpass/apple`; // Ensure the apiUrl is absolute
  const [membershipNumber, setMembershipNumber] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {
    const memberships = auth.userProfile ? auth.userProfile.memberships : [];
    memberships.forEach((membership) => {
      if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        membership.membershipAffiliation?.includes('Alum') ||
        membership.membershipAffiliation?.includes('Affiliate')
      ) {
        setMembershipNumber(membership.membershipNumber);
      }
    });
  }, [auth]);

  return (
    <SbEditable content={blok}>
      <div className="su-mt-30">
        {membershipNumber ? (
          <>
            <QRCode
              value={apiUrl}
              size={128}
              level={"H"}
              includeMargin={true}
              renderAs={"svg"} // Renders the QR code as an SVG
            />
            <p className="su-text-center su-text-m">Scan to add to Apple Wallet</p>
          </>
        ) : (
          <p className="su-text-center su-text-m">
            Please log in to add your membership card to Apple Wallet.
          </p>
        )}
      </div>
    </SbEditable>
  );
};

export default QrCodeApple;
