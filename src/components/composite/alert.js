import React, { useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import { Alert as DecanterAlert, DismissButton } from 'decanter-react';
import RichTextRenderer from '../../utilities/richTextRenderer';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';

const Alert = ({
  blok: { type, alertCta, label, heading, body, hasDismiss, _uid },
  blok,
}) => {
  const hasCta = getNumBloks(alertCta) > 0;
  const [showAlert, setShowAlert] = useState(false);
  const isLinkDark = type === 'warning';
  let footerContent = '';

  if (hasCta) {
    footerContent = (
      <CreateBloks blokSection={alertCta} isLinkDark={isLinkDark} />
    );
  }

  let linkColor;
  switch (type) {
    case 'warning':
      linkColor =
        'su-text-black su-font-bold hocus:su-text-black hocus:su-bg-digital-blue-light';
      break;
    default:
      linkColor = 'su-text-white hocus:su-bg-white hocus:su-text-black';
  }

  useEffect(() => {
    const dismissedInSession = sessionStorage.getItem(_uid);
    if (!dismissedInSession) setShowAlert(true);
  }, [_uid]);

  const dismissHandler = () => {
    sessionStorage.setItem(_uid, 'dismissed');
    setShowAlert(false);
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

  const customStyles = {
    footerWrapper: 'su-rs-mt-1',
  };

  if (!showAlert) return null;

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
        <RichTextRenderer wysiwyg={body} linkColor={linkColor} />
      </DecanterAlert>
    </SbEditable>
  );
};
export default Alert;
