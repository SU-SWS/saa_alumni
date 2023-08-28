import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../../utilities/createBloks';
import { Heading } from '../../simple/Heading';
import { FlexBox } from '../../layout/FlexBox';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLinkGroup.styles';

const MegaMenuLinkGroup = ({
  blok: { heading, secondaryLink, links },
  blok,
}) => (
  <SbEditable content={blok}>
    <FlexBox direction="col">
      {heading && (
        <SbLink link={secondaryLink} classes={styles.menuLink}>
          <Heading weight="bold" uppercase size="base">
            {heading}
          </Heading>
        </SbLink>
      )}
      {links !== '' && (
        <ul className="su-list-none su-p-0">
          <CreateBloks blokSection={links} />
        </ul>
      )}
    </FlexBox>
  </SbEditable>
);

export default MegaMenuLinkGroup;
