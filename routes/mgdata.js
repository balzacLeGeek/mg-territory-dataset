var express = require('express');
var router = express.Router();
var database = require('./db');

/* GET MGData listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/communes', function(req, res, next) {
    // var post  = {from:'me', to:'you', msg:'hi'};
    database.query('SELECT * FROM bp_commune', function(err, results) {
      	if (err) throw err;
      	res.send(JSON.stringify(results));
    });
});

// res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

router.get('/commune/query', function(req, res, next) {
	var query = req.query.term;
    database.query('SELECT nom as label, id as value FROM bp_commune WHERE nom LIKE "' + query + '%"', function(err, results) {
      	// res.header("Access-Control-Allow-Origin", "*");
		// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      	if (err) throw err;
      	res.json(results);
    });
});

router.get('/commune/:id', function(req, res, next) {
	var id = req.params.id;
    database.query('SELECT nom as label, id as value FROM bp_commune WHERE id = ' + id, function(err, results) {
      	// res.header("Access-Control-Allow-Origin", "*");
		// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      	if (err) throw err;
      	res.json(results);
    });
});

router.post('/fokontany/commune/:id', function(req, res, next) {
	var id = req.params.id;
    database.query('SELECT bp_fokontany.nom as label, bp_fokontany.id as value FROM bp_fokontany JOIN bp_commune ON bp_commune.id = bp_fokontany.commune_id WHERE bp_commune.id = ' + id, function(err, results) {
      	// res.header("Access-Control-Allow-Origin", "*");
		// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      	if (err) throw err;
      	res.json(results);
    });
});

module.exports = router;
