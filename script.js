var system = require('system');
var address = system.args[1];

var page = require('webpage').create();
page.open('https://' + address, function(status) {
  if(status === "success") {
    console.log(page.renderBase64('jpeg'));
  }
  else {
    console.log(0);
  }

  phantom.exit();
});