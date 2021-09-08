import Alert from "./composite/alert";
import AlertCtaLink from "./cta/alertCtaLink";
import BasicCard from "./cards/basicCard";
import BasicCardHorizontal from "./cards/basicCardHorizontal";
import BasicPage from "./page-types/basicPage";
import CollectionCard from "./cards/collectionCard";
import CollectionCardHorizontal from "./cards/collectionCardHorizontal";
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
import Itinerary from "./composite/itinerary";
import ItineraryItem from "./composite/itineraryItem";
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
import SearchSuggestions from "./search/searchSuggestions";
import Section from "./layout/section";
import SimpleImage from "./media/simpleImage";
import Story from "./content-types/story/story";
import StoryCard from "./cards/storyCard";
import VerticalNav from "./navigation/verticalNav";
import VerticalNavWrapper from "./navigation/verticalNavWrapper";
import VerticalNavItem from "./navigation/verticalNavItem";
import Wysiwyg from "./simple/wysiwyg";

const ComponentList = {
  alert: Alert,
  alertCtaLink: AlertCtaLink,
  basicCard: BasicCard,
  basicCardHorizontal: BasicCardHorizontal,
  basicPage: BasicPage,
  collectionCard: CollectionCard,
  collectionCardHorizontal: CollectionCardHorizontal,
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
  itinerary: Itinerary,
  itineraryItem: ItineraryItem,
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
  searchSuggestions: SearchSuggestions,
  section: Section,
  simpleImage: SimpleImage,
  story: Story,
  storyCard: StoryCard,
  redirect: Redirect,
  verticalNav: VerticalNav,
  verticalNavWrapper: VerticalNavWrapper,
  verticalNavItem: VerticalNavItem,
  wysiwyg: Wysiwyg,
};

const Components = (type) => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
