import { useState, useEffect } from "react";
import imagesAPI from './ImagesAPI/ImagesAPI';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    if (!imageName) {
      return;
    }

    async function fetchAPI() {
      setStatus('pending');

      try {
        const images = await imagesAPI(imageName, page);

        if (images.hits.length < 1) {
          setStatus('idle');
          return alert(`No images on your query: ${imageName}`);
        }

        setImages(prevState => [...prevState, ...images.hits]);
        setShowButton(page < Math.ceil(images.total / 12) ? true : false);

        console.log(images);
        setStatus('resolved');
      }
      catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    fetchAPI();
  }, [imageName, page])
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleFormSubmit = searchImage => {
    if (searchImage === imageName) {
      return;
    }
    
    setImageName(searchImage);
    setPage(1);
    setImages([]);
    setShowButton(false);
    setShowModal(false);
    setStatus('idle');
  }

  const loadMore = () => {
    setPage(prevState=> prevState + 1)
  }

  const handleModalImage = evt => {
    setModalImage(evt);
  }

  const  handleModalAlt = evt => {
    setModalAlt(evt);
  }
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer autoClose={3000} />

          {status === 'pending' && <Loader />}
          
          {status === 'rejected' && <h2>{error.message}</h2>}

          {images.length > 0 &&
            (<ImageGallery
            images={images}
            showModal={toggleModal}
            handleModalImage={handleModalImage}
            handleModalAlt={handleModalAlt}
          />)
          }
          {showModal &&
            (<Modal onClose={toggleModal}>
              <img src={modalImage} alt={modalAlt} />
            </Modal>)}
          {showButton && <Button onClick={loadMore}/>}
        </>
      )
    }
  
export default App;