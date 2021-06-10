import React, { useState, useEffect } from 'react'
import SearchField from '../components/search/searchField'
import SearchResults from '../components/search/searchResults'
import SearchPager from '../components/search/searchPager'
import SearchFacet from '../components/search/searchFacet'
import algoliasearch from 'algoliasearch'


const SearchPage = () => {
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [selectedFacets, setSelectedFacets] = useState({
    siteName: []
  })

  const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_API_KEY)
  const index = client.initIndex('crawler_federated-search')
  const hitsPerPage = 16

  useEffect(() => {
    updateSearchResults()
  }, [query, page, selectedFacets])

  const updateAutocomplete = async (query) => {
    const results = await client.multipleQueries([
      {
        indexName: 'crawler_federated-search_suggestions',
        query,
        params: {
          hitsPerPage: 10
        }
      },
      {
        indexName: 'crawler_federated-search',
        query,
        params: {
          hitsPerPage: 10
        }
      }
    ]).then((queryResults) => {
      let hits = [];
      for (const indexResults of queryResults.results) {
        const titles = indexResults.hits.map((hit) => hit.title)
        hits = hits.concat(titles)
      }
      return hits.slice(0, 10)
    })
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
    <div>
      <SearchField
        onInput={(query) => updateAutocomplete(query)}
        onSubmit={(query) => submitSearchQuery(query)}
        autocompleteSuggestions={suggestions}
      />
      <SearchResults results={results}></SearchResults>
      <SearchPager activePage={page} nbPages={results.nbPages} maxLinks={6} selectPage={updatePage}></SearchPager>
     
      {results.facets && results.facets.siteName &&
        <SearchFacet 
          attribute="siteName" 
          facetValues={results.facets.siteName} 
          selectedOptions={selectedFacets.siteName}
          onChange={(values) => updateFacetSelections("siteName", values)}
        ></SearchFacet>
      }
    </div>
  )
}

export default SearchPage