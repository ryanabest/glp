const spelunk     = require('spelunk');

var result = spelunk.sync('src/_data');
console.log(spelunk.sync('src/_data'));
spelunk('src/_data').then(function() {
  console.log('done?')
})
