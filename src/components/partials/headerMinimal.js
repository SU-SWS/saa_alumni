import SbEditable from 'storyblok-react';
import React from 'react';
import { dcnb } from 'cnbuilder';
import UseWindowSize from '../../hooks/useWindowSize';
import CenteredContainer from './centeredContainer';
import Heading from './heading';
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

  let headingTextColor = 'white';
  if (backgroundColor === 'su-bg-white') {
    headingTextColor = 'black-90';
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
        <CenteredContainer flex>
          {windowSize.width < config.breakpoints.lg &&
            layout !== 'no-sidebar' && (
              <CreateBloks blokSection={contentMenu} />
            )}
          <Heading
            level="h1"
            serif
            color={headingTextColor}
            weight="bold"
            classes="su-type-5 su-tracking-normal su-mb-0 md:su-mx-auto"
            align="center"
          >
            {title}
          </Heading>
        </CenteredContainer>
      </header>
    </SbEditable>
  );
};

export default HeaderMinimal;
