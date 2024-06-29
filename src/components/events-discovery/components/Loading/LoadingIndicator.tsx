import React from 'react';

export const LoadingIndicator = () => (
  <div className="su-w-full su-flex su-items-center su-justify-center su-rs-my-1">
    <div className="su-flex su-justify-center su-items-center">
      <div className="su-animate-spin su-rounded-full su-h-32 su-w-32 su-border-t-4 su-border-b-4 su-border-cardinal-red-light su-mr-8" />
      Please wait! Loading events...
    </div>
  </div>
);
