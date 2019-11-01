export default (function() {
  var handlistElems = document.querySelectorAll('[data-handlist]');

  if (!handlistElems.length) {
    return;
  }

  handlistElems.forEach(generateHandlist);

  function generateHandlist(handlistElem) {
    var linksList = handlistElem.querySelectorAll('a');
    var serviceLetters = {};

    linksList.forEach(function(link) {
      var firstLetter = link.textContent.charAt(0).toUpperCase();
      if (!serviceLetters[firstLetter]) {
        serviceLetters[firstLetter] = [];
      }
      serviceLetters[firstLetter].push(link);
    });

    function createList(letter, links) {
      var dl = document.createElement('dl');
      var dt = document.createElement('dt');
      dt.textContent = letter;

      dl.appendChild(dt);

      links.sort(function(a, b) {
        var aText = a.textContent;
        var bText = b.textContent;
        return aText > bText ? 1 : -1;
      });

      links.forEach(function(link) {
        var dd = document.createElement('dd');
        dd.appendChild(link);
        dl.appendChild(dd);
      });

      return dl;
    }

    var serviceLettersList = Object.keys(serviceLetters);

    serviceLettersList.sort();

    handlistElem.hidden = false;
    serviceLettersList.forEach(function(letter) {
      handlistElem.appendChild(createList(letter, serviceLetters[letter]));
    });
  }
})(window);
