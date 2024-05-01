import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import SbEditable from 'storyblok-react';

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
      />
    </SbEditable>
  );
};

export default SBImageGallery;
