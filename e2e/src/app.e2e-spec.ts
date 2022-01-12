import { App } from './app.po';

xdescribe('new App', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });
  describe('default app', () => {

    beforeEach(() => {
      app.navigateTo('/');
    });

    it('should have an element care-root', () => {
      app.getRootElement()
        .then(el => {
          expect(el).toEqual('care-root');
        });
    });

    it('should show initially the login page', () => {
      app.getLoginElement()
        .then(tagName => {
          expect(tagName).toEqual('care-login-page');
        });
    });
  });
});
