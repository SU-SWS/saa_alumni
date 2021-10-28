import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Heading } from 'decanter-react';
import Layout from '../partials/layout';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import Ankle from '../partials/ankle/ankle';
import BasicContentNoSidebar from '../partials/basicContentNoSidebar';
import BasicContentLeftSidebar from '../partials/basicContentLeftSidebar';
import { HeroImage } from '../composite/HeroImage/HeroImage';

const BasicPage = (props) => {
  // Destructure.
  const {
    blok: {
      pageLayout,
      title,
      isSrOnlyTitle,
      hero,
      heroImage: { filename, alt, focus } = {},
      aboveContent,
      belowContent,
      ankleContent,
      sectionMenu,
    },
    blok,
  } = props;

  const hasHeroBanner = getNumBloks(hero) > 0 || filename;
  const numAbove = getNumBloks(aboveContent);
  const numBelow = getNumBloks(belowContent);
  const numAnkle = getNumBloks(ankleContent);

  // Only add top padding to Main Content if the Above Content region is populated or if page title is visually hidden
  let contentPadding = 'su-rs-pb-7';

  if (numAbove > 0 || isSrOnlyTitle) {
    contentPadding = 'su-rs-py-7';
  }

  return (
    <SbEditable content={blok}>
      <Layout hasHero={hasHeroBanner} {...props}>
        <Container
          element="main"
          id="main-content"
          className="basic-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <header className="su-basefont-23">
            {getNumBloks(sectionMenu) > 0 && (
              <CreateBloks
                blokSection={sectionMenu}
                id="section-menu-mobile"
                className={`${
                  hasHeroBanner
                    ? 'su-rs-my-2'
                    : 'su-rs-mt-2 su-mb-[-1.6rem] md:su-mb-[-5rem]'
                } lg:su-hidden su-block su-mx-auto su-max-w-[35rem]`}
              />
            )}
            <CreateBloks blokSection={hero} />
            {filename && (
              <HeroImage
                filename={filename}
                alt={alt}
                focus={focus}
                overlay={false}
                aspectRatio="5x2"
                className="su-aspect-w-5 su-aspect-h-2"
              />
            )}
            <Container>
              <Heading
                level={1}
                align="center"
                font="serif"
                srOnly={isSrOnlyTitle}
                id="page-title"
                className="su-max-w-900 su-mb-0 su-rs-py-5 xl:su-rs-py-7 su-type-6 su-mx-auto su-max-w-1200"
              >
                {title}
              </Heading>
            </Container>
          </header>
          {numAbove > 0 && (
            <div className="basic-page-above-content">
              <CreateBloks blokSection={aboveContent} />
            </div>
          )}
          {pageLayout === 'no-sidebar' && (
            <BasicContentNoSidebar className={contentPadding} {...props} />
          )}
          {pageLayout === 'left-sidebar' && (
            <BasicContentLeftSidebar className={contentPadding} {...props} />
          )}
          {numBelow > 0 && (
            <div className="basic-page-below-content">
              <CreateBloks blokSection={belowContent} />
            </div>
          )}
          {numAnkle > 0 && <Ankle {...props} />}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default BasicPage;
