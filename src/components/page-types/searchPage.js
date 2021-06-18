import React, { useState, useEffect } from "react";
import SearchField from "../../components/search/searchField";
import SearchResults from "../../components/search/searchResults";
import SearchPager from "../../components/search/searchPager";
import SearchFacet from "../../components/search/searchFacet";
import SearchNoResults from "../../components/search/searchNoResults";
import algoliasearch from "algoliasearch";
import { Container, FlexCell, FlexBox, Heading } from "decanter-react";

const SearchPage = ({blok}) => {
  console.log('blok', blok)
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [selectedFacets, setSelectedFacets] = useState({
    siteName: []
  })

  const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_API_KEY)
  const index = client.initIndex('crawler_federated-search')
  const suggestionsIndex = client.initIndex('crawler_federated-search_suggestions')
  const hitsPerPage = blok.itemsPerPage

  useEffect(() => {
    updateSearchResults()
  }, [query, page, selectedFacets])

  const updateAutocomplete = async (query) => {
    const results = await suggestionsIndex.search(query, {
      hitsPerPage: 10,
    }).then((queryResults) => queryResults.hits)
    setSuggestions(results)
  }

  const submitSearchQuery = async (query) => {
    setQuery(query)
  }

  const updatePage = async (page) => {
    setPage(page)
  }

  const updateFacetSelections = async (attribute, values) => {
    const newFacets = {...selectedFacets}
    newFacets[attribute] = values
    setSelectedFacets(newFacets)
  }

  const updateSearchResults = async () => {
    const facetFilters = Object.keys(selectedFacets).map((attribute) => {
      return selectedFacets[attribute].map((value) => `${attribute}:${value}`)
    })

    const algoliaResults = await index.search(query, {
      hitsPerPage,
      page,
      facets: [
        'domain',
        'siteName'
      ],
      facetFilters
    })
    .then((queryResults) => {
      return queryResults
    })
    setResults(algoliaResults)
    return
  }


  return (
    <>
      <Container
        element="section"
        width="full"
        className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light su-flex-wrap"
      >
        <Heading level={1} font="serif" weight="bold" className="su-mb-0">
          Search For...
        </Heading>
      </Container>
      <Container
        element="section"
        width="site"
        className="su-py-45 md:su-py-80 "
      >
        <FlexBox gap justifyContent="center">
          <FlexCell xs="full" lg={results.facets ? 6 : 8}>
            <SearchField
              onInput={(query) => updateAutocomplete(query)}
              onSubmit={(query) => submitSearchQuery(query)}
              autocompleteSuggestions={suggestions}
            />
          </FlexCell>
        </FlexBox>
        <FlexBox
          wrap="wrap"
          justifyContent={results.facets ? "start" : "center"}
          className="su-mt-50 md:su-mt-70 xl:su-mt-[12rem]"
        >
          {results.facets && (
            <FlexCell xs="full" lg={3} className="su-mb-[4rem] ">
              {results.facets.siteName && (
                <SearchFacet
                  attribute="siteName"
                  facetValues={results.facets.siteName}
                  selectedOptions={selectedFacets.siteName}
                  onChange={(values) =>
                    updateFacetSelections("siteName", values)
                  }
                />
              )}
            </FlexCell>
          )}
          <FlexCell xs="full" lg={8}>
            {results.nbHits > 0 && (
              <>
                <SearchResults results={results} />
                <SearchPager
                  activePage={page}
                  nbPages={results.nbPages}
                  maxLinks={blok.maxPagerLinks}
                  selectPage={updatePage}
                />
              </>
            )}
            {!results.nbHits && query && 
              <SearchNoResults heading={blok.noResultsHeading.replace('[query]', query)} body={blok.noResultsBody} additionalContent={blok.noResultsAdditionalContent} />
            }
          </FlexCell>
        </FlexBox>
      </Container>
    </>
  );
}

export default SearchPage