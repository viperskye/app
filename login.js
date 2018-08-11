const fs = require("fs");
const login = require("facebook-chat-api");

var credentials = {email: "phanthihongvan50@gmail.com", password: "Abc123!@#$"};

login(credentials, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});
