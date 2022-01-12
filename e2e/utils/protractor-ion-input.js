module.exports = function (ptor) {
  ptor.by.addLocator('ionInput', (name, opt_parentElement) => {
    const using = opt_parentElement || document,
      ionInput = using.querySelector('ion-input[name="' + name + '"]');

    if (ionInput) {
      return ionInput.shadowRoot.querySelector('input');
    } else {
      return;
    }
  });

};
