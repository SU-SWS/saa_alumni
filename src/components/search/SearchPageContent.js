import React, { useMemo, useState } from 'react';
import {
  Configure,
  Hits,
  Pagination,
  RefinementList,
  Stats,
  useStats,
} from 'react-instantsearch';
import SbEditable from 'storyblok-react';
import { Container } from '../layout/Container';
import Layout from '../partials/Layout';
import { Heading } from '../simple/Heading';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';
import SearchField from './searchField';
import getNumBloks from '../../utilities/getNumBloks';
import CreateBloks from '../../utilities/createBloks';
import { Skiplink } from '../accessibility/Skiplink';

/**
 * Content Block.
 *
 * @param {*} props
 * @returns
 */
const SearchPageContent = (props) => {
  const { blok } = props;
  const { itemsPerPage } = blok;
  const { nbHits, areHitsSorted, nbSortedHits } = useStats();

  const resultCount = useMemo(() => {
    if (areHitsSorted) {
      return nbSortedHits;
    }
    return nbHits;
  }, [areHitsSorted, nbHits, nbSortedHits]);

  const itemsPerPageInt = useMemo(
    () => parseInt(itemsPerPage, 10),
    [itemsPerPage]
  );

  // Mobile State.
  // --------------------------------------------------
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Configure hitsPerPage={itemsPerPageInt} />

      <SbEditable content={blok}>
        <Layout hasHero={false} {...props}>
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
                <SearchField placeholder="Search for something..." />
                {!resultCount && (
                  <p className="su-text-m1 su-font-serif su-font-bold su-rs-mt-2 su-mb-0">
                    {blok.emptySearchMessage}
                  </p>
                )}
              </GridCell>
            </Grid>
            {getNumBloks(blok.aboveResultsContent) > 0 && (
              <div className="above-results-content su-rs-mt-7">
                <CreateBloks blokSection={blok.aboveResultsContent} />
              </div>
            )}
            <Grid xs={12} className="filters su-rs-mt-7 lg:su-grid-gap">
              <GridCell
                xs={12}
                lg={3}
                className="su-mb-40 su-hidden lg:su-flex"
              >
                <Skiplink
                  anchorLink="#search-results-section"
                  className="su-hidden lg:su-block"
                >
                  Skip past filters to search results
                </Skiplink>
                <Heading level={2} srOnly>
                  Filter Search Results
                </Heading>
                <div>
                  <p>Sites</p>
                  <RefinementList attribute="siteName" />
                  <p>Media</p>
                  <RefinementList attribute="fileType" />
                </div>
              </GridCell>
              <GridCell xs={12} lg={3} className="su-mb-40">
                <div
                  className="su-text-21 lg:su-mb-40"
                  aria-live="polite"
                  aria-atomic="true"
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex="0"
                  id="number-search-results"
                >
                  <span className="su-font-semibold">{resultCount}</span>{' '}
                  results:
                </div>
                <Hits />
              </GridCell>
            </Grid>
            <Grid>
              <GridCell>
                <Pagination
                  classNames={{ list: 'su-flex su-list-none', item: 'su-px-6' }}
                />
              </GridCell>
            </Grid>
          </Container>
        </Layout>
      </SbEditable>
    </>
  );
};

export default SearchPageContent;
