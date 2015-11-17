document.addEventListener('DOMContentLoaded', function() {

    var doc = document;


    var model = {
        init: function(n) {
            this.cats = [];
            this.adminState = true;

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
        upCount: function(i) {
            this.cats[i].count++;
        },
        toggleAdminState: function() {
            this.adminState = !this.adminState;
        },
        updateCat: function(data, cat) {
            var i = cat.id;
            if (data.name) {
                this.cats[i].name = data.name;
                doc.getElementsByTagName('li')[i].innerText = data.name;
            }
            if (data.count) { this.cats[i].count = data.count; }
            if (data.src) { this.cats[i].src = data.src; }
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
        },
        getAdminState: function() {
            model.toggleAdminState();
            return model.adminState;
        },
        updateCat: function(data) {
            model.updateCat(data, view.visibleCat);
            view.render();
        }
    };


    var view = {
        init: function() {

            this.initReferences();

            // render visible cat
            this.render();

            this.adminState = true;
            this.toggleForm();

            // bind image clicks to appropriate image
            this.img.addEventListener('click', function() {
                octopus.upCount(view.visibleCat);
            });

            this.adminToggle.addEventListener('click', (function (_this) {
                return function() {
                    _this.toggleForm();
                }
            })(this));

            this.saveButton.addEventListener('click', (function (_this) {
                return function() {
                    _this.saveForm();
                }
            })(this));

            this.cancelButton.addEventListener('click', (function (_this) {
                return function() {
                    _this.toggleForm();
                }
            })(this));

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
        initReferences: function() {
            // create references
            this.catContainer = doc.getElementById('catContainer');
            this.counter = doc.getElementById('catCounter');
            this.name = doc.getElementById('catName');
            this.img = doc.getElementById('catImage');
            this.selectList = doc.getElementById('catSelect');
            this.adminToggle = doc.getElementById('adminButton');
            this.adminForm = doc.getElementById('formElements');
            this.nameInput = doc.getElementById('nameInput');
            this.imgInput = doc.getElementById('imgInput');
            this.countInput = doc.getElementById('countInput');
            this.saveButton = doc.getElementById('saveButton');
            this.cancelButton = doc.getElementById('cancelButton');
        },
        render: function() {
            this.visibleCat = octopus.getVisibleCat();
            this.img.src = this.visibleCat.src;
            this.name.innerText = this.visibleCat.name;
            this.counter.innerText = this.visibleCat.count;
        },
        toggleForm: function() {
            this.adminState = octopus.getAdminState();
            this.nameInput.value = '';
            this.imgInput.value = '';
            this.countInput.value = '';
            this.adminState ? this.showForm() : this.hideForm();
        },
        showForm: function() {
            this.adminForm.style.display = 'block';
        },
        hideForm: function() {
            this.adminForm.style.display = 'none';
        },
        saveForm: function() {
            var data = {
                name: this.nameInput.value,
                count: this.countInput.value,
                img: this.imgInput.value
            };
            octopus.updateCat(data);
            this.toggleForm();
        }
    };

    octopus.init();

});