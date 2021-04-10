import React from "react";
import SbEditable from "storyblok-react";
import { Container, Grid, GridCell, Heading, Alert } from "decanter-react";
import Layout from "../partials/layout";
import CreateBloks from "../../utilities/createBloks";

const InteriorPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <Layout {...props}>
        <Alert>This is alert</Alert>
        <Container element='main'
                   id='main-content'
                   className={`su-relative su-flex-grow su-w-full`}
        >
          <Grid gap={true} xs={12}>
            <GridCell xs={12} lg={10} xl={8} className='lg:su-col-start-2 xl:su-col-start-3'>
              <header className={`su-rs-mt-3`}>
                <Heading level={1} font='serif' weight='bold' size={4} className='su-mb-03em'>{props.blok.title}</Heading>
              </header>
              <div className='su-bg-white su-rs-mt-3 su-rs-mb-7'>
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
