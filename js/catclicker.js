(function() {

  var numCats = 5;

  // create overall Cat images container
  var catsContainer = document.getElementById('catsContainer');

  var cat, catName, catCounter, catContainer;
  for (var i = 0; i < numCats; i++) {
    var j = i % 2;
    // create each cat container
    catContainer = document.createElement('div');
    // create cat image node
    cat = document.createElement('img');
    // create click counter node
    catCounter = document.createElement('h1');

    // style cat container half row width
    catContainer.style.width = '50%';
    catContainer.style.display = 'inline-block';

    catNameText = 'Cat ' + i;
    catName = document.createElement('h3');
    catName.innerText = catNameText;

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

    // add counter
    catContainer.appendChild(catCounter);
    catContainer.appendChild(catName);
    // add cat image
    catContainer.appendChild(cat);

    // get current counter
    thisCatCounter = document.getElementById('counter' + i);

    // bind cat click counter to current ID
    cat.addEventListener('click', (function(i, counter) {
      return function() {
        counter.innerText = parseInt(counter.innerText) + 1;
      };
    })(i, thisCatCounter));;
  }

})();