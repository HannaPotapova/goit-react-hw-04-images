import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from './Searchbar.module.css'


function Searchbar({onSubmit}) {
  const [searchImage, setSearchImage] = useState('');
  
  const handleNameChange = e => {
    setSearchImage(e.currentTarget.value.toLowerCase());
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    if (searchImage.trim() === '') {
      toast.warn('Please enter the name of the search image or photo');
      return;
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

      return (
      
        <header className={css.Searchbar}>
          <form onSubmit={handleSubmit} className={css.SearchForm}>
            <button type="submit" className={css.SearchForm_button}>
              <span className={css.SearchForm_button_label}></span>
              <AiOutlineSearch size={23}/>
            </button>

            <input
              onChange={handleNameChange}
              className={css.SearchForm_input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      
    );
  
}

export default Searchbar;