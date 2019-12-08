import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Screens/Home';
import AddData from './Components/AddData';
import EditData from './Components/EditData';
const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    AddData: {screen: AddData},
    EditData: {screen: EditData},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(MainNavigator);
