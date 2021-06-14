import React from "react";

const SearchResults = ({ results }) => {
  if (!results.hits) {
    return <div />;
  }

  return (
    <div>
      <div>
        <strong>{results.nbHits}</strong> results:
      </div>
      {results.hits.map((result, index) => {
        return (
          <div
            key={index}
            className="su-py-30 su-px-38 su-border-b-[1px] su-border-black-20"
          >
            <div className="su-flex">
              <div className="su-flex-1">
                <div className="su-text-16 su-mb-10">{result.domain}</div>
                <h3 className="su-text-24">
                  <a
                    className="su-font-serif su-text-digital-red-light"
                    href={result.url}
                  >
                    {result.title}
                  </a>
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: result._snippetResult.body.value,
                  }}
                ></div>
              </div>
              {result.image && (
                <div className="su-w-[225px] su-h-[150px] su-ml-30">
                  <img
                    className="su-block su-object-cover su-object-center su-h-full"
                    src={result.image}
                    alt={`Thumbnail image for ${result.title}`}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SearchResults;
