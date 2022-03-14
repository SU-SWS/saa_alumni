import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextRenderer from '../../utilities/richTextRenderer';

const TripFormInformation = ({ blok: { body }, blok }) => (
  <SbEditable content={blok}>
    <RichTextRenderer
      wysiwyg={body}
      className="su-leading su-rs-mb-5 children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
    />
  </SbEditable>
);

export default TripFormInformation;
