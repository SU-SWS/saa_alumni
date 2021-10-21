import React from 'react';
import { dcnb } from 'cnbuilder';
import { render } from 'storyblok-rich-text-react-renderer';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import WidthBox from '../layout/widthBox';
import getNumBloks from '../../utilities/getNumBloks';

const BasicContentNoSidebar = ({ blok: { content, intro }, className }) => {
  const renderedIntro = render(intro);
  const hasIntro = getNumBloks(renderedIntro) > 0;
  const hasContent = getNumBloks(content) > 0;

  if (!hasIntro && !hasContent) {
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
      {hasIntro && (
        <RichTextRenderer wysiwyg={intro} className="su-type-2 su-rs-mb-3" />
      )}
      <CreateBloks blokSection={content} />
    </WidthBox>
  );
};

export default BasicContentNoSidebar;
