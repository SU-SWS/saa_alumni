import React from 'react';
import sanitize from 'sanitize-html';
import { useLocation } from '@reach/router';
import { Heading } from '../simple/Heading';
import HeroIcon from '../simple/heroIcon';
import { utmParams } from '../../utilities/utmParams';

const SearchResults = ({ results }) => {
  const location = useLocation();
  const utms = utmParams(location.search);
  const checkParams = (url) => {
    let linkUrl = url;
    if (linkUrl.match(/\?/) && utms.length) {
      linkUrl += `&${utms}`;
    } else if (utms.length) {
      linkUrl += `?${utms}`;
    }
    return linkUrl;
  };

  if (!results.hits) {
    return <div />;
  }

  return (
    <div id="search-results">
      <div
        className="su-text-21 lg:su-mb-[4rem]"
        aria-live="polite"
        aria-atomic="true"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        id="number-search-results"
      >
        <span className="su-font-semibold">{results.nbHits}</span> results:
      </div>
      {results.hits.map((result) => (
        <div
          key={result.objectID}
          className="su-px-0 su-rs-py-2 md:su-rs-px-2 su-border-b su-border-black-40"
        >
          <div className="su-flex su-flex-wrap md:su-flex-nowrap">
            <div className="md:su-flex-1 su-w-full">
              <div className="su-text-16 su-mb-10">{result.domain}</div>
              <Heading level={3} size={1} font="serif">
                <a
                  className="su-text-digital-red-light su-group su-transition-colors hocus:su-underline"
                  href={checkParams(result.url)}
                >
                  {result.fileType === 'video' && (
                    <HeroIcon
                      iconType="video"
                      className="su-inline-block su-mr-02em"
                      srText="Video: "
                    />
                  )}
                  {result.fileType === 'audio' && (
                    <HeroIcon
                      iconType="podcast"
                      className="su-inline-block su-ml-01em"
                      srText="Podcast: "
                    />
                  )}
                  <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      // eslint-disable-next-line no-underscore-dangle
                      __html: sanitize(result.title, {
                        decodeEntities: false,
                      }),
                    }}
                  />
                  <HeroIcon
                    iconType={
                      result.domain.match(/^alumni.stanford.edu/)
                        ? 'arrow-right'
                        : 'external'
                    }
                    className="su-inline-block group-hover:su-text-cardinal-red group-focus:su-text-cardinal-red"
                    isAnimate
                    srText={
                      result.domain.match(/^alumni.stanford.edu/)
                        ? ''
                        : ' (external link)'
                    }
                  />
                </a>
              </Heading>
              {/* eslint-disable-next-line no-underscore-dangle */}
              {result._snippetResult?.body.value && (
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
              <div className="su-rs-mt-0 su-w-[15rem] su-h-100 md:su-w-[22.5rem] md:su-h-[15rem] md:su-ml-30">
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
