export default (function() {
  'use strict';

  const contact = document.querySelector('.contact');

  if (!contact) {
    return;
  }

  contact.classList.remove('contact--no-js');

  const showMapsInput = contact.querySelector('[name="show-maps"]');
  // const swapMaps = contact.querySelector('.contact-swap-maps');
  // const maps = contact.querySelectorAll('[data-contact-map]');
  // const mapTRC = contact.querySelector('[data-contact-map="trc"]');
  // const mapTRCTip = mapTRC.querySelector('.contact-map-trc__tip');
  // const currentMapInput = document.querySelector(
  //   '[name="current-map"]:checked'
  // );
  // const currentMapInputValue = currentMapInput.value;

  // function showgTRCTip() {
  //   mapTRCTip.classList.remove('contact-map-trc__tip--hidden');
  // }

  // function hideTRCTip() {
  //   mapTRCTip.classList.add('contact-map-trc__tip--hidden');
  // }

  // showgTRCTip();
  // mapTRCTip.addEventListener('touchstart', function() {
  //   hideTRCTip();
  // });

  // mapTRCTip.addEventListener('mousedown', function() {
  //   hideTRCTip();
  // });

  // maps.forEach(map => {
  //   const isCurrent = map.dataset.contactMap === currentMapInputValue;
  //   map.classList.toggle('contact__map--current', isCurrent);
  // });

  showMapsInput.addEventListener('change', function() {
    const isChecked = showMapsInput.checked;
    contact.classList.toggle('contact--active-maps', isChecked);
  });

  // swapMaps.addEventListener('change', function(evt) {
  //   const inputRadio = evt.target;
  //   const value = inputRadio.value;

  //   maps.forEach(map => {
  //     const isCurrent = map.dataset.contactMap === value;
  //     map.classList.toggle('contact__map--current', isCurrent);
  //   });
  // });
})();
