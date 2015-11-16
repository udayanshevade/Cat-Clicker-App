(function() {

  var count1 = count2 = 0;
  var numCats = 2;

  // create overall Cat images container
  var catsContainer = document.getElementById('catsContainer');

  var cat, catName, catCounter, catContainer;
  for (var i = 1; i < numCats + 1; i++) {
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
    // define src to image
    cat.src = 'img/cat' + i + '.jpg';
    // style cat image to 100 max
    cat.style['max-width'] = '100%';

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

    thisCatCounter = document.getElementById('counter' + i);
  }

    // bind click counter to image
    var cat1 = document.getElementById('cat1');
    var counter1 = document.getElementById('counter1')
    cat1.addEventListener('click', function() {
      count1++;
      counter1.innerText = count1;
    });

    // bind click counter to image
    var cat2 = document.getElementById('cat2');
    var counter2 = document.getElementById('counter2')
    cat2.addEventListener('click', function() {
      count2++;
      counter2.innerText = count2;
    });

})();