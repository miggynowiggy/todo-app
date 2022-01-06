import EncryptedStore from 'react-native-encrypted-storage';

const getAccessToken = async () => {
  try {
    const token = await EncryptedStore.getItem('accessToken');

    if (token) {
      return token;
    }

    return null;
  } catch (err) {
    console.log('ERR WHILE ACCESSING TOKENS: ', err);
    return null;
  }
};

const setAccessToken = async (accessToken: string) => {
  try {
    await EncryptedStore.setItem('accessToken', accessToken);
    return true;
  } catch (err) {
    console.log('ERR WHILE SAVING TOKENS: ', err);
    return false;
  }
};

const clear = async () => {
  try {
    await EncryptedStore.clear();
    return true;
  } catch (err) {
    console.log('ERR WHILE CLEARING TOKENS', err);
    return false;
  }
};

const getUser = async () => {
  try {
    const user = await EncryptedStore.getItem('user');
    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (err) {
    console.log('ERR WHILE GETTING USER: ', err);
    return null;
  }
};

const setUser = async (user: any) => {
  try {
    await EncryptedStore.setItem('user', JSON.stringify(user));
    return true;
  } catch (err) {
    console.log('ERR WHILE SETTING USER: ', err);
    return false;
  }
};

export { getUser, setUser, getAccessToken, setAccessToken, clear };
