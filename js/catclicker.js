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
        getVisibleCat: function() {
            var visibleCat = model.cats.filter(function(cat) {
                return cat.visible;
            });
            return visibleCat[0];
        },
        upCount: function(cat) {
            model.upCount(cat.id);
            view.render(cat);
        }
    }

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
            this.selectList.id = 'select';



            // append elements
            document.body.appendChild(this.catContainer);
            this.catContainer.appendChild(this.counter);
            this.catContainer.appendChild(this.name);
            this.catContainer.appendChild(this.img);
            this.catContainer.appendChild(this.selectList);

            // render visible cat
            this.render();

            this.img.addEventListener('click', function() {
                octopus.upCount(view.visibleCat);
            });
        },
        render: function(cat) {
            this.visibleCat = octopus.getVisibleCat();

            this.img.src = this.visibleCat.src;
            this.name.innerText = this.visibleCat.name;
            this.counter.innerText = this.visibleCat.count;
        }
    }

    octopus.init();

});