import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import { Heading } from '../../simple/Heading';
import { FlexBox } from '../../layout/FlexBox';

const MegaMenuLinkGroup = ({ blok: { heading, links }, blok }) => (
  <SbEditable content={blok}>
    <FlexBox md={4}>
      {heading && (
        <Heading weight="bold" classes="su-uppercase">
          {heading}
        </Heading>
      )}
      {links !== '' && (
        <ul className="su-list-none">
          <CreateBloks blokSection={links} />
        </ul>
      )}
    </FlexBox>
  </SbEditable>
);

export default MegaMenuLinkGroup;
