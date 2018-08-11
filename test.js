var sleep = require('sleep');
const fs = require("fs");

fs.readFile('./data/hello.json', 'utf-8', function(err, content) {
    if (err) {
      onError(err);
      return;
    }
    let info = JSON.parse(content);
    let b = info.sort((a,b) => {
        if(!a.location) return 1;
        if(!b.location) return -1;
        return b.location.id - a.location.id
    });
   console.log(b);
  });