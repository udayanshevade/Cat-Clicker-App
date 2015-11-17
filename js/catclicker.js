document.addEventListener('DOMContentLoaded', function() {

    var doc = document;


    var model = {
        init: function(n) {
            this.cats = [];

            var j, imagesNum = 2;
            for (var i = 0; i < n; i++) {
                j = i % imagesNum;
                this.cats.push({
                    id: i,
                    name: 'Cat ' + i,
                    count: 0,
                    src: 'img/cat' + j + '.jpg',
                    visible: false
                });
            }

            this.cats[0].visible = true;
        },
        upCount: function(cat) {
            this.cats[cat].count++;
        }
    };


    var octopus = {
        init: function() {
            model.init(5);
            view.init();
        },
        getAllCats: function() {
            return model.cats;
        },
        getVisibleCat: function() {
            var visibleCat = model.cats.filter(function(cat) {
                return cat.visible;
            });
            return visibleCat[0];
        },
        changeVisibleCat: function(i) {
            model.cats.forEach(function(cat) {
                if (cat.visible) {
                    cat.visible = false;
                }
            });
            model.cats[i].visible = true;
            view.render();
        },
        upCount: function(cat) {
            model.upCount(cat.id);
            view.render();
        }
    };


    var view = {
        init: function() {
            // create cat display elements
            this.catContainer = doc.createElement('div');
            this.counter = doc.createElement('h1');
            this.name = doc.createElement('h3');
            this.img = doc.createElement('img');
            this.selectList = doc.createElement('ul');

            this.catContainer.id = 'catContainer';
            this.counter.id = 'catCounter';
            this.name.id = 'catName';
            this.img.id = 'catImage';
            this.selectList.id = 'ul';


            // append elements
            this.catContainer.appendChild(this.selectList);
            document.body.appendChild(this.catContainer);
            this.catContainer.appendChild(this.counter);
            this.catContainer.appendChild(this.name);
            this.catContainer.appendChild(this.img);

            // render visible cat
            this.render();

            // bind image clicks to appropriate image
            this.img.addEventListener('click', function() {
                octopus.upCount(view.visibleCat);
            });

            // return all current cats from model
            var allCats = octopus.getAllCats();

            // create list items for each cat
            var i, listItem, thisCat;
            for (i = 0, len = allCats.length; i < len; i++) {
                thisCat = allCats[i];
                listItem = doc.createElement('li');
                listItem.className = 'select-li';
                listItem.value = i;
                listItem.innerText = thisCat.name;
                this.selectList.appendChild(listItem);

                listItem.addEventListener('click', (function (i, _this) {
                    return function() {
                        octopus.changeVisibleCat(i);
                        _this.render();
                    }
                })(i, this));
            }

        },
        render: function() {
            this.visibleCat = octopus.getVisibleCat();
            this.img.src = this.visibleCat.src;
            this.name.innerText = this.visibleCat.name;
            this.counter.innerText = this.visibleCat.count;
        }
    };

    octopus.init();

});