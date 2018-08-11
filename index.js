const fs = require("fs");
const login = require("facebook-chat-api");

let message = 'Xin chao';
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
    console.log('Login to facebook success');
    fs.readFile('./data/hello.json', 'utf-8', function(err, content) {
      if (err) {
        onError(err);
        return;
      }
      let info = JSON.parse(content);
      info.forEach(user => {
        api.sendMessage(message,user.id);
        sleep.sleep(300);
      })
    });
});