export default (function() {
  'use strict';

  const tabsNav = document.querySelector('[data-tabs-nav][role="tablist"]');

  if (!tabsNav) {
    return;
  }

  const tabsNavItemsElems = tabsNav.querySelectorAll('[role="tab"]');
  const tabsNavPanelsElems = document.querySelectorAll('[role="tabpanel"]');

  let currentItemIndex = 0;

  toggleActiveClassTabsNavItem(tabsNavItemsElems[currentItemIndex]);
  toggleActiveClassTabsNavPanel(tabsNavPanelsElems[currentItemIndex]);

  tabsNav.addEventListener('click', onTabsNavClick);

  function toggleActiveClassTabsNavItem(currentItem) {
    tabsNavItemsElems.forEach(function(it) {
      it.setAttribute('aria-selected', currentItem === it);
    });
  }

  function toggleActiveClassTabsNavPanel(currentPanel) {
    tabsNavPanelsElems.forEach(function(tabsNavPanel) {
      tabsNavPanel.hidden = currentPanel !== tabsNavPanel;
      tabsNavPanel.setAttribute('aria-hidden', currentPanel !== tabsNavPanel);
    });
  }

  function onTabsNavClick(evt) {
    evt.preventDefault();

    const target = evt.target;
    const tabElem = target.closest('[role="tab"]');

    if (!tabElem) {
      return;
    }

    const targetId = tabElem.getAttribute('aria-controls');
    const targetPanel = document.querySelector(`#${targetId}`);

    toggleActiveClassTabsNavItem(tabElem);
    toggleActiveClassTabsNavPanel(targetPanel);
  }
})();
