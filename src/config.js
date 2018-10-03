require("dotenv").config();

const config = {
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
};

module.exports = {
  init: () => {
    const isEmailConfigPresent =
      (config.GMAIL_USERNAME && config.GMAIL_PASSWORD) || (config.MAILGUN_API_KEY && config.MAILGUN_DOMAIN);

    if (isEmailConfigPresent) {
      return Promise.resolve(config);
    }

    return Promise.reject("Config not initialized!");
  }
};
