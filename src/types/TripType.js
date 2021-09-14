import PropTypes from 'prop-types';

// TODO: Make more general types and abstract
const SBImageType = PropTypes.shape({
  id: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  filename: PropTypes.string,
});
const CardTagType = PropTypes.oneOf(['Featured', 'New', "Staff's pick"]);

// TODO: Extract general SB types into reusable abstracts
export const TripType = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  full_slug: PropTypes.string.isRequired,
  content: PropTypes.shape({
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
    // TODO: Add additional SB trip entity field types for comprehensive type checking
  }),
};
