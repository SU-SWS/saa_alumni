// Find how many nested bloks are added in Storyblok when we use the CreateBloks utility.
import { render } from 'storyblok-rich-text-react-renderer';
import getNumBloks from './getNumBloks';

const hasRichText = (wysiwyg) => getNumBloks(render(wysiwyg)) > 0;

export default hasRichText;
