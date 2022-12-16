import React from 'react';
import SbEditable from 'storyblok-react';
import { Heading } from '../../simple/Heading';

const MembershipInformation = (props) => {
  const {
    blok: { heading, body, benefitsLink },
    blok,
  } = props;
  console.log('BLOK: ', blok);

  return (
    <SbEditable content={blok}>
      <Heading level={1} size={6} align="left" font="serif" id="page-title">
        {heading}
      </Heading>
      <p>{body}</p>
      <a href={benefitsLink}>Become a Member</a>
    </SbEditable>
  );
};

export default MembershipInformation;
