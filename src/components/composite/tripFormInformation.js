import React from 'react';
import SbEditable from 'storyblok-react';

const TripFormInformation = ({ blok: { body }, blok }) => (
  <SbEditable content={blok}>
    <p>{body}</p>
  </SbEditable>
);

export default TripFormInformation;
