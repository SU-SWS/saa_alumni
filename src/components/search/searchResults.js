import React from "react";
import sanitize from "sanitize-html";
import { VideoCameraIcon, MicrophoneIcon } from "@heroicons/react/outline";
import HeroIcon from "../simple/heroIcon";
import { Heading } from "decanter-react";

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
          className="su-rs-p-2 su-border-b su-border-black-40"
        >
          <div className="su-flex su-flex-wrap md:su-flex-nowrap">
            <div className="md:su-flex-1 su-w-full">
              <div className="su-text-16 su-mb-10">{result.domain}</div>
              <Heading level={3} size={2} font="serif">
                <a
                  className="su-text-digital-red-light su-group su-transition-colors hocus:su-underline"
                  href={result.url}
                >
                  {result.fileType === "video" && (
                    <VideoCameraIcon className="su-w-20 su-h-20 su-mr-5 su-align-middle su-mb-3 su-inline-block" />
                  )}
                  {result.fileType === "audio" && (
                    <MicrophoneIcon className="su-w-20 su-h-20 su-mr-5 su-align-baseline su--mb-1 su-inline-block" />
                  )}
                  <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      // eslint-disable-next-line no-underscore-dangle
                      __html: sanitize(result.title, { decodeEntities: false }),
                    }}
                  />
                  <HeroIcon
                    iconType={
                      result.domain.match(/^alumni.stanford.edu/)
                        ? "arrow-right"
                        : "external"
                    }
                    className="su-inline-block group-hocus:su-text-cardinal-red"
                    isAnimate
                  />
                </a>
              </Heading>
              {/* eslint-disable-next-line no-underscore-dangle */}
              {result._snippetResult.body.value && (
                <p
                  className="su-card-paragraph su-leading-snug su-mb-0"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    // eslint-disable-next-line no-underscore-dangle
                    __html: sanitize(result._snippetResult.body.value),
                  }}
                />
              )}
            </div>
            {result.image && (
              <div className="su-rs-mt-0 su-w-[15rem] su-h-[10rem] md:su-w-[22.5rem] md:su-h-[15rem] md:su-ml-30">
                <img
                  className="su-block su-object-cover su-object-center su-h-full su-w-full"
                  src={result.image}
                  alt={result.title}
                  loading="lazy"
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
