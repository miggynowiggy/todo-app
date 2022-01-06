import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Application from './src/index';
import StoreContextProvider from './src/contexts/StoreContext';

const App = () => {
  return (
    <PaperProvider>
      <StoreContextProvider>
        <Application />
      </StoreContextProvider>
    </PaperProvider>
  );
};

export default App;
