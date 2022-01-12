import { browser, by, element } from 'protractor';

export class App {
  navigateTo(destination) {
    return browser.get(destination);
  }

  getRootElement() {
    return element(by.tagName('care-root'))
      .getTagName();
  }

  getLoginElement() {
    return element(by.tagName('care-login-page'))
      .getTagName();
  }
}
