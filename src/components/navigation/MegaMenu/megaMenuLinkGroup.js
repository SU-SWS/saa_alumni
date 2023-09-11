import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import { Heading } from '../../simple/Heading';
import SbLink from '../../../utilities/sbLink';
import * as styles from './megaMenuLinkGroup.styles';
import { GridCell } from '../../layout/GridCell';

const MegaMenuLinkGroup = ({
  blok: { heading, secondaryLink, links },
  blok,
  onlyLinks,
}) => (
  <SbEditable content={blok}>
    <GridCell lg={4} className={styles.menuGroup}>
      {heading && (
        <SbLink link={secondaryLink} classes={styles.menuLink}>
          <Heading weight="bold" uppercase className="su-text-17 su-rs-mb-0">
            {heading}
          </Heading>
        </SbLink>
      )}
      {links !== '' && (
        <ul className="su-list-none su-p-0">
          <CreateBloks blokSection={links} />
        </ul>
      )}
    </GridCell>
  </SbEditable>
);

export default MegaMenuLinkGroup;
