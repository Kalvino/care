import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('login');
  }

  getTagName() {
    return element(by.tagName('care-login-page')).getTagName();
  }

  inputUsername(name) {
    return element(by.ionInput('username')).sendKeys(name);
  }

  inputPassword(pass) {
    return element(by.ionInput('password')).sendKeys(pass);
  }

  getUsernameInput() {
    return element(by.id('username'));
  }

  getPasswordInput() {
    return element(by.id('password'));
  }

  login() {
    this.inputUsername('jdoe');
    this.inputPassword('secret');

    return element(by.className('login-button')).click();
  }

  getForm() {
    return element(by.id('loginForm'));
  }
}
