var ViewModel = function() {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/Tabby.jpg');
  this.clickRanks = ko.observableArray(['Newborn', 'Infant', 'Kitten', 'Little Cat', 'Grande Cat', 'Venti Cat', 'Top Cat']);
  this.nickNames = ko.observableArray(['TabTab', 'T-Bone', 'Mr. T', 'Tabitha Tab Tabby Catty Cat']);
  this.clicksToNextRank = ko.observable(5);

  this.clickRanksLength = ko.computed(function() {
    return this.clickRanks().length;
  }, this);

  // increment the counter as per the clicks
  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };

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

ko.applyBindings(new ViewModel());