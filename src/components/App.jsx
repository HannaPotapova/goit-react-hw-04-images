import React, { Component } from "react";
import imagesAPI from './ImagesAPI/ImagesAPI';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    imageName: '',
    showModal: false,
    showButton: false,
    modalImage: '',
    modalAlt: '',
    page: 1,
  } 
  
  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      imagesAPI(nextName, nextPage)
        .then(images => {
          if (images.hits.length < 1) {
            this.setState({
              status: 'idle',
            });
            return alert(`No images on your query: ${nextName}`);
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved'
          }));

          this.setState({
            showButton: this.state.page < Math.ceil(images.total / 12) ? true : false,
          });
        })

        .then(console.log(this.state.images))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  
  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  handleFormSubmit = imageName => {
    if (imageName === this.state.imageName) {
      return;
    }
    
    this.setState({
      imageName,
      page: 1,
      images: [],
      showButton: false,
      showModal: false,
      status: 'idle',
    });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  handleModalImage = evt => {
    this.setState({modalImage: evt});
  }

  handleModalAlt = evt => {
    this.setState({modalAlt: evt});
  }

  render() {
    const { status, images, error, showModal, showButton, modalImage, modalAlt } = this.state;
    
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={3000} />

          {status === 'pending' && <Loader />}
          
          {status === 'rejected' && <h2>{error.message}</h2>}

          {status === 'resolved' &&
            <ImageGallery
            images={images}
            showModal={this.toggleModal}
            handleModalImage={this.handleModalImage}
            handleModalAlt={this.handleModalAlt}
          />
          }
          {showModal &&
            (<Modal onClose={this.toggleModal}>
              <img src={modalImage} alt={modalAlt} />
            </Modal>)}
          {showButton && <Button onClick={this.loadMore}/>}
        </>
      )
    }

  }


export default App;