import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextRenderer from '../../utilities/richTextRenderer';
import hasRichText from '../../utilities/hasRichText';

const GiveGabFailureMessage = (props) => {
  const {
    blok: { body },
    blok,
  } = props;
  return (
    <SbEditable content={blok}>
      {hasRichText(body) && (
        <RichTextRenderer wysiwyg={body} className="su-text-center" />
      )}
    </SbEditable>
  );
};

export default GiveGabFailureMessage;
