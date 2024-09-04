import React from 'react';
import { ClearRefinements } from 'react-instantsearch';

export const NoResultsComponent = () => (
  <div className="su-w-full su-flex su-items-center su-justify-center">
    <div className="su-flex su-justify-center su-items-center su-rs-my-2">
      <div className="su-text-center">
        <h2 className="su-text-center su-text-cardinal-red-light">
          No events found!
        </h2>
        <p className="su-text-center">
          Try changing your search criteria or filter options to find events.
        </p>
        <div>
          <ClearRefinements
            translations={{
              resetButtonText: 'Reset all filters',
            }}
            classNames={{
              button:
                'disabled:su-hidden su-text-3xl su-border-2 su-border-cardinal-red su-px-10 su-py-6 su-rounded-xl su-text-cardinal-red-light hover:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-white hocus:su-bg-cardinal-red-light',
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
