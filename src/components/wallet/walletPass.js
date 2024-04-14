import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import { isIOS, isAndroid } from 'react-device-detect';
import QRCode from 'qrcode.react';

import AppleWalletBadge from '../../images/apple-wallet-badge.svg';
import AndroidWalletBadge from '../../images/android-wallet-badge.svg';
import AuthContext from '../../contexts/AuthContext';

const WalletPass = (props) => {
  const { blok } = props;

  const deviceParam = new URLSearchParams(window.location.search).get('device');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [mobileSelected, setMobileSelected] = useState(isIOS || isAndroid);
  const [qrUrl, setQrUrl] = useState('');
  const apiUrl = isIOS
    ? `${window.location.origin}/api/walletpass/ios`
    : `${window.location.origin}/api/walletpass/android`;

  const auth = useContext(AuthContext);

  useEffect(() => {
    const memberships = auth.userProfile ? auth.userProfile.memberships : [];
    memberships.forEach((membership) => {
      if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        membership.membershipAffiliation?.includes('Alum')
      ) {
        setMembershipNumber(membership.membershipNumber);
      } else if (
        membership.membershipStatus?.includes('Active') &&
        membership.membershipGroup?.includes('SAA') &&
        membership.membershipAffiliation?.includes('Affiliate')
      ) {
        setMembershipNumber(membership.membershipNumber);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (deviceParam && membershipNumber) {
      // Redirect to the API URL
      window.location.href = `${window.location.origin}/api/walletpass/${deviceParam}`;
    }
  }, [deviceParam, membershipNumber]);

  const handleDeviceChange = (e) => {
    const { value } = e.target;
    const url = new URL(window.location.href);

    url.searchParams.set('redirect', 'true');
    url.searchParams.set('device', value);
    console.log(url.toString());
    setQrUrl(url.toString());

    setMobileSelected(true);
  };

  let walletContent;

  if (isIOS) {
    walletContent = (
      <a href={apiUrl}>
        <img src={AppleWalletBadge} alt="Add to Wallet" />
      </a>
    );
  } else if (isAndroid) {
    walletContent = (
      <a href={apiUrl}>
        <img src={AndroidWalletBadge} alt="Add to Wallet" />
      </a>
    );
  } else {
    walletContent = (
      <>
        <b>Scan next QR in your device to download your Passport:</b>
        <br />
        <i className="su-text-center su-text-m">
          (You will need to be identified as a user in the browser on your
          device.)
        </i>
        <select
          className="su-select su-select-m su-mt-20"
          onChange={(e) => handleDeviceChange(e)}
        >
          <option>-Select your device-</option>
          <option value="ios">iOS</option>
          <option value="android">Android</option>
        </select>
        {mobileSelected && (
          <QRCode
            value={qrUrl}
            size={256}
            level="H"
            includeMargin
            renderAs="svg"
          />
        )}
      </>
    );
  }

  if (deviceParam) {
    if (!membershipNumber) {
      return (
        <div>
          <p className="su-text-center su-text-m">
            You must be logged in to download your membership card.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="su-mb-30">{walletContent}</div>
        Downloading WalletPass...
      </div>
    );
  }

  return (
    <SbEditable content={blok}>
      {membershipNumber ? (
        <div className="su-mt-30">{walletContent}</div>
      ) : (
        <p className="su-text-center su-text-m">
          Please log in to add your membership card to your wallet.
        </p>
      )}
    </SbEditable>
  );
};

export default WalletPass;
