import React, { useEffect, useContext } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import AuthContext from '../../../contexts/AuthContext';
import {
  setGiveGabVars,
  unsetGiveGabVars,
} from '../../../utilities/giveGabVars';

const FormPage = (props) => {
  const {
    blok: {
      trip,
      title,
      isSrOnlyTitle,
      heroImage: { filename, alt, focus } = {},
      formContent,
      giveGabForm,
      ankleContent,
      isSingleColumn,
    },
    blok,
  } = props;
  const hasDefaultHero = isSingleColumn ? filename : null;
  const numAnkle = getNumBloks(ankleContent);
  let contentStyle = 'su-sticky su-top-0 su-h-fit';
  let formCardStyle = 'su-rs-mt-7 lg:su-col-start-7 xl:su-col-start-7';
  let heroStyle = 'su-fixed su-top-0 su-z-0 su-h-full su-w-full';
  let bgCardStyle = false;
  let overlay = 'formDark';
  let gridContainerStyle = ' su-rs-pt-6';

  if (isSingleColumn) {
    heroStyle = '';
    contentStyle = '';
    formCardStyle = 'lg:su-col-start-4 xl:su-col-start-4';
    bgCardStyle = 'su-bg-saa-black';
    overlay = 'dark';
    gridContainerStyle = 'su-bg-saa-black';
  }

  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (userProfile) {
      setGiveGabVars(userProfile);
    }
    return () => {
      unsetGiveGabVars();
    };
  }, [userProfile]);

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Layout hasHero={hasDefaultHero} {...props}>
          <Container
            as="main"
            id="main-content"
            className="basic-page su-relative su-flex-grow su-w-full"
            width="full"
          >
            <div className={heroStyle}>
              <HeroImage
                filename={filename}
                alt={alt}
                focus={focus}
                overlay={overlay}
                aspectRatio="5x2"
                className="su-object-cover su-h-full su-w-full"
              />
            </div>
            <Grid
              gap
              xs={12}
              className={dcnb(
                'su-relative su-cc su-z-10 su-rs-pb-8',
                gridContainerStyle
              )}
            >
              <GridCell
                xs={12}
                lg={isSingleColumn ? 12 : 5}
                xl={isSingleColumn ? 12 : 5}
              >
                <div className={dcnb('su-text-white', contentStyle)}>
                  {title && (
                    <Heading
                      level={1}
                      align="left"
                      font="serif"
                      size={isSingleColumn ? 8 : null}
                      srOnly={isSrOnlyTitle}
                      id="page-title"
                      className={
                        isSingleColumn
                          ? 'su-rs-mt-5 su-text-center'
                          : 'su-rs-mt-7'
                      }
                    >
                      {title}
                    </Heading>
                  )}
                  <CreateBloks blokSection={formContent} trip={trip} />
                </div>
              </GridCell>
              <GridCell
                xs={12}
                lg={6}
                xl={isSingleColumn ? 6 : 5}
                className={formCardStyle}
              >
                <CreateBloks
                  blokSection={giveGabForm}
                  bgCardStyle={bgCardStyle}
                />
              </GridCell>
            </Grid>
            {numAnkle > 0 && <Ankle isDark {...props} />}
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default FormPage;
