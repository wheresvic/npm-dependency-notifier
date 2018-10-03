const expect = require('chai').expect;

const config = require('./config');

describe('config', () => {
  it('should load and initialize configuration', async() => {
    // when
    const ic = await config.init();

    // then
    expect(ic.GMAIL_USERNAME.length).to.be.above(0);
    expect(ic.GMAIL_PASSWORD.length).to.be.above(0);

  });
});
