import { LoginPage } from './login.po';
import { HomePage } from './home.po';
import { browser, by, element, protractor, until } from 'protractor';

describe('Login', () => {

  let page: LoginPage;
  let homePage: HomePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new LoginPage();
    homePage = new HomePage();
  });

  it('should have care-login-page component loaded', () => {
    page.navigateTo();
    expect(page.getTagName()).toEqual('care-login-page');
  });

  it('can input data and is valid', () => {
    page.navigateTo();
    page.inputUsername('adminapp');
    const uname = page.getUsernameInput().getAttribute('value');
    expect(uname).toEqual('adminapp');

    page.inputPassword('asdfasdf');
    const pw = page.getPasswordInput().getAttribute('value');
    expect(pw).toEqual('asdfasdf');

    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('should be invalid form with no input', () => {
    page.navigateTo();
    page.inputPassword('');
    page.inputUsername('');

    const classes = page.getForm().getAttribute('class');

    expect(classes).toContain('ng-invalid');
  });

  it('should successfully login', (done) => {
    page.login();

    browser.waitForAngularEnabled(false);

    browser.wait(until.elementLocated(by.tagName('care-home')), 5000, 'Browser taking to long time');

    expect(homePage.getHomeComponent())
      .toEqual('care-home');
    done();
  });

  it('should successfully logout', (done) => {
    homePage.navigateTo();

    browser.waitForAngularEnabled(false);

    browser.sleep(1000);

    browser.wait(until.elementLocated(by.tagName('care-home')), 3000, 'Could not navigate to home');
    expect(homePage.getHomeComponent()).toEqual('care-home');

    homePage.openMenu();
    browser.wait(EC.elementToBeClickable(element(by.id('confirmLogout'))), 1000, 'Unable to open menu');

    homePage.confirmLogout();
    browser.wait(EC.visibilityOf(element(by.tagName('ion-alert'))), 2000, 'Unable to open logout alert');
    expect(homePage.getConfirmMessage()).toEqual('Ausloggen');

    homePage.logout();
    browser.wait(until.elementLocated(by.tagName('care-login-page')), 2000, 'Waiting for logout page timed out');
    expect(page.getTagName()).toEqual('care-login-page');

    done();
  });

});
