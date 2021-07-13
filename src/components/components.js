import Alert from "./composite/alert";
import AlertCtaLink from "./cta/alertCtaLink";
import BasicCard from "./cards/basicCard";
import BasicPage from "./page-types/basicPage";
import ComponentNotFound from "./component_not_found";
import CtaButton from "./cta/ctaButton";
import CtaCard from "./cards/ctaCard";
import CtaLink from "./cta/ctaLink";
import CtaGroup from "./cta/ctaGroup";
import DarkPage from "./page-types/darkPage";
import Embed from "./embed/embed";
import EmbedCard from "./cards/embedCard";
import EmbedVideo from "./media/embedVideo";
import Event from "./content-types/event/event";
import EventCard from "./cards/eventCard";
import Grid from "./layout/grid";
import Heading from "./simple/heading";
import Hero from "./composite/hero";
import IconCard from "./cards/iconCard";
import LinkGroup from "./navigation/linkGroup";
import LinkList from "./simple/linkList";
import LocalFooter from "./identity/localFooter";
import LocalFooterPicker from "./identity/localFooterPicker";
import MainMenuGroup from "./navigation/mainMenuGroup";
import MainNav from "./navigation/mainNav";
import MainNavItem from "./navigation/mainNavItem";
import Masthead from "./identity/masthead";
import MastheadPicker from "./identity/mastheadPicker";
import NavItem from "./navigation/navItem";
import Page from "./page";
import Perk from "./content-types/perk/perk";
import PerkCard from "./cards/perkCard";
import PerkCardHorizontal from "./cards/perkCardHorizontal";
import Poster from "./composite/poster";
import Redirect from "./redirect/Redirect";
import SearchFacet from "./search/searchFacet";
import SearchField from "./search/searchField";
import SearchPage from "./page-types/searchPage";
import SearchPager from "./search/searchPager";
import SearchResults from "./search/searchResults";
import Section from "./layout/section";
import SimpleImage from "./media/simpleImage";
import Story from "./content-types/story/story";
import StoryCard from "./cards/storyCard";
import Wysiwyg from "./simple/wysiwyg";

const ComponentList = {
  alert: Alert,
  alertCtaLink: AlertCtaLink,
  basicCard: BasicCard,
  basicPage: BasicPage,
  ctaButton: CtaButton,
  ctaCard: CtaCard,
  ctaLink: CtaLink,
  ctaGroup: CtaGroup,
  darkPage: DarkPage,
  embed: Embed,
  embedCard: EmbedCard,
  embedVideo: EmbedVideo,
  event: Event,
  eventCard: EventCard,
  grid: Grid,
  heading: Heading,
  hero: Hero,
  iconCard: IconCard,
  linkGroup: LinkGroup,
  linkList: LinkList,
  localFooter: LocalFooter,
  localFooterPicker: LocalFooterPicker,
  mainMenuGroup: MainMenuGroup,
  mainNav: MainNav,
  mainNavItem: MainNavItem,
  masthead: Masthead,
  mastheadPicker: MastheadPicker,
  navItem: NavItem,
  page: Page,
  perk: Perk,
  perkCard: PerkCard,
  perkCardHorizontal: PerkCardHorizontal,
  poster: Poster,
  searchFacet: SearchFacet,
  searchField: SearchField,
  searchPage: SearchPage,
  searchPager: SearchPager,
  searchResults: SearchResults,
  section: Section,
  simpleImage: SimpleImage,
  story: Story,
  storyCard: StoryCard,
  wysiwyg: Wysiwyg,
  redirect: Redirect,
};

const Components = (type) => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
