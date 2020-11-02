// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//The API endpoint is GET [project_url]/api/timestamp/:date_string?
// your first API endpoint... 
app.get("/api/timestamp", (request, response) => {
  
  const date = new Date();
  response.json({
     unix: date.getTime(),
     utc: date.toUTCString()
  });
  
});
//Anew Date(date_string) (JS) . Note that the unix timestamp needs to be an integer (not a string) specifying millisecond
app.get("/api/timestamp/:date_string", function (request, response) {
  
  const { date_string } = request.params;
  
 let date = new Date(date_string);
  
  
  //string date check
  if(date.toString() === 'Invalid Date'){
    date = new Date(parseInt(date_string));
    console.log(date, typeof date, parseInt(date_string));
  }
  
  
  if(date.toString() === 'Invalid Date'){
  return response.json({
    error: "Invalid Date"
    
  });
  } else {
    
    return response.json({
      unix: date.getTime(),
     utc: date.toUTCString()
    });
    
  }
    
});

//string conversion to int
const stringDate = '2010-02-02';

console.log(parseInt(stringDate));
  
  //date = new Date(date_string);
  //date conversion
  
  //response.json({greeting: 'hello API'});
  


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
