    stdout = process.stdout,
    fs = require('fs');
    var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}
readFiles('./data/', function(filename, content) {
  let a = JSON.parse(content);
  console.log(a[0].from.id);
}, function(err) {
  throw err;
});