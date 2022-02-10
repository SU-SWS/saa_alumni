import React, { useContext } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';
import { Heading } from '../simple/Heading';
import Layout from '../partials/layout';
import CreateBloks from '../../utilities/createBloks';
// TODO: Import user auth information from AuthContext.js
import AuthenticatedPage from '../auth/AuthenticatedPage';
import AuthContext from '../../contexts/AuthContext';

const ProtectedPage = (props) => {
  // Destructure.
  const {
    blok: { title, form },
    blok,
  } = props;

  // The user context.
  const { user } = useContext(AuthContext);

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Layout {...props}>
          <Container
            element="main"
            id="main-content"
            width="full"
            className="su-relative su-flex-grow su-w-full su-break-words"
          >
            <Grid gap={false} xs={12} className={dcnb('su-relative su-cc')}>
              <GridCell
                xs={12}
                lg={10}
                xl={8}
                className="lg:su-col-start-2 xl:su-col-start-3"
              >
                <header className="su-bg-white su-rs-p-5 su-shadow-lg su-rs-mb-3 su-rs-mt-3">
                  <Heading
                    level={1}
                    font="serif"
                    weight="bold"
                    size={4}
                    className="su-mb-04em"
                  >
                    {title}
                  </Heading>
                </header>
                <div className="su-rs-mb-7">
                  <CreateBloks blokSection={form} />
                </div>
              </GridCell>
            </Grid>
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default ProtectedPage;
