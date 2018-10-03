const expect = require("chai").expect;

const config = require("./config");

describe("config", () => {
  it("should load and initialize configuration", async () => {
    // when
    const ic = await config.init();

    // then
    if (ic.MAILGUN_API_KEY) {
      expect(ic.MAILGUN_DOMAIN.length).to.be.above(0);
    }

    if (ic.GMAIL_USERNAME) {
      expect(ic.GMAIL_PASSWORD.length).to.be.above(0);
    }
  });
});
