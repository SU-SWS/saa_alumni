import React from 'react';
import SbEditable from 'storyblok-react';
import RichTextField from '../../utilities/richTextField';
import UseWindowSize from '../../hooks/useWindowSize';
import CenteredContainer from './centeredContainer';
import Heading from './heading';
import CreateBloks from '../../utilities/createBloks';
import { config } from '../../utilities/config';

const HeaderNoImage = (props) => {
  let windowSize = UseWindowSize();
  console.log("Did it even get here?");

  return (
    <SbEditable content={props.blok}>
      <header
        className={`interior-page__header interior-page__header--no-image
              ${
                props.blok.headerSpacingBottom !== 'none'
                  ? `su-mb-${props.blok.headerSpacingBottom}`
                  : ''
              }`}
      >
        <div
          className={`interior-page__header-title-wrapper su-bg-${props.blok.headerBackgroundColor}`}
        >
          <CenteredContainer flex={true}>
            {windowSize.width < config.breakpoint.lg &&
              props.blok.layout !== 'no-sidebar' && (
                <CreateBloks blokSection={props.blok.contentMenu} />
              )}
            <Heading
              level={'h1'}
              serif={true}
              color={'white'}
              classes={'interior-page__title flex-xl-10-of-12'}
            >
              {props.blok.title}
            </Heading>
          </CenteredContainer>
        </div>
        <CenteredContainer
          flex={true}
          classes={'interior-page__header-intro'}
        >
          <div
            className={`interior-page__header-intro-wrapper flex-12-of-12 su-bg-white`}
          >
            {props.blok.intro && (
              <div className="intro-text interior-page__intro flex-xl-10-of-12">
                <RichTextField data={props.blok.intro} />
              </div>
            )}
          </div>
        </CenteredContainer>
      </header>
    </SbEditable>
  );
};

export default HeaderNoImage;
