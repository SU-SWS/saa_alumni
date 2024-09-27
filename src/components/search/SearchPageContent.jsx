import React, { useMemo } from 'react';
import { useStats, useInstantSearch } from 'react-instantsearch';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container } from '../layout/Container';
import Layout from '../partials/Layout';
import { Heading } from '../simple/Heading';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';
import SearchField from './SearchField';
import getNumBloks from '../../utilities/getNumBloks';
import CreateBloks from '../../utilities/createBloks';
import { Skiplink } from '../accessibility/Skiplink';
import SearchFacet from './SearchFacet';
import SearchResults from './SearchResults';
import SearchPager from './SearchPager';
import SearchNoResults from './SearchNoResults';
import SearchKeywordBanner from './SearchKeywordBanner';

/**
 * Content Block.
 *
 * @param {*} props
 * @returns
 */
const SearchPageContent = (props) => {
  const { blok } = props;
  const { nbHits, areHitsSorted, nbSortedHits } = useStats();
  const { status } = useInstantSearch();

  const resultCount = useMemo(() => {
    if (areHitsSorted) {
      return nbSortedHits;
    }
    return nbHits;
  }, [areHitsSorted, nbHits, nbSortedHits]);

  return (
    <SbEditable content={blok}>
      <Layout hasHero={false} {...props} blok={blok}>
        <Container
          as="section"
          width="full"
          className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light su-flex-wrap"
          id="main-content"
        >
          <Heading level={1} font="serif" className="su-mb-0">
            {blok.pageTitle}
          </Heading>
        </Container>
        <Container
          as="section"
          width="site"
          className="su-py-45 su-max-w-full su-w-full md:su-py-80 "
        >
          <Grid gap xs={12} className="su-z-10 su-relative su-basefont-19">
            <GridCell
              xs={12}
              lg={resultCount > 0 ? 6 : 8}
              className={
                resultCount > 0 ? 'lg:su-col-start-4' : 'lg:su-col-start-3'
              }
            >
              <SearchField
                placeholder="Search for something..."
                emptySearchMessage={blok.emptySearchMessage}
              />
            </GridCell>
          </Grid>
          {getNumBloks(blok.aboveResultsContent) > 0 && (
            <div className="above-results-content su-rs-mt-7">
              <CreateBloks blokSection={blok.aboveResultsContent} />
            </div>
          )}
          <Grid
            xs={12}
            className={dcnb('filters su-rs-mt-7 lg:su-grid-gap', {
              'su-hidden': !nbHits && status === 'idle',
            })}
          >
            <GridCell xs={12} lg={3} className="su-mb-40 su-hidden lg:su-flex">
              <Skiplink
                anchorLink="#search-results-section"
                className="su-hidden lg:su-block"
              >
                Skip past filters to search results
              </Skiplink>
              <Heading level={2} srOnly>
                Filter Search Results
              </Heading>
              <div className="su-w-full">
                <SearchFacet
                  attribute="siteName"
                  label="Sites"
                  excludes={['YouTube', 'SoundCloud', 'Apple Podcasts']}
                />
                <SearchFacet
                  attribute="fileType"
                  label="Media"
                  excludes={['html', 'pdf']}
                />
              </div>
            </GridCell>
            <GridCell
              xs={12}
              lg={9}
              className="su-mb-40"
              id="search-results-section"
            >
              <SearchKeywordBanner />
              <SearchResults />
              <SearchPager />
            </GridCell>
          </Grid>

          {!nbHits && status === 'idle' && (
            <Grid xs={12} className="su-rs-mt-7">
              <SearchNoResults
                heading={blok.noResultsHeading}
                body={blok.noResultsBody}
                additionalContent={blok.noResultsAdditionalContent}
              />
            </Grid>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default SearchPageContent;
