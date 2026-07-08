'use strict';

(function loadModalHelpers() {
  const modalScript = document.createElement('script');
  modalScript.src = 'modals.js';
  document.head.appendChild(modalScript);

  const summaryImageScript = document.createElement('script');
  summaryImageScript.src = 'summary-image.js';
  document.head.appendChild(summaryImageScript);

  const rotaPopupScript = document.createElement('script');
  rotaPopupScript.src = 'rota-popup.js';
  document.head.appendChild(rotaPopupScript);
})();
