// Find out whether a WYSIWYG has content

import { render } from 'storyblok-rich-text-react-renderer';
import getNumBloks from './getNumBloks';

const hasRichText = (wysiwyg) => getNumBloks(render(wysiwyg)) > 0;

export default hasRichText;
