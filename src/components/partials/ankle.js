import { Heading, Grid as DrGrid } from 'decanter-react';
import React from 'react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import WidthBox from '../layout/widthBox';
import { bgTextColorPairs } from '../../utilities/dataSource';
import getNumBloks from '../../utilities/getNumBloks';

/**
 * The ankle component is referenced and used in the page type components.
 * It allows for placing 1 to 3 icon cards above the local footer.
 */

const Ankle = ({
  blok: { ankleContent, ankleTitle, isAnkleTitleSrOnly, ankleBgColor },
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

  const ankleWrapperStyles = dcnb(
    'ankle su-relative su-rs-py-7',
    ankleBgStyles
  );

  let ankleWidth = '12';

  if (numItems === 1) {
    ankleWidth = '6';
  } else if (numItems === 2) {
    ankleWidth = '10';
  }

  return (
    <div className={ankleWrapperStyles}>
      {ankleTitle && (
        <Heading
          srOnly={isAnkleTitleSrOnly}
          level={2}
          size={2}
          font="serif"
          weight="bold"
          align="center"
          className="su-rs-mb-3 su-mt-[-0.6em] su-mx-auto su-max-w-900"
        >
          {ankleTitle}
        </Heading>
      )}
      <WidthBox width={ankleWidth}>
        <DrGrid
          xs={1}
          md={numItems}
          gap
          className={dcnb(
            'su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]'
          )}
        >
          <CreateBloks blokSection={ankleContent} isDark={isAnkleDark} />
        </DrGrid>
      </WidthBox>
    </div>
  );
};

export default Ankle;
