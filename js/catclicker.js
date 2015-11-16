(function() {

  var count = 0;

  var cat = document.createElement('img');
  cat.id = 'cat';
  cat.src = 'img/cat.jpg';

  var catContainer = document.getElementById('cat-container');
  var catCounter = document.getElementById('cat-counter');

  catContainer.appendChild(cat);

  cat.addEventListener('click', countClicks);

  function countClicks() {
    count++;
    catCounter.innerText = count;
  }

})();