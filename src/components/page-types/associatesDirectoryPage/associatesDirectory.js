import React from 'react';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import LegacyDirectory from './legacyDirectory/LegacyDirectory';

const AssociatesDirectory = (props) => {
  const { blok } = props;

  return (
    <SbEditable content={blok}>
      <Container id="directory">
        <LegacyDirectory />
      </Container>
    </SbEditable>
  );
};

export default AssociatesDirectory;
