import React from 'react';
import { View } from 'react-native';
import { Provider } from './src/context/userContext';
import Routes from './src/navigation/Routes';

const App = () => {

  return (
    <View
      style={{
        flex: 1
      }}>
      <Provider>
        <Routes />
      </Provider>
    </View>
  )
}

export default App;