import React, { useState, useContext, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import AuthContext from '../../contexts/AuthContext';
import AppleWalletBadge from '../../images/apple-wallet-badge.svg';

const WalletPassApple = (props) => {
  const { blok } = props;
  const apiUrl = '/api/walletpass/apple';
  const [membershipNumber, setMembershipNumber] = useState('');
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

  return (
    <SbEditable content={blok}>
      <div className="su-mt-30">
        {membershipNumber && (
          <a href={apiUrl}>
            <img src={AppleWalletBadge} alt="Add to Wallet" />
          </a>
        )}
        {!membershipNumber && (
          <p className="su-text-center su-text-m">
            Please log in to add your membership card to Apple Wallet.
          </p>
        )}
      </div>
    </SbEditable>
  );
};

export default WalletPassApple;
