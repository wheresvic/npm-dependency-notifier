require('dotenv').config();

const config = {
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
};

module.exports = {
  init: () => {

    const allKeysPresent = Object.values(config).filter(e => Boolean(e)).length === Object.keys(config).length;

    if (!allKeysPresent) {
      return Promise.reject('Config not initialized!');
    }

    return Promise.resolve(config);
  }
};
