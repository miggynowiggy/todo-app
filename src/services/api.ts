import * as LocalStorage from './encryptedStore';

const configs = {
  baseURL: 'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod',
  contentType: 'application/json',
};

type TMethods = 'GET' | 'PUT' | 'DELETE' | 'POST'

const REQUEST = async (verb: TMethods, path: string, body: any) => {
  const token = await LocalStorage.getAccessToken();

  if (!token) {
    console.log('missing token');
    return {
      success: false,
      data: null,
    };
  }

  const response = await fetch(configs.baseURL + path, {
    method: verb,
    headers: {
      'Content-Type': configs.contentType,
      'Authorization': `Bearer ${token}`,
    },
    body: body ? JSON.stringify({...body}) : '',
  });

  if (!response.ok) {
    console.log('ERR IN REQUEST: ', response);
    return {
      success: false,
      data: null,
    };
  }

  if (verb === 'DELETE' && response.ok) {
    return {
      success: true,
      data: true,
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };
};

const LOGIN = async (email: string, password: string) => {
  const response = await fetch(configs.baseURL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': configs.contentType,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok && response.status === 401) {
    const user = await LocalStorage.getUser();
    return {
      success: !!user,
      user,
    };
  }

  if (!response.ok && response.status !== 401) {
    console.log('FETCH ERR: ', response);
    return {
      success: false,
      user: null,
    };
  }

  const data = await response.json();

  if (data?.user) {
    await LocalStorage.setUser(data.user);
  }

  if (data?.authToken) {
    await LocalStorage.setAccessToken(data.authToken);
  }

  return {
    success: true,
    user: data?.user,
  };
};

const VERIFY = async (emailcode: string) => {
  const response = await fetch(configs.baseURL + '/confirm-email', {
    method: 'POST',
    headers: {
      'Content-Type': configs.contentType,
    },
    body: JSON.stringify({ emailConfirmCode: emailcode }),
  });

  if (!response.ok) {
    console.log('FETCH ERR: ', response.status, response.statusText);
    return {
      success: false,
      user: null,
    };
  }

  const data = await response.json();

  if (data?.user) {
    await LocalStorage.setUser(data.user);
  }

  if (data?.authToken) {
    await LocalStorage.setAccessToken(data.authToken);
  }

  return {
    success: true,
    user: data?.user,
  };
};

const LOGOUT = async () => {
  const response = await LocalStorage.clear();
  return response;
};


export { REQUEST, LOGIN, LOGOUT, VERIFY };
