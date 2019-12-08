import Axios from 'axios';
import {REACT_BASEURL} from 'react-native-dotenv';

const instance = Axios.create({
  baseURL: REACT_BASEURL,
});

export default instance;
