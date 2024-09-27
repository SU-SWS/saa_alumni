import SbEditable from 'storyblok-react';
import React from 'react';
import { dcnb } from 'cnbuilder';
import UseWindowSize from '../../hooks/useWindowSize';
import { Container } from '../layout/Container';
import { Heading } from '../simple/Heading';
import CreateBloks from '../../utilities/createBloks';
import {
  headerBackgroundColor,
  headerSpacingBottom,
} from '../../utilities/dataSource';
import { config } from '../../utilities/config';

const HeaderMinimal = ({
  blok: {
    headerBackgroundColor: color,
    headerSpacingBottom: marginSize,
    layout,
    contentMenu,
    title,
  },
  blok,
}) => {
  const windowSize = UseWindowSize();
  const backgroundColor = headerBackgroundColor[color];
  const headerMarginBottom = headerSpacingBottom[marginSize];

  let headingTextColor = 'su-text-white';
  if (backgroundColor === 'su-bg-white') {
    headingTextColor = 'su-text-black-90';
  }

  return (
    <SbEditable content={blok}>
      <header
        className={dcnb(
          'su-py-38 md:su-py-72 lg:su-py-108 xl:su-py-[11.1rem] su-basefont-23',
          backgroundColor,
          headerMarginBottom
        )}
      >
        <Container>
          {windowSize.width < config.breakpoints.lg &&
            layout !== 'no-sidebar' && (
              <CreateBloks blokSection={contentMenu} />
            )}
          <Heading
            level="1"
            font="serif"
            size="5"
            tracking="normal"
            className={dcnb('su-mb-0 su-mx-auto', headingTextColor)}
            align="center"
          >
            {title}
          </Heading>
        </Container>
      </header>
    </SbEditable>
  );
};

export default HeaderMinimal;
