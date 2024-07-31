import React, { useState, useContext, useEffect, useCallback } from 'react';
import SbEditable from 'storyblok-react';
import { isIOS, isAndroid } from 'react-device-detect';
import QRCode from 'qrcode.react';

import AppleWalletBadge from '../../images/apple-wallet-badge.svg';
import AndroidWalletBadge from '../../images/android-wallet-badge.svg';
import AuthContext from '../../contexts/AuthContext';
import SbLink from '../../utilities/sbLink';

const WalletPass = (props) => {
  const { blok } = props;
  const location = typeof window !== `undefined` ? window.location : {};
  const buttonClasses =
    'su-inline-block su-w-fit su-group su-border-3 su-transition-colors su-no-underline su-underline-offset-[3px] su-font-regular hocus:su-underline su-border-digital-red su-bg-digital-red su-text-white hocus:su-bg-cardinal-red-xdark hocus:su-text-white hocus:su-border-cardinal-red-xdark hocus:su-shadow-md su-px-20 su-pt-10 su-pb-11 md:su-px-26 md:su-pt-14 md:su-pb-16 su-text-18 md:su-text-20';
  const siteUrl = location.origin;

  const deviceParam = new URLSearchParams(location.search).get('device');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [mobileSelected, setMobileSelected] = useState(isIOS || isAndroid);
  const [qrUrl, setQrUrl] = useState('');
  const iosButtonUrl = `${siteUrl}/api/walletpass/ios`;
  const [androidButtonUrl, setAndroidButtonUrl] = useState();

  const auth = useContext(AuthContext);

  const getAndroidButtonUrl = useCallback(async () => {
    const response = await fetch(`${siteUrl}/api/walletpass/android`);
    const url = await response.text();
    return url;
  }, [siteUrl]);

  const handleDeviceChange = async (e) => {
    const { value } = e.target;
    const url = new URL(location.href);

    url.searchParams.set('redirect', 'true');
    url.searchParams.set('device', value);
    setQrUrl(url.toString());

    setMobileSelected(true);
  };

  // Load membership number from user profile
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

  // Load Android Wallet Pass URL
  useEffect(() => {
    const loadAndroidButtonUrl = async () => {
      if (isAndroid && membershipNumber) {
        const url = await getAndroidButtonUrl();
        setAndroidButtonUrl(url);
      }
    };

    loadAndroidButtonUrl();
  }, [membershipNumber, getAndroidButtonUrl]);

  // Redirect to Wallet Pass URL
  useEffect(() => {
    async function redirectToPassURL() {
      if (deviceParam && membershipNumber) {
        if (deviceParam === 'ios') {
          location.href = iosButtonUrl;
        } else if (deviceParam === 'android') {
          const url = await getAndroidButtonUrl();
          location.href = url;
        }
      }
    }

    redirectToPassURL();
  });

  const joinMembershipContent = () => (
    <p className="su-text-center su-text-m">
      Unlock this benefit and upgraded versions of select perks—while also
      supporting programs for students and alums—with a Stanford Alumni
      Association (SAA) membership.
      <div className="su-mt-20">
        <SbLink link={{ url: '/membership/join' }} classes={buttonClasses}>
          Join now
        </SbLink>
      </div>
    </p>
  );
  let walletContent;

  if (isIOS) {
    walletContent = (
      <a href={iosButtonUrl}>
        <img src={AppleWalletBadge} alt="Add to Wallet" />
      </a>
    );
  } else if (isAndroid) {
    walletContent = (
      <>
        {androidButtonUrl && (
          <a href={androidButtonUrl}>
            <img src={AndroidWalletBadge} alt="Add to Wallet" />
          </a>
        )}
        {!androidButtonUrl && (
          <p className="su-text-center su-text-m">Loading...</p>
        )}
      </>
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
    if (!auth?.userProfile) {
      return (
        <div>
          <p className="su-text-center su-text-m">
            You must be logged in to download your membership card.
          </p>
        </div>
      );
    }

    if (!membershipNumber) {
      return <div>{joinMembershipContent()}</div>;
    }

    return (
      <div>
        <div className="su-mb-30">{walletContent}</div>
        Generating Wallet Pass...
      </div>
    );
  }

  return (
    <SbEditable content={blok}>
      {!auth?.userProfile && (
        <p className="su-text-center su-text-m">
          Please log in to add your membership card to your wallet.
        </p>
      )}
      {auth?.userProfile && !membershipNumber && (
        <div>{joinMembershipContent()}</div>
      )}
      {membershipNumber && <div className="su-mt-30">{walletContent}</div>}
    </SbEditable>
  );
};

export default WalletPass;
