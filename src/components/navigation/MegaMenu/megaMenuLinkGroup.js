import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import { Heading } from '../../simple/Heading';
import * as styles from './megaMenuLinkGroup.styles';
import { GridCell } from '../../layout/GridCell';

const MegaMenuLinkGroup = ({ blok: { heading, links }, blok, onlyLinks }) => (
  <SbEditable content={blok}>
    <GridCell lg={4} className={styles.menuGroup}>
      {heading && (
        <Heading weight="bold" uppercase className={styles.menuHeader}>
          {heading}
        </Heading>
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
