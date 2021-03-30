import React from "react";
import SbEditable from "storyblok-react";
import { Container, Grid, GridCell, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";

const InteriorPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <Layout {...props}>
        <Container element='main'
                   id='main-content'
                   className={`su-relative su-flex-grow su-w-full`}
        >
          <Grid gap={true} xs={12}>
            {/* purgecss: su-grid-cols-12 */}
            <GridCell xs={12} lg={10} xl={8} className='lg:su-col-start-2 xl:su-col-start-3'>
              {/* purgecss: su-col-span-12 lg:su-col-span-10 xl:su-col-span-8 */}
              <header className={`su-rs-mt-3`}>
                {/* purgecss: su-font-serif su-font-bold su-type-4 */}
                <Heading level={1} font='serif' weight='bold' size={4} className='su-mb-03em'>{props.blok.title}</Heading>
              </header>
              <div className='su-bg-white su-rs-p-3 su-shadow-lg su-rs-mb-5 su-link-digital-red hover:su-link-sky-dark focus:su-link-sky-dark'>
                <CreateBloks blokSection={props.blok.content} />
              </div>
            </GridCell>
          </Grid>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default InteriorPage;
