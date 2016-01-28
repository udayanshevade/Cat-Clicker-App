var initCats = [
  {
    name: 'Tabby',
    imgSrc: 'img/Tabby.jpg',
    clickCount: 0,
    ranks: ['Newborn', 'Infact', 'Kitty', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat'],
    nickNames: ['Tabs', 'Tab-Tab', 'T-Bone', 'Mr. T'],
    clicksToNextRank: 3
  },
  {
    name: 'Tiger',
    imgSrc: 'img/Tiger.jpg',
    clickCount: 0,
    ranks: ['Newborn', 'Infact', 'Kitty', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat'],
    nickNames: ['Tigger', 'Go-get-em', 'Sher Khan', 'Stripes'],
    clicksToNextRank: 10
  },
  {
    name: 'Scaredy',
    imgSrc: 'img/Scaredy.jpg',
    clickCount: 0,
    ranks: ['Newborn', 'Infact', 'Kitty', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat'],
    nickNames: ['Fraidy', 'Jumpy', 'Casper'],
    clicksToNextRank: 5
  },
  {
    name: 'Shadow',
    imgSrc: 'img/Shadow.jpg',
    clickCount: 0,
    ranks: ['Newborn', 'Infact', 'Kitty', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat'],
    nickNames: ['Shade', 'Ser Pounce', 'Shoobie'],
    clicksToNextRank: 2
  },
  {
    name: 'Sleepy',
    imgSrc: 'img/Sleepy.jpg',
    clickCount: 0,
    ranks: ['Newborn', 'Infact', 'Kitty', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat'],
    nickNames: ['Snoozy', 'Nyquitty'],
    clicksToNextRank: 6
  },
];

var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.clickRanks = ko.observableArray(data.ranks);
  this.nickNames = ko.observableArray(data.nickNames);
  this.clicksToNextRank = ko.observable(data.clicksToNextRank);

  this.clickRanksLength = ko.computed(function() {
    return this.clickRanks().length;
  }, this);

    // computed value of clickLevel based on clickCount and clicksToNextRank
  this.clickLevel = ko.computed(function() {
    return Math.floor(this.clickCount()/this.clicksToNextRank());
  }, this);

  // comp val of clickRank based on clickLevel
  this.clickRank = ko.computed(function() {
    if (this.clickLevel() > this.clickRanksLength() - 1) {
      return this.clickRanks()[this.clickRanksLength() - 1];
    }
    return this.clickRanks()[this.clickLevel()];
  }, this);
};


var ViewModel = function() {

  var self = this;

  this.catList = ko.observableArray();

  initCats.forEach(function(thisCat) {
    self.catList.push( new Cat(thisCat) );
  });

  this.currentCat = ko.observable( this.catList()[0] );
  // increment the counter as per the clicks
  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };

  this.changeCat = function(clickedCat) {
    self.currentCat(clickedCat);
  };


};

ko.applyBindings(new ViewModel());