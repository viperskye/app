var Facebook = require('fb-id');
var facebook = new Facebook();

facebook.getId('https://www.facebook.com/beatvn.page', function(id) {
  console.log(id);
});