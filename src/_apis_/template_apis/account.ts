import { v4 as uuidv4 } from 'uuid';
// utils
import fakeRequest from '../../utils/fakeRequest';
import { verify, sign } from '../../utils/jwt';
// @types
import { User } from '../../@types/account';
//
import mock from './mock';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users: User[] = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'krowd@demo.vn',
    password: 'krowd1234',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+40 777666555',
    address: '90210 Broadway Blvd',
    about: 'ádsahjkdlsasd'
  }
];

// ----------------------------------------------------------------------

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'Không có người dùng tương ứng với địa chỉ email.' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Sai mật khẩu' }];
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'Đã có một tài khoản với địa chỉ email nhất định.' }];
    }

    user = {
      id: uuidv4(),
      displayName: `${firstName} ${lastName}`,
      email,
      password,
      photoURL: null,
      phoneNumber: null,
      address: null,
      about: null
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Lỗi máy chủ nội bộ' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/account/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data: any = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
