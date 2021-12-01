import React from 'react';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import { Grid } from '../../layout/Grid';
import { Heading } from '../../simple/Heading';
import CreateBloks from '../../../utilities/createBloks';
import WidthBox from '../../layout/widthBox';
import { bgTextColorPairs } from '../../../utilities/dataSource';
import getNumBloks from '../../../utilities/getNumBloks';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import * as styles from './ankle.styles';

/**
 * The ankle component is referenced and used in the page type components.
 * It allows for placing 1 to 3 icon cards above the local footer.
 */

const Ankle = ({
  blok: {
    ankleContent,
    ankleTitle,
    isAnkleTitleSrOnly,
    ankleIntro,
    ankleBgColor,
  },
  isDark,
}) => {
  const numItems = getNumBloks(ankleContent);
  let ankleBgStyles = bgTextColorPairs[ankleBgColor ?? 'white'];
  let isAnkleDark;

  // When black is selected as the background color, set the child component nested in the region to use their dark themed versions
  if (ankleBgColor === 'black') {
    isAnkleDark = true;
  }

  // This is for when "isDark" boolean prop is passed from parent component, eg., dark background page only allows for dark ankle region
  if (isDark) {
    ankleBgStyles = bgTextColorPairs.black;
    isAnkleDark = true;
  }

  const ankleWrapperStyles = dcnb(styles.root, ankleBgStyles);

  let ankleWidth = '12';

  if (numItems === 1) {
    ankleWidth = '6';
  } else if (numItems === 2) {
    ankleWidth = '10';
  }

  return (
    <div className={ankleWrapperStyles}>
      {(ankleTitle || ankleIntro) && (
        <Container as="header">
          {ankleTitle && (
            <Heading
              srOnly={isAnkleTitleSrOnly}
              level={2}
              size={2}
              font="serif"
              align="center"
              className={dcnb(
                styles.heading,
                `${
                  hasRichText(ankleIntro)
                    ? styles.headingMarginHasIntro
                    : styles.headingMarginNoIntro
                }`
              )}
            >
              {ankleTitle}
            </Heading>
          )}
          {hasRichText(ankleIntro) && (
            <div className={styles.introWrapper}>
              <RichTextRenderer
                wysiwyg={ankleIntro}
                className={styles.intro}
                isDark={isAnkleDark}
              />
            </div>
          )}
        </Container>
      )}
      <WidthBox width={ankleWidth}>
        <Grid xs={1} md={numItems} gap className={styles.iconCardGrid}>
          <CreateBloks blokSection={ankleContent} isDark={isAnkleDark} />
        </Grid>
      </WidthBox>
    </div>
  );
};

export default Ankle;
