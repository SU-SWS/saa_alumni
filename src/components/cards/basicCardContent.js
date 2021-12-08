import React from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../layout/FlexBox';
import { Heading } from '../simple/Heading';
import RichTextRenderer from '../../utilities/richTextRenderer';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import hasRichText from '../../utilities/hasRichText';

const BasicCardContent = ({
  headline,
  headingLevel = 3,
  text,
  cta,
  isBigHeadline,
  isDark,
  className,
  ...props
}) => {
  const hasCta = getNumBloks(cta) > 0;

  return (
    <FlexBox
      direction="col"
      className={dcnb('card-body', className)}
      {...props}
    >
      {headline && (
        <Heading
          level={headingLevel}
          font="serif"
          size={isBigHeadline ? 3 : 2}
          className={dcnb('su-mb-0', `${isDark ? 'su-text-white' : ''}`)}
        >
          {headline}
        </Heading>
      )}
      {hasRichText(text) && (
        <RichTextRenderer
          wysiwyg={text}
          isDark={isDark}
          className={`su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0
          ${headline ? 'su-rs-mt-neg1' : 'su-mt-03em'}`}
        />
      )}
      {hasCta > 0 && (
        <div className="su-rs-mt-2">
          <CreateBloks blokSection={cta} />
        </div>
      )}
    </FlexBox>
  );
};

export default BasicCardContent;
