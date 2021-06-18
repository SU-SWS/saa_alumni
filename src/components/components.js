import BasicCard from "./cards/basicCard";
import BasicPage from "./page-types/basicPage";
import ComponentNotFound from "./component_not_found";
import CtaButton from "./cta/ctaButton";
import CtaLink from "./cta/ctaLink";
import CtaGroup from "./cta/ctaGroup";
import Embed from "./embed/embed";
import EmbedCard from "./cards/embedCard";
import Event from "./content-types/event/event";
import EventCard from "./cards/eventCard";
import Grid from "./layout/grid";
import Hero from "./composite/hero";
import InteriorPage from "./page-types/interiorPage";
import LandingPage from "./page-types/landingPage";
import LinkGroup from "./navigation/linkGroup";
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
import Section from "./layout/section";
import Wysiwyg from "./simple/wysiwyg";
import Redirect from "./redirect/Redirect";
import Alert from "./composite/alert";
import AlertCtaLink from "./cta/alertCtaLink";

const ComponentList = {
  alert: Alert,
  alertCtaLink: AlertCtaLink,
  basicCard: BasicCard,
  basicPage: BasicPage,
  ctaButton: CtaButton,
  ctaLink: CtaLink,
  ctaGroup: CtaGroup,
  embed: Embed,
  embedCard: EmbedCard,
  event: Event,
  eventCard: EventCard,
  grid: Grid,
  hero: Hero,
  interiorPage: InteriorPage,
  landingPage: LandingPage,
  linkGroup: LinkGroup,
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
  section: Section,
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
