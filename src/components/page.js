import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../utilities/createBloks';
import Footer from './partials/footer';

const Page = ({ blok: { body }, blok, ...rest }) => (
  <SbEditable content={blok}>
    <div className="su-flex su-flex-col su-min-h-screen">
      <main className="su-flex-grow">
        <CreateBloks blokSection={body} />
      </main>
      <Footer blok={blok} />
    </div>
  </SbEditable>
);

export default Page;
