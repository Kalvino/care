module.exports = function (ptor) {
  ptor.by.addLocator('ionButton', (id, opt_parentElement) => {
    const using = opt_parentElement || document,
      ionButton = using.querySelector('#' + id);

    if (ionButton) {
      return ionButton.shadowRoot.querySelector('button');
    } else {
      return;
    }
  });

};
