import React from 'react';
import { View } from 'react-native';
import { Provider as UserProvider } from './src/context/userContext';
import { Provider as MyDonationsProvider } from './src/context/myDonationsContext';
import Routes from './src/navigation/Routes';

const App = () => {

  return (
    <View
      style={{
        flex: 1
      }}>
      <MyDonationsProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </MyDonationsProvider>
    </View>
  )
}

export default App;