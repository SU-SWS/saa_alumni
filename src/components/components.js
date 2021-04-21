import BasicCard from './cards/basicCard';
import ComponentNotFound from './component_not_found';
import CtaButton from './cta/ctaButton';
import CtaLink from './cta/ctaLink';
import CtaGroup from './cta/ctaGroup';
import Embed from './embed/embed';
import Hero from './composite/hero';
import InteriorPage from './page-types/interiorPage';
import LinkGroup from './navigation/linkGroup';
import LocalFooter from './identity/localFooter';
import LocalFooterPicker from './identity/localFooterPicker';
import NavItem from './navigation/navItem';
import Page from './page';
import Wysiwyg from './simple/wysiwyg';


const ComponentList = {
  basicCard: BasicCard,
  ctaButton: CtaButton,
  ctaLink: CtaLink,
  ctaGroup: CtaGroup,
  embed: Embed,
  hero: Hero,
  interiorPage: InteriorPage,
  linkGroup: LinkGroup,
  localFooter: LocalFooter,
  localFooterPicker: LocalFooterPicker,
  navItem: NavItem,
  page: Page,
  wysiwyg: Wysiwyg
};

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
