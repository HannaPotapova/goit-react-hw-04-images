import PropTypes from 'prop-types';
import ImageGalleryItems from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery( {images, showModal, handleModalImage, handleModalAlt} ) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItems
        images={images}
        showModal={showModal}
        handleModalImage={handleModalImage}
        handleModalAlt={handleModalAlt}
      />
    </ul>
  );
}

ImageGallery.propTyper = {
  images: PropTypes.arrayOf(PropTypes.string),
  showModal: PropTypes.func,
  handleModalImage: PropTypes.func, 
  handleModalAlt: PropTypes.func,
}