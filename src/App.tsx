import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Routes from './routes/index';
import customColors from './styles/customColors';

const App: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar
      barStyle="light-content"
      backgroundColor={customColors.backgroundApp}
    />
    <Routes />
  </SafeAreaProvider>
);

export default App;
