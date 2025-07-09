
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PATIENTS_FILE = path.join(__dirname, 'patients.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/patients', function(req, res) {
  fs.readFile(PATIENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/patients', function(req, res) {
  fs.readFile(PATIENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var patients = JSON.parse(data);
  
    var newPatient = {
      
      patientname: req.body.patientname,
      patientemail: req.body.patientemail,
      patientaddress: req.body.patientaddress,
      
      patientreason: req.body.patientreason,
      patientpain: req.body.patientpain,
      patientdoc: req.body.patientdoc,
      patientappttime: req.body.patientappttime,
      patientlanguage: req.body.patientlanguage,
      patientnewold: req.body.patientnewold,
      patientoccupation: req.body.patientoccupation,
      patientcontmethod: req.body.patientcontmethod,
      patientissue: req.body.patientissue,
      patientinsurance: req.body.patientinsurance,
      patientbirth: req.body.patientbirth



    };
    patients.push(newPatient);
    fs.writeFile(PATIENTS_FILE, JSON.stringify(patients, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(patients);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
