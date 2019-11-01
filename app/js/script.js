import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import Swiper from 'swiper';
import '@fancyapps/fancybox';
import Inputmask from 'inputmask';
import 'dragscroll';

import './modules/util';
import './modules/loading-screen';
import './modules/header-search';
import './modules/out-cover';
import './modules/handlist';
import './modules/tabs-nav';
import './modules/map';
import './modules/contact';

document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $.fancybox.defaults.animationEffect = 'zoom-in-out';

  Inputmask({ mask: '+7 (999) 999-99-99' }).mask('input[type="tel"]');

  const welcomeCarousel = document.querySelector('[data-welcome-carousel]');

  if (welcomeCarousel) {
    const welcomeCarouselSlides = welcomeCarousel.querySelectorAll('.welcome-carousel__item');

    if (welcomeCarouselSlides.length === 1) {
      welcomeCarousel.classList.add('welcome-carousel--has-one-slide')
    }

    new Swiper(welcomeCarousel, {
      // Optional parameters
      speed: 800,
      // loop: true,
      parallax: true,
      // grabCursor: true,
      // If we need pagination
      pagination: {
        el: '.welcome-carousel-navigation__counter',
        type: 'fraction'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.welcome-carousel-navigation__button--next',
        prevEl: '.welcome-carousel-navigation__button--prev'
      }
    });
  }
});
