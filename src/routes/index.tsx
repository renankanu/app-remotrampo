import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/index';
import Job from '../screens/Job';
import JobDetails from '../screens/JobDetails';
import customColors from '../styles/customColors';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../store/modules/rootReducer';

const Stack = createStackNavigator();
const store = createStore(rootReducer)

const Routes: React.FC = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: customColors.backgroundApp },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Job" component={Job} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default Routes;
