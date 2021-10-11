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
  durationText: PropTypes.string,
  status: PropTypes.oneOf(['notify', 'reserve']),
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  overviewBelowContent: SBBlokType,
  // TODO: Add additional SB trip entity field types for comprehensive type checking
});

export const TripType = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  full_slug: PropTypes.string.isRequired,
  content: TripContent,
};
