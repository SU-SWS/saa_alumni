import React from 'react';
import SbEditable from 'storyblok-react';

const BasicCard = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`basic-card`}>
        <h2>{props.blok.headline}</h2>
        <p>{props.blok.text}</p>
      </div>
    </SbEditable>
  );
};

export default BasicCard;
