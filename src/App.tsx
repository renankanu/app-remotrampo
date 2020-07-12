import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Routes from './routes/index';
import colors from './styles/colors';

const App: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.backgroundApp}
    />
    <Routes />
  </SafeAreaProvider>
);

export default App;
