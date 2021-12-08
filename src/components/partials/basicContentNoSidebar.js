import React from 'react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import WidthBox from '../layout/widthBox';
import getNumBloks from '../../utilities/getNumBloks';
import hasRichText from '../../utilities/hasRichText';

const BasicContentNoSidebar = ({ blok: { content, intro }, className }) => {
  const hasContent = getNumBloks(content) > 0;

  if (!hasRichText(intro) && !hasContent) {
    return null;
  }

  return (
    <WidthBox
      width="8"
      className={dcnb(
        'basic-page-main-content su-basefont-23 su-mx-auto',
        className
      )}
    >
      {hasRichText(intro) && (
        <RichTextRenderer wysiwyg={intro} className="su-type-2 su-rs-mb-3" />
      )}
      <CreateBloks blokSection={content} />
    </WidthBox>
  );
};

export default BasicContentNoSidebar;
