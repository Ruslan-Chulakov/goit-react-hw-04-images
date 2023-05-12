import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types'
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          width="250"
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags}></img>
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
