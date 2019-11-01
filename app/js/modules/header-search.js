window.headerSearch = (function() {
  'use strict';

  const headerSearch = document.querySelector('[data-header-search]');

  if (!headerSearch) {
    return false;
  }

  const toggleBtn = document.querySelector('[data-toggle-search]');
  const input = document.querySelector('[data-header-search-input]');

  toggleBtn.addEventListener('click', onclickTogglSearchHandler);

  function onclickTogglSearchHandler(evt) {
    evt.preventDefault();

    const isShowSearch = document.body.classList.contains(
      'is-header-search-showed'
    );

    if (!isShowSearch) {
      showHeaderSearch();
    } else {
      hideHeaderSearch();
    }
  }

  function onDocumentMousedown(evt) {
    const isClickedInsideSearch = evt.target.closest('[data-header-search]');

    if (!isClickedInsideSearch) {
      hideHeaderSearch();
    }
  }

  function showHeaderSearch() {
    document.body.classList.add('is-header-search-showed');

    setTimeout(() => {
      input.focus();
    }, 100);

    document.addEventListener('keydown', onHeaderSearchEscPress);
    document.addEventListener('mousedown', onDocumentMousedown);
  }

  function hideHeaderSearch() {
    document.body.classList.remove('is-header-search-showed');
    input.blur();
    document.removeEventListener('keydown', onHeaderSearchEscPress);
    document.removeEventListener('mousedown', onDocumentMousedown);
  }

  function onHeaderSearchEscPress(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideHeaderSearch();
    }
  }
})();
