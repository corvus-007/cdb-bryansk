/* eslint-disable no-undef */
export default (function() {
  'use strict';

  // const dirname = window.util.isDevMode() ? '' : '/wp-content/themes/dimarko/';
  const dirname = '/wp-content/themes/cdb/';
  const mapElem = document.querySelector('#map');

  if (!(mapElem && window.ymaps)) {
    return;
  }

  mapElem.classList.remove('.map--no-js');

  const mapConfig = {
    'mobile-portrait': [53.2485, 34.371871],
    'mobile-landscape': [53.249, 34.371871],
    'tablet-portrait': [53.2485, 34.371871],
    'tablet-landscape': [53.250414, 34.369],
    laptop: [53.250414, 34.367],
    desktop: [53.250414, 34.367]
  };

  let device = 'mobile-portrait';

  if (window.matchMedia('(min-width: 667px) and (max-width: 767px)').matches) {
    device = 'mobile-landscape';
  } else if (
    window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches
  ) {
    device = 'tablet-portrait';
  } else if (
    window.matchMedia('(min-width: 1024px) and (max-width: 1279px)').matches
  ) {
    device = 'tablet-landscape';
  } else if (
    window.matchMedia('(min-width: 1280px) and (max-width: 1439px').matches
  ) {
    device = 'laptop';
  } else if (window.matchMedia('(min-width: 1440px)').matches) {
    device = 'desktop';
  }

  ymaps.ready(function() {
    const map = new ymaps.Map(mapElem, {
      center: mapConfig[device],
      zoom: 16,
      controls: []
    });

    map.controls.add('zoomControl');

    map.behaviors.disable(['scrollZoom']);
    var myPlacemark = new ymaps.Placemark(
      [53.250414, 34.371871],
      {
        hintContent: 'г. Брянск, пр-т Ленина, 67, ООО «Центральный Дом Быта»'
      },
      {
        iconLayout: 'default#image',
        iconImageHref: dirname + 'images/icon-map-pin.svg',
        iconImageSize: [48, 52],
        iconImageOffset: [-24, -52]
      }
    );

    map.geoObjects.add(myPlacemark);
  });
})();
