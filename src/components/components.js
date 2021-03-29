import ComponentNotFound from './component_not_found';
import Embed from './embed/embed';
import LinkGroup from "./navigation/linkGroup";
import NavItem from "./navigation/navItem";
import Page from './page';
import Wysiwyg from "./simple/wysiwyg";

const ComponentList = {
  embed: Embed,
  linkGroup: LinkGroup,
  navItem: NavItem,
  page: Page,
  wysiwyg: Wysiwyg
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
