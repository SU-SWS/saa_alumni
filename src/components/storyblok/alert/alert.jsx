import React, { useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import { Alert } from '../../composite/Alert/Alert';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';

export const SBAlert = ({
  blok: { type, alertCta, label, heading, body, hasDismiss, _uid },
  blok,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const isCtaDark = type === 'warning';

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

  if (!showAlert) return null;

  return (
    <SbEditable content={blok}>
      <Alert
        type={type}
        label={label}
        heading={heading}
        hasDismiss={hasDismiss}
        dismissFunction={dismissHandler}
      >
        <RichTextRenderer
          wysiwyg={body}
          linkColor={linkColor}
          className="children:su-card-paragraph children:su-leading-display children:first:su-mt-0"
        />
        {getNumBloks(alertCta) > 0 && (
          <div className="su-rs-mt-1">
            <CreateBloks blokSection={alertCta} isCtaDark={isCtaDark} />
          </div>
        )}
      </Alert>
    </SbEditable>
  );
};
