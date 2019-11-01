window.loadingScreen = (function (window) {
  'use strict';

  var loadingScreen = document.querySelector('.loading-screen');

  if (!loadingScreen) {
    return;
  }

  loadingScreen.classList.remove('loading-screen--no-js');

  var isLoaded = false;

  document.body.style.overflowY = 'hidden';
  document.body.style.paddingRight = window.util.getScrollbarWidth() + 'px';

  window.addEventListener('load', function () {
    hideloadingScreen();
  });

  setTimeout(() => {
    hideloadingScreen();
  }, 1000 * 8);

  function hideloadingScreen() {
    if (isLoaded) {
      return;
    }

    loadingScreen.classList.add('loading-screen--hidden');
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '';

    isLoaded = true;
  }
})(window);
