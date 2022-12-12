import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30180728-0211963a138fccfc4d4cb75fc';

export default async function fetchImage(name, page) {    
    const url = `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const { data } = await axios.get(url);
    return data;  
  }