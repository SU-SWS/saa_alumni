import React from "react";
import SbEditable from "storyblok-react";
import { Container, Grid, GridCell, Heading } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";

const InteriorPage = (props) => {

  // Destructure.
  const {
    blok: {
      title,
      content
    },
    blok
  } = props;

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
        <Container element='main'
                   id='main-content'
                   className={`su-relative su-flex-grow su-w-full`}
        >
          <Grid gap={true} xs={12}>
            <GridCell xs={12} lg={10} xl={8} className='lg:su-col-start-2 xl:su-col-start-3'>
              <header className={`su-rs-mt-3`}>
                <Heading level={1} font='serif' weight='bold' size={4} className='su-mb-03em'>{title}</Heading>
              </header>
              <div className='su-bg-white su-rs-mt-3 su-rs-mb-7'>
                <CreateBloks blokSection={content} />
              </div>
            </GridCell>
          </Grid>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default InteriorPage;
