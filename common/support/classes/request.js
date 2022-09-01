const axios = require('axios').default;
const path = require('path');

/** 
 * Static and instance methods of get() and getJson()
 * A wrapper class of axios library
 * */
class Request {
  /**
   * Use basic authentication to get a URL
   * @param {string} baseUrl Base URL
   * @param {string} username Username of basic authentication 
   * @param {string} password Password of basic authentication
   */
  constructor(baseUrl, username, password) {
    let lib = path.join(
      path.dirname(require.resolve('axios')),
      'lib/adapters/http'
    );
    let http = require(lib);
    this.config = {
      baseURL: baseUrl,
      adapter: http
    };
    if (username && password) {
      this.config.auth = {
        username: username,
        password: password
      };
    }
  }

  /**
   * Instance method of get(). Use config in the Request object.
   * @param {string} reqPath Path following Base URL
   * @param {string} config Extra config besides username and password
   */
  get(reqPath, config) {
    return axios.get(reqPath, Object.assign(this.config, config));
  }

  /**
   * Instance method of getJson(). Use config in the Request object
   * @param {string} reqPath 
   * @param {string} config 
   */
  getJson(reqPath, config) {
    return this.get(reqPath, config)
      .then(res => res.data)
      .catch(err => {
        console.log(err.message);
      });
  }

  /**
   * Static method of get. 
   * @param {*} url Full URL to be requested
   * @param {*} options 
   */
  static get(url, options) {
    return axios.get(url, options);
  }

  /**
   * Static method of head. 
   * @param {*} url Full URL to be requested
   * @param {*} options 
   */
  static head(url, options) {
    return axios.head(url, options);
  }

  /**
   * Static method of post()
   * @param {*} url Full URL to be requested
   * @param {*} options Options like credentials for basic authentication
   */
  static post(url, data, options) {
    return axios.post(url, data, options);
  }

  /**
   * Static method of getJson()
   * @param {string} url Full URL to be requested
   * @param {string} options Options like credentials for basic authentication
   */
  static getJson(url, options) {
    return axios
      .get(url, options)
      .then(res => res.data)
      .catch(err => {
        console.log(err.message);
      });
  }
}

module.exports = {
  Request
};
