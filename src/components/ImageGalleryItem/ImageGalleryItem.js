import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItems({images, showModal, handleModalImage, handleModalAlt})
{
  return (
    <>
      {
        images.map(image => (
          <li key={image.id} className={style.ImageGalleryItem} onClick={showModal}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              className={style.ImageGalleryItem_image}
              onClick={() => {
                handleModalImage(image.largeImageURL);
                handleModalAlt(image.tags);
              }}
            />
          </li>
        ))
      }
    </>
  );
}

ImageGalleryItems.propTyper = {
  images: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }))    ,
  showModal: PropTypes.func,
  handleModalImage: PropTypes.func, 
  handleModalAlt: PropTypes.func,
}