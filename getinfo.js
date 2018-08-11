const fs = require("fs");
const Promise = require('bluebird');
var graph = Promise.promisifyAll(require('fbgraph'));
const ACCESS_TOKEN = 'EAAAAUaZA8jlABAFrN6ZC1bBnnH2SuxL8ECd8CvlMJxAjRA91S8hRcrcbgG1qY3QN4w2VGuZB7fbEZBaOBXx5TZA9e2UJ5jra4xo2ga5ho6zYVa48ILZArpDttRWXHAHZBo5iLutvtm2uZA2xqW86nphpcRAdX5yN1oQAsagQrZBgbZCgZDZD';
graph.setAccessToken(ACCESS_TOKEN);
graph.setVersion("3.0");
GetNext = async function(save,res,info = null) {
    let arr = [...save,...res.data];
    if(res.paging && res.paging.next) {
        console.log('Get next');
        let gnext = await graph.getAsync(res.paging.next);
        return await GetNext(arr,gnext,info);
    } else {
        console.log(`get finish comments of post : ${info}`);
        return arr;
    }
}
GetComments = async function(arrId) {
    let arrFull = [];
    for (var i = 0; i < arrId.length; i++) {
        let id = arrId[i].id;
        console.log(`get comments of post : ${id}`);
        let comment = await graph.getAsync(`${id}/comments`, { limit:500,fields:"created_time,from{name,birthday,email,gender,location{name},mobile_phone},message,comment_count", access_token: ACCESS_TOKEN});
        let fullcmt = await GetNext([],comment, id);
        arrFull = [...arrFull,...fullcmt];
        console.log('next post');
        console.log(arrFull.length);
    };
    let users = arrFull.map(arr=> {
        return arr.from;
    });
    console.log(users.length);
    let newarr = removeDuplicates(users,'id');
    console.log(newarr.length);
    WriteComment(newarr,'hello');
}
WriteComment = async function(arrRes,info) {
    fs.appendFile(__dirname+ `/data/${info}.json`, JSON.stringify({data:arrRes}), async function (err) {
        if (err) {
         console.log('writefile fail');
        } else {
         console.log('writefile success');
        }
      })
}
GetPosts = async function(fbId) {
    console.log('hi');
    let a = await graph.getAsync(`${fbId}/feed`, {limit: 10, fields:"id", access_token: ACCESS_TOKEN});
    await GetComments(a.data);
    console.log('hello');
}
GetPosts('331230823580420');
sortInfo = (arr) => {
    return arr.sort((a,b) => {
        if(!a.location) return 1;
        if(!b.location) return -1;
        if(b.location.id > a.location.id) return 1;
        if(b.location.id < a.location.id) return -1;
        if(!a.email) return 1;
        if(!b.email) return -1;
        if(!a.gender) return 1;
        if(!b.gender) return -1;
        if(!a.mobile_phone) return 1;
        if(!b.mobile_phone) return -1;
        return 0;
    });
}
function removeDuplicates( arr, prop ) {
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
      if(!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
  }