import PropTypes from 'prop-types';
import { SBImageType } from './storyblok/SBAssetType';
import { SBLinkType } from './storyblok/SBLinkType';
import { SBRichTextType } from './storyblok/SBRichTextType';
import { SBBlokType } from './storyblok/SBBlokType';

// TODO: Make more general types and abstract
const CardTagType = PropTypes.oneOf([
  'Selling Fast',
  'New',
  'Staff Pick',
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
  cost: PropTypes.string,
  durationText: PropTypes.string,
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  overviewBelowContent: SBBlokType,
  // TODO: Add additional SB trip entity field types for comprehensive type checking
});

// TODO: Extract general SB types into reusable abstracts
export const TripType = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  full_slug: PropTypes.string.isRequired,
  content: TripContent,
};
