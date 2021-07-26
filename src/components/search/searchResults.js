import React from "react";
import sanitize from "sanitize-html";
import { VideoCameraIcon, MicrophoneIcon, ArrowRightIcon } from "@heroicons/react/outline";

const SearchResults = ({ results }) => {
  if (!results.hits) {
    return <div />;
  }

  return (
    <div id="search-results">
      <div className="su-text-21 lg:su-mb-[4rem]">
        <span className="su-font-semibold">{results.nbHits}</span> results:
      </div>
      {results.hits.map((result) => (
        <div
          key={result.objectID}
          className="su-p-30 sm:su-py-[4rem] su-border-b su-border-black-40"
        >
          <div className="su-flex su-flex-wrap md:su-flex-nowrap">
            <div className="md:su-flex-1">
              <div className="su-text-16 su-mb-10">{result.domain}</div>
              <h3 className="su-text-24">
                <a
                  className="su-font-serif su-text-digital-red-light"
                  href={result.url}
                >
                  {result.fileType === "video" &&
                    <VideoCameraIcon className="su-w-20 su-h-20 su-mr-5 su-align-top su-mt-2 su-inline-block" />
                  }
                  {result.fileType === "audio" &&
                    <MicrophoneIcon className="su-w-20 su-h-20 su-mr-5 su-align-top su-mt-4 su-inline-block" />
                  }
                  {result.title}
                  {result.domain.match(/stanford.edu/) &&
                    <ArrowRightIcon className="su-w-20 su-inline-block su-ml-5 su-mb-4" />
                  }
                  {!result.domain.match(/stanford.edu/) &&
                    <ArrowRightIcon className="su-w-20 su-inline-block su-ml-5 su-mb-4 su-transform su--rotate-45" />
                  }
                </a>
              </h3>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  // eslint-disable-next-line no-underscore-dangle
                  __html: sanitize(result._snippetResult.body.value),
                }}
              />
            </div>
            {result.image && (
              <div className="md:su-w-[225px] su-h-[150px] su-mx-auto su-mt-15 md:su-mx-0 md:su-mt-0 md:su-ml-30">
                <img
                  className="su-block su-object-cover su-object-center su-h-full"
                  src={result.image}
                  alt={result.title}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchResults;
