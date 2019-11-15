// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:timestamp", (req, res) => {
  let date_str = req.params.timestamp;

  if (/\d{5,}/.test(date_str)) {
    let dateInt = parseInt(date_str);
    res.json({ 
      unix: date_str, 
      utc: new Date(dateInt).toUTCString() 
    });
  }

  let dateObject = new Date(date_str);

  if (dateObject.toString() === "Invalid Date") {
    res.json({
      "unix": null, 
      "utc" : "Invalid Date" 
    });
  } else {
    res.json({ 
      unix: dateObject.valueOf(), 
      utc: dateObject.toUTCString() 
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});