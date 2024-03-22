import React from 'react';
import SbEditable from 'storyblok-react';
import AppleWalletBadge from '../../images/apple-wallet-badge.svg';

const WalletPassApple = (props) => {
  const { blok } = props;
  const apiUrl = '/api/walletpass/apple';

  return (
    <SbEditable content={blok}>
      <div className="su-mt-30">
        <a href={apiUrl} download="walletPass.pkpass">
          <img src={AppleWalletBadge} alt="Add to Wallet" />
        </a>
      </div>
    </SbEditable>
  );
};

export default WalletPassApple;
