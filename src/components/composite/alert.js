import React, { useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import { Alert as DecanterAlert, DismissButton } from 'decanter-react';
import RichTextRenderer from '../../utilities/richTextRenderer';
import CreateBloks from '../../utilities/createBloks';
import '../../styles/alert.css';
import getNumBloks from '../../utilities/getNumBloks';

const Alert = ({
  blok: { type, alertCta, label, heading, body, hasDismiss, _uid },
  blok,
}) => {
  const hasCta = getNumBloks(alertCta) > 0;
  const [isAlertDismissed, setIsAlertDismissed] = useState(true);
  const isLinkDark = type === 'warning';
  let footerContent = '';

  if (hasCta) {
    footerContent = (
      <CreateBloks blokSection={alertCta} isLinkDark={isLinkDark} />
    );
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const isDismissed = sessionStorage.getItem(_uid);
    if (isDismissed) setIsAlertDismissed(false);
  }, [_uid]);

  const dismissHandler = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.setItem(_uid, 'dismissed');
    setIsAlertDismissed(false);
  };

  const DismissBtn = (
    <DismissButton
      iconProps={{ className: 'su-ml-02em' }}
      text="Dismiss"
      srText="alert"
      onClick={dismissHandler}
      color={isLinkDark ? 'black' : 'white'}
      className="su-text-17 su-uppercase su-font-bold su-inline-block su-tracking-widest su-mr-0 su-ml-auto"
    />
  );

  let bodyStyle = 'su-alert-body-link-dark';
  if (isLinkDark) {
    bodyStyle = 'su-alert-body-link-light';
  }

  const customStyles = {
    footerWrapper: 'su-rs-mt-1',
    body: bodyStyle,
  };

  if (!isAlertDismissed) return null;

  return (
    <SbEditable content={blok}>
      <DecanterAlert
        type={type}
        label={label}
        heading={heading}
        footer={footerContent}
        classes={customStyles}
        dismissBtn={DismissBtn}
        hasDismiss={hasDismiss}
      >
        <RichTextRenderer wysiwyg={body} />
      </DecanterAlert>
    </SbEditable>
  );
};
export default Alert;
