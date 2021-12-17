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
import * as styles from './iconCards.styles';

const IconCards = ({ blok, isDark, isAnkle }) => {
  let { content, title, isTitleSrOnly, intro, bgColor } = blok;

  // Ankle has a different schema.
  if (isAnkle) {
    title = blok.ankleTitle;
    content = blok.ankleContent;
    isTitleSrOnly = blok.isAnkleTitleSrOnly;
    intro = blok.ankleIntro;
    bgColor = blok.ankleBgColor;
  }
  const numItems = getNumBloks(content);
  let bgStyles = bgTextColorPairs[bgColor ?? 'white'];
  let isDarkVar = isDark;

  // When black is selected as the background color, set the child component nested in the region to use their dark themed versions
  if (bgColor === 'black') {
    isDarkVar = true;
  }

  // This is for when "isDark" boolean prop is passed from parent component, eg., dark background page only allows for dark ankle region
  if (isDark) {
    bgStyles = bgTextColorPairs.black;
  }

  const ankleWrapperStyles = dcnb(styles.root, bgStyles);

  let ankleWidth = '12';

  if (numItems === 1) {
    ankleWidth = '6';
  } else if (numItems === 2) {
    ankleWidth = '10';
  }

  return (
    <div className={ankleWrapperStyles}>
      {(title || intro) && (
        <Container as="header">
          {title && (
            <Heading
              srOnly={isTitleSrOnly}
              level={2}
              size={2}
              font="serif"
              align="center"
              className={dcnb(
                styles.heading,
                `${
                  hasRichText(intro)
                    ? styles.headingMarginHasIntro
                    : styles.headingMarginNoIntro
                }`
              )}
            >
              {title}
            </Heading>
          )}
          {hasRichText(intro) && (
            <div className={styles.introWrapper}>
              <RichTextRenderer
                wysiwyg={intro}
                className={styles.intro}
                isDark={isDarkVar}
              />
            </div>
          )}
        </Container>
      )}
      <WidthBox width={ankleWidth}>
        <Grid xs={1} md={numItems} gap className={styles.iconCardGrid}>
          <CreateBloks blokSection={content} isDark={isDarkVar} />
        </Grid>
      </WidthBox>
    </div>
  );
};

export default IconCards;
