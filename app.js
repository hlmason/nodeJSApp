var profile = require('./profile.js');
// console.dir(process);

var users = ['heidimason'];
// var users = process.argv.slice(2);
users.forEach(profile.get);