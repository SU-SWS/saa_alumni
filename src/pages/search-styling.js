import React, { useState } from "react";
import SearchFacet from "../components/search/searchFacet";
import SearchField from "../components/search/searchField";
import SearchPager from "../components/search/searchPager";
import SearchResults from "../components/search/searchResults";
import { Container, FlexCell, FlexBox, Heading } from "decanter-react";

const suggestions = [
  "Lorem ipsum dolor",
  "Nisi fusce cras",
  "Phasellus habitant arcu vivamus",
  "Interdum vel sociis",
  "Enim hac justo",
  "Porta tristique",
  "Facilisis primis venenatis",
  "Lobortis pulvinar dictumst",
  "Tristique imperdiet",
  "Lobortis phasellus arcu",
];

const sampleResultWithImage = {
  domain: "stanfordmag.org",
  url: "https://stanfordmag.org",
  title: "Lorem ipsum dolor sit amet consectetur",
  image:
    "https://project-orion-production.s3.amazonaws.com/uploads/content/21468/feature_WomanOnCouch.jpg",
  _snippetResult: {
    body: {
      value: `
      Raesent nec <strong>magazine</strong> dapibus odio. Aliquam dignissim nisi nisi,
      pharetra faucibus elit rhoncus in. Donec efficitur <strong>magazine</strong> scelerisque
      urna et sollicitudin. Donec <strong>magazine</strong> euismod enim a dui convallis,
      <strong>magazine</strong> quis suscipit leo vestibulum. Duis aliquam euismod enim, sit amet
      `,
    },
  },
};

const sampleResultNoImage = {
  domain: "students.alumni.stanford.edu/",
  url: "https://https://students.alumni.stanford.edu/",
  title: "Tristique cursus litora a est dapibus metus",
  _snippetResult: {
    body: {
      value: `
      Raesent nec <strong>magazine</strong> dapibus odio. Aliquam dignissim nisi nisi,
      pharetra faucibus elit rhoncus in. Donec efficitur <strong>magazine</strong> scelerisque
      urna et sollicitudin. Donec <strong>magazine</strong> euismod enim a dui convallis,
      <strong>magazine</strong> quis suscipit leo vestibulum. Duis aliquam euismod enim, sit amet
      `,
    },
  },
};

let hits = [];
for (let i = 0; i < 16; i++) {
  const includeImage = false;
  hits.push(includeImage ? sampleResultWithImage : sampleResultNoImage);
}

const results = {
  npPages: 16,
  nbHits: 4563,
  hits,
  facets: {
    siteName: {
      "Young Alumni": 13,
      Associates: 8,
      "Stanford Magazine": 26,
      "Alumni Center": 3,
      "Sierra Camp": 14,
      "Stanford Reunion": 2,
    },
  },
};

const SearchStyling = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activePage, setActivePage] = useState(2);
  const hasFacets = true;
  return (
    <>
      <Container
        element="section"
        width="full"
        className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light"
      >
        <Heading level={1} font="serif" weight="bold" className="su-mb-0">
          Search For...
        </Heading>
      </Container>
      <Container
        element="section"
        width="site"
        className="su-py-45 md:su-py-80"
      >
        <FlexBox gap justifyContent="end">
          <FlexCell xs="full" lg={8}>
            <SearchField
              autocompleteSuggestions={suggestions}
              onInput={(query) => {}}
            />
          </FlexCell>
        </FlexBox>
        <FlexBox wrap="wrap">
          {hasFacets && (
            <FlexCell xs="full" lg={4}>
              <SearchFacet
                attribute="siteName"
                facetValues={results.facets.siteName}
                selectedOptions={selectedOptions}
                onChange={(values) => setSelectedOptions(values)}
              />
            </FlexCell>
          )}
          <FlexCell xs="full" lg={hasFacets ? 8 : "full"}>
            <SearchResults results={results} />
            <SearchPager
              activePage={activePage}
              nbPages={8}
              maxLinks={6}
              selectPage={(page) => setActivePage(page)}
            />
          </FlexCell>
        </FlexBox>
      </Container>
    </>
  );
};

export default SearchStyling;
