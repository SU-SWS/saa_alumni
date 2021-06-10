import ComponentNotFound from './component_not_found';
import CtaLink from './simple/ctaLink';
import Embed from './embed/embed';
import InteriorPage from './page-types/interiorPage';
import LinkGroup from './navigation/linkGroup';
import LocalFooter from './identity/localFooter';
import LocalFooterPicker from './identity/localFooterPicker';
import NavItem from './navigation/navItem';
import Page from './page';
import searchFacet from './search/searchFacet';
import searchField from './search/searchField';
import searchPager from './search/searchPager';
import searchResults from './search/searchResults';
import Wysiwyg from './simple/wysiwyg';


const ComponentList = {
  ctaLink: CtaLink,
  embed: Embed,
  interiorPage: InteriorPage,
  linkGroup: LinkGroup,
  localFooter: LocalFooter,
  localFooterPicker: LocalFooterPicker,
  navItem: NavItem,
  page: Page,
  searchFacet: searchFacet,
  searchField: searchField,
  searchPager: searchPager,
  searchResults: searchResults,
  wysiwyg: Wysiwyg
};

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
