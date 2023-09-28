import React from 'react';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import Directory from './Directory/Directory';

const AssociatesDirectory = (props) => {
  const { blok } = props;

  return (
    <SbEditable content={blok}>
      <Container width="full" id="directory">
        <Directory />
      </Container>
    </SbEditable>
  );
};

export default AssociatesDirectory;
