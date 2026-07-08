'use strict';

function ensureRotaPopupStyles() {
  if (document.getElementById('rotaPopupStyles')) return;

  const style = document.createElement('style');
  style.id = 'rotaPopupStyles';
  style.textContent = `
    .rota-popup-modal {
      width: min(1180px, 100%);
      height: min(94dvh, 920px);
      background: #020817;
    }

    .rota-popup-frame {
      width: 100%;
      height: 100%;
      min-height: 70dvh;
      border: 0;
      border-radius: 16px;
      background: #fff;
    }

    .rota-popup-body {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 10px;
      height: 100%;
    }

    @media (max-width: 680px) {
      #rotaPopupBackdrop {
        align-items: stretch;
        padding: 0;
      }

      .rota-popup-modal {
        width: 100%;
        height: 100dvh;
        border-radius: 0;
      }

      .rota-popup-frame {
        min-height: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function ensureRotaPopupModal() {
  if (document.getElementById('rotaPopupBackdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'rotaPopupBackdrop';
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = `
    <div class="modal rota-popup-modal" role="dialog" aria-modal="true" aria-labelledby="rotaPopupTitle">
      <div class="rota-popup-body">
        <div class="modal-head">
          <div class="modal-title" id="rotaPopupTitle">Driver Rota Manager</div>
          <button id="closeRotaPopupBtn" type="button">✕</button>
        </div>
        <iframe class="rota-popup-frame" src="rota.html" title="Driver Rota Manager"></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeRotaPopup();
  });

  document.getElementById('closeRotaPopupBtn')?.addEventListener('click', closeRotaPopup);
}

function openRotaPopup() {
  ensureRotaPopupModal();

  document.getElementById('shellMenuBackdrop')?.classList.remove('open');

  const backdrop = document.getElementById('rotaPopupBackdrop');
  if (!backdrop) return;

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
}

function closeRotaPopup() {
  const backdrop = document.getElementById('rotaPopupBackdrop');
  if (!backdrop) return;

  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
}

function addRotaPortalButton() {
  ensureRotaPopupStyles();

  const shellGrid = document.querySelector('#shellHomeView .shell-grid');
  if (!shellGrid || document.getElementById('openRotaPopupBtn')) return;

  const button = document.createElement('button');
  button.id = 'openRotaPopupBtn';
  button.className = 'shell-action';
  button.type = 'button';
  button.innerHTML = `
    <span class="shell-icon">🚌</span>
    <span class="shell-label">Rota</span>
    <span class="shell-note">Open rota manager popup</span>
  `;

  button.addEventListener('click', openRotaPopup);
  shellGrid.appendChild(button);
}

function initRotaPopupPatch() {
  addRotaPortalButton();
  setTimeout(addRotaPortalButton, 250);
  setTimeout(addRotaPortalButton, 750);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRotaPopupPatch);
} else {
  initRotaPopupPatch();
}

window.addEventListener('load', initRotaPopupPatch);
