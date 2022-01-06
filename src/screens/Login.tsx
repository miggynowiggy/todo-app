import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Colors, Snackbar } from 'react-native-paper';
import { LOGIN } from '../services/api';
import { StoreContext } from '../contexts/StoreContext';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showLoading, setLoading] = useState<boolean>(false);
  const [showError, setError] = useState<boolean>(false);
  const { setUser } = useContext(StoreContext);

  const login = async () => {
    setLoading(true);
    const { user } = await LOGIN(email, password);
    console.log(user);

    if (!user) {
      setError(true);
    }

    if (user && !user?.emailVerifiedAt) {
      navigation.navigate('Verify User');
      return;
    }

    setUser(user);
    setLoading(false);
  };

  return (
    <View style={style.main}>
      <Card>
        <Card.Title title="Welcome to TODO" subtitle="Please login" />
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            activeOutlineColor={Colors.blue500}
            activeUnderlineColor={Colors.blue500}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={style.textFieldSpacing}
            activeOutlineColor={Colors.blue500}
            activeUnderlineColor={Colors.blue500}
            autoCapitalize="none"
            keyboardType="default"
            textContentType={showPassword ? 'none' : 'password'}
            secureTextEntry={showPassword ? false : true}
            right={
              <TextInput.Icon
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <Button
            mode="contained"
            disabled={showLoading || !email || !password}
            onPress={() => login()}
            style={style.loginButtonSpacing}
            color={Colors.blue600}>
            Login
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={showError}
        onDismiss={() => setError(false)}
        action={{
          label: 'Ok',
          onPress: () => setError(false),
        }}>
        Invalid email and password!
      </Snackbar>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textFieldSpacing: {
    marginVertical: 10,
  },
  loginButtonSpacing: {
    marginTop: 20,
  },
  cardAction: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Login;
