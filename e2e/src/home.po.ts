import { browser, by, element } from 'protractor';

export class HomePage {

  navigateTo() {
    return browser.get('/#/home');
  }

  getHomeComponent() {
    return element(by.tagName('care-home')).getTagName();
  }

  getConfirmMessage() {
    return element(by.tagName('ion-alert h2')).getText();
  }

  confirmLogout() {
    return element(by.id('confirmLogout')).click();
  }

  openMenu() {
    element(by.id('menuButton')).click();
  }

  logout() {
    return element(by.css('ion-alert button.logout-ok')).click();
  }
}
