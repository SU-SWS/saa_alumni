import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../../styles/sb-image-gallery.css';
import SbEditable from 'storyblok-react';
import HeroIcon from '../simple/heroIcon';

const SBImageGallery = ({
  blok: {
    showBullets,
    showIndex,
    showPlayButton,
    showThumbnails,
    thumbnailPosition,
  },
  blok,
}) => {
  const { Images } = blok;
  const formattedImages = [];
  Images.forEach((image) => {
    formattedImages.push({
      original: image.filename,
      thumbnail: image.filename,
      originalAlt: image.alt,
      thumbnailAlt: image.alt,
      description: image.title,
    });
  });

  return (
    <SbEditable content={blok}>
      <ImageGallery
        items={formattedImages}
        showBullets={showBullets}
        showIndex={showIndex}
        showPlayButton={showPlayButton}
        showThumbnails={showThumbnails}
        thumbnailPosition={thumbnailPosition}
        renderLeftNav={(onClick, disabled) => (
          <LeftArrowButton onClick={onClick} disabled={disabled} />
        )}
        renderRightNav={(onClick, disabled) => (
          <RightArrowButton onClick={onClick} disabled={disabled} />
        )}
      />
    </SbEditable>
  );
};

function LeftArrowButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="image-gallery-icon image-gallery-left-nav"
      aria-label="Previous Slide"
    >
      <HeroIcon iconType="arrow-left" className="image-gallery-svg" isAnimate />
    </button>
  );
}

function RightArrowButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="image-gallery-icon image-gallery-right-nav"
      aria-label="Next Slide"
    >
      <HeroIcon
        iconType="arrow-right"
        className="image-gallery-svg"
        isAnimate
      />
    </button>
  );
}

export default SBImageGallery;
