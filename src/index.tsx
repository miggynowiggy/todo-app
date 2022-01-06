import React, { useContext, useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Colors } from 'react-native-paper';

import Login from './screens/Login';
import VerifyUser from './screens/VerifyUser';
import Home from './screens/Home';
import { StoreContext } from './contexts/StoreContext';
import * as LocalStorage from './services/encryptedStore';
import { LOGOUT } from './services/api';

const App = () => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const Stack = createNativeStackNavigator();
  const { user, setUser } = useContext(StoreContext);

  const getUserFromStorage = useCallback(() => {
    const fn = async () => {
      const userFromStore = await LocalStorage.getUser();
      setUser(userFromStore);
    };
    fn();
  }, [setUser]);

  const logout = async () => {
    await LOGOUT();
    setUser(null);
  };

  useEffect(() => {
    if (!initialLoad) {
      getUserFromStorage();
      setInitialLoad(true);
    }
  }, [initialLoad, getUserFromStorage]);

  const renderLogout = () => <Button color={Colors.blue500} onPress={() => logout()}>Logout</Button>;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !user
          ?
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Verify User" component={VerifyUser} />
            </>
          :
            <>
              <Stack.Screen name="Home" component={Home} options={{
                headerRight: () => renderLogout(),
              }} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
