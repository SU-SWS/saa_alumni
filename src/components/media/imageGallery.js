import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../../styles/sb-image-gallery.css';
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
      <svg
        className="image-gallery-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55.078 55.078"
        fill="currentColor"
        strokeWidth={0}
      >
        <path d="M18.1016,26.8718c-.018.052-.03.102-.04.156-.01.05-.019.097-.021.148-.001.02-.012.038-.012.058s.011.038.012.058c.003.051.012.099.022.149.01.053.022.103.04.1541.013.038.026.075.043.111.022.046.051.085.079.127.018.028.024.061.045.088.013.017.033.024.047.04.028.031.055.058.086.086.016.014.022.033.039.047l7.57,6.053c.475.381,1.167.301,1.545-.172.379-.475.303-1.1671-.172-1.546l-5.119-4.094h13.541c.607,0,1.1-.493,1.1-1.1s-.493-1.1-1.1-1.1h-13.543l5.12-4.094c.475-.38.552-1.072.172-1.546-.217-.272-.537-.413-.86-.413-.24,0-.483.078-.686.24l-7.569,6.053c-.017.013-.024.033-.039.047-.032.029-.06.058-.089.09-.013.015-.032.02-.045.035-.022.027-.027.061-.046.09-.028.042-.056.081-.078.125-.016.035-.029.071-.042.11Z" />
      </svg>
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
      <svg
        className="image-gallery-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55.078 55.078"
        fill="currentColor"
        strokeWidth={0}
      >
        <path d="M36.8336,27.598c.018-.052.03-.102.04-.156.01-.05.019-.097.021-.148.001-.02.012-.038.012-.058s-.011-.038-.012-.058c-.003-.051-.012-.099-.022-.149-.01-.053-.022-.103-.04-.1541-.013-.038-.026-.075-.043-.111-.022-.046-.051-.085-.079-.127-.018-.028-.024-.061-.045-.088-.013-.017-.033-.024-.047-.04-.028-.031-.055-.058-.086-.086-.016-.014-.022-.033-.039-.047l-7.57-6.053c-.475-.381-1.167-.301-1.545.172-.379.475-.303,1.1671.172,1.546l5.119,4.094h-13.541c-.607,0-1.1.493-1.1,1.1s.493,1.1,1.1,1.1h13.543l-5.12,4.094c-.475.38-.552,1.072-.172,1.546.217.272.537.413.86.413.24,0,.483-.078.686-.24l7.569-6.053c.017-.013.024-.033.039-.047.032-.029.06-.058.089-.09.013-.015.032-.02.045-.035.022-.027.027-.061.046-.09.028-.042.056-.081.078-.125.016-.035.029-.071.042-.11Z" />
      </svg>
    </button>
  );
}

export default SBImageGallery;
