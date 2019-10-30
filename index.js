var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();
var helmet = require('helmet');
var compression = require('compression');
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(compression());

var host = process.argv[2] || process.env.UI_HOST;
var port = process.argv[3] || process.env.UI_PORT;

app.set('port', port);
app.set('hostname', host);
app.use(express.static(__dirname + '/public'));

app.get('/*', function(request, response) {
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

if (host) {
  app.listen(app.get('port'), app.get('hostname'), function() {
    console.log(
      `Node app is running at ${app.get('hostname')}:${app.get('port')}`
    );
  });
} else {
  app.listen(app.get('port'), function() {
    console.log(`Node app is running at localhost:${app.get('port')}`);
  });
}
