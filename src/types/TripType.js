import PropTypes from 'prop-types';
import { SBImageType } from './storyblok/SBAssetType';
import { SBLinkType } from './storyblok/SBLinkType';
import { SBRichTextType } from './storyblok/SBRichTextType';
import { SBBlokType } from './storyblok/SBBlokType';

// TODO: Make more general types and abstract
const CardTagType = PropTypes.oneOf([
  'Selling fast',
  'New',
  'Staff pick',
  '',
  undefined,
]);

export const TripContent = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  shortDescription: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  heroImage: SBImageType,
  cardTitle: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDescription: PropTypes.string,
  tag: CardTagType,
  overviewHeading: PropTypes.string,
  overviewBody: SBRichTextType,
  cost: SBRichTextType,
  status: PropTypes.oneOf(['notify', 'reserve']),
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  overviewBelowContent: SBBlokType,
  hideFacultySection: PropTypes.bool,
  hideItinerarySection: PropTypes.bool,
  hideExtensionSection: PropTypes.bool,
  hideDetailsSection: PropTypes.bool,
  hidePricingSection: PropTypes.bool,
  hideRelatedTrips: PropTypes.bool,
  // TODO: Add additional SB trip entity field types for comprehensive type checking
});

export const TripType = {
  id: PropTypes.string.isRequired || PropTypes.number.isRequired,
  full_slug: PropTypes.string.isRequired,
  content: TripContent,
};
