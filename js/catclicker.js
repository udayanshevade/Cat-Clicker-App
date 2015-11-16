(function() {

  var numCats = 5;

  var select = document.getElementById('select');

  // create overall Cat images container
  var catsContainer = document.getElementById('catsContainer');

  var cat, catName, catCounter, catContainer, selectOption, currentContainer;

  for (var i = 0; i < numCats; i++) {
    // work with only 2 images
    var j = i % 3;
    // create each cat container
    catContainer = document.createElement('div');
    // create cat image node
    cat = document.createElement('img');
    // create click counter node
    catCounter = document.createElement('h1');
    // create select option
    selectOption = document.createElement('li');

    // style cat container half row width
    catContainer.id = 'catContainer' + i;
    catContainer.style.width = '50%';
    catContainer.style.display = 'inline-block';

    catNameText = 'Cat ' + i;
    catName = document.createElement('h3');
    catName.innerText = catNameText;

    selectOption.innerText = catNameText;

    // add id to cat
    cat.id = 'cat' + i;
    // style cat image to 100 max
    cat.className = 'img-responsive';
    // define src to image
    cat.src = 'img/cat' + j + '.jpg';

    // style counter
    catCounter.id = 'counter' + i;
    catCounter.innerText = 0;

    // append cat container to overall container
    catsContainer.appendChild(catContainer);

    select.appendChild(selectOption);

    // add counter
    catContainer.appendChild(catCounter);
    catContainer.appendChild(catName);
    // add cat image
    catContainer.appendChild(cat);

    // get current counter
    thisCatCounter = document.getElementById('counter' + i);

    catContainer.style.display = 'none';

    // bind cat click counter to current ID
    cat.addEventListener('click', (function(i, counter) {
      return function() {
        counter.innerText = parseInt(counter.innerText) + 1;
      };
    })(i, thisCatCounter));

    // bind list options to showing related cats
    selectOption.addEventListener('click', (function(i, next) {
      return function() {
        currentContainer.style.display = 'none';
        next.style.display = 'inline-block';
        currentContainer = next;
      };
    })(i, catContainer));

  }

  // define initial currentContainer which will get replaced
  currentContainer = document.getElementById('catContainer0');
  currentContainer.style.display = 'inline-block';



})();