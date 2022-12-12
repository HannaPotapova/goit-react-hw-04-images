import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from './Searchbar.module.css'


class Searchbar extends Component {
  state = {
    searchImage: '',
  }

  handleNameChange = e => {
    this.setState({ searchImage: e.currentTarget.value.toLowerCase() });
  }
  
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImage.trim() === '') {
      toast.warn('Please enter the name of the search image or photo');
      return;
    }

    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  }

  render() {
    return (
      
        <header className={css.Searchbar}>
          <form onSubmit={this.handleSubmit} className={css.SearchForm}>
            <button type="submit" className={css.SearchForm_button}>
              <span className={css.SearchForm_button_label}></span>
              <AiOutlineSearch size={23}/>
            </button>

            <input
              onChange={this.handleNameChange}
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
}

export default Searchbar;