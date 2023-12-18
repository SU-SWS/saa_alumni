// Find out whether a WYSIWYG has content

import { render } from 'storyblok-rich-text-react-renderer-ts';

const hasRichText = (wysiwyg) => !!render(wysiwyg);

export default hasRichText;
