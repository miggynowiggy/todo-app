import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput, Colors, Button } from 'react-native-paper';
import { REQUEST } from '../services/api';
import { StoreContext } from '../contexts/StoreContext';

const VerifyUser = ({ navigation }: any) => {
  const [code, setCode] = useState<string>('');
  const { setUser } = useContext(StoreContext);

  const sendCode = async () => {
    const { success, data } = await REQUEST('POST', '/confirm-email', {
      emailConfirmCode: code,
    });

    if (success) {
      setUser(data);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={style.main}>
      <Card>
        <Card.Title
          title="Email Verification"
          subtitle="Please check your email and enter the verification code in the text box."
        />
        <Card.Content>
          <TextInput
            placeholder="enter code here..."
            value={code}
            onChangeText={setCode}
            activeOutlineColor={Colors.blue500}
            activeUnderlineColor={Colors.blue500}
          />
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Button mode="contained" color={Colors.blue500} onPress={() => sendCode()}>Verify</Button>
        </Card.Actions>
      </Card>
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
  cardAction: {
    alignContent: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
export default VerifyUser;
