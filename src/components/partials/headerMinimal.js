import SbEditable from 'storyblok-react';
import React from 'react';
import UseWindowSize from '../../hooks/useWindowSize';
import CenteredContainer from './centeredContainer';
import Heading from './heading';
import CreateBloks from '../../utilities/createBloks';
import { config } from '../../utilities/config';

const HeaderMinimal = ({
  blok: {
    headerBackgroundColor,
    headerSpacingBottom,
    layout,
    contentMenu,
    title,
  },
  blok,
}) => {
  const windowSize = UseWindowSize();
  let headingTextColor = 'white';
  if (headerBackgroundColor === 'white') {
    headingTextColor = 'black-90';
  }

  return (
    <SbEditable content={blok}>
      <header
        className={`su-py-38 md:su-py-72 lg:su-py-108 xl:su-py-[11.1rem] su-basefont-23
              su-bg-${headerBackgroundColor}
              ${
                headerSpacingBottom !== 'none'
                  ? `su-rs-mb-${headerSpacingBottom}`
                  : ''
              }`}
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
