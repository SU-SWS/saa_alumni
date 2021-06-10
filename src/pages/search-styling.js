import React, {useState} from 'react'
import SearchFacet from '../components/search/searchFacet'
import SearchField from '../components/search/searchField'
import SearchPager from '../components/search/searchPager'
import SearchResults from '../components/search/searchResults'

const suggestions = [
  'Lorem ipsum dolor',
  'Nisi fusce cras',
  'Phasellus habitant arcu vivamus',
  'Interdum vel sociis',
  'Enim hac justo',
  'Porta tristique',
  'Facilisis primis venenatis',
  'Lobortis pulvinar dictumst',
  'Tristique imperdiet',
  'Lobortis phasellus arcu',
]

const sampleResultWithImage = {
  domain: 'stanfordmag.org',
  url: 'https://stanfordmag.org',
  image: 'https://project-orion-production.s3.amazonaws.com/uploads/content/21468/feature_WomanOnCouch.jpg',
  _snippetResult: {
    body: {
      value: `
      Raesent nec <strong>magazine</strong> dapibus odio. Aliquam dignissim nisi nisi, 
      pharetra faucibus elit rhoncus in. Donec efficitur <strong>magazine</strong> scelerisque 
      urna et sollicitudin. Donec <strong>magazine</strong> euismod enim a dui convallis, 
      <strong>magazine</strong> quis suscipit leo vestibulum. Duis aliquam euismod enim, sit amet
      `
    }
  }
}

const sampleResultNoImage = {
  domain: 'students.alumni.stanford.edu/',
  url: 'https://https://students.alumni.stanford.edu/',
  _snippetResult: {
    body: {
      value: `
      Raesent nec <strong>magazine</strong> dapibus odio. Aliquam dignissim nisi nisi, 
      pharetra faucibus elit rhoncus in. Donec efficitur <strong>magazine</strong> scelerisque 
      urna et sollicitudin. Donec <strong>magazine</strong> euismod enim a dui convallis, 
      <strong>magazine</strong> quis suscipit leo vestibulum. Duis aliquam euismod enim, sit amet
      `
    }
  }
}

let hits = []
for (let i = 0; i < 16; i++ ) {
  const includeImage = Math.random() > 0.5 ? true : false;
  hits.push(includeImage ? sampleResultWithImage : sampleResultNoImage)
}

const results = {
  npPages: 16,
  hits,
  facets: {
    siteName: {
      "Young Alumni": 13,
      "Associates": 8,
      "Stanford Magazine": 26,
      "Alumni Center": 3,
      "Sierra Camp": 14,
      "Stanford Reunion": 2
    }
  }
}
const page = 2;

const SearchStyling = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  return (
    <div>
      <SearchField 
        autocompleteSuggestions={suggestions}
        onInput={(query) => {}}
      />
      <SearchResults results={results}></SearchResults>
      <SearchPager activePage={page} nbPages={results.nbPages} maxLinks={6}></SearchPager>
      <SearchFacet 
        attribute="siteName" 
        facetValues={results.facets.siteName}
        selectedOptions={selectedOptions}
        onChange={(values) => setSelectedOptions(values)}
      ></SearchFacet>

    </div>
  )
}

export default SearchStyling