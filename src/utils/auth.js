import Cookies from 'js-cookie';

export default class Auth {
  static setToken(token, expires_in) {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + (expires_in / 60) * 60 * 1000);
    Cookies.set('authToken', token);
    Cookies.set('authTokenExpires_in', expiryDate);
  }

  static destroyToken() {
    Cookies.remove('authToken');
    Cookies.remove('authTokenExpires_in');
  }

  static getToken() {
    const token = Cookies.get('authToken');
    const expiration = Cookies.get('authTokenExpires_in');
    if (!token || !expiration) return null;
    if (Date.now() > Date.parse(expiration)) {
      this.destroyToken();
      return null;
    }

    return token;
  }

  static loggedIn() {
    return this.getToken() != null;
  }
}
