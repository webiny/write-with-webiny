import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import {AppContextProvider} from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{title:"Home"}}/>
        <Stack.Screen name="AddNote" component={AddNote} options={{title:"AddNote"}} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppContextProvider>
  );
}