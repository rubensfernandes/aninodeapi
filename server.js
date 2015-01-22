var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app        = express();
var port = process.env.PORT || 8080;        // set our port

mongoose.connect('mongodb://root:8uijkm90@localhost/aniapi'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.get('/', function(req, res) {
    res.json({ message: 'sdsdsds DRAKsdasd api!' });   
});


// on routes that end in /bears
// ----------------------------------------------------
var Anidb     = require('./app/models/anidb');
router.route('/anidb')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var anidb = new Anidb();      // create a new instance of the Bear model
        anidb.title = req.body.title;  // set the bears name (comes from the request)

        // save the bear and check for errors
        anidb.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Dados adicionados!' });
        });
        
    }) // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {

    	var query = Anidb.find({});
    	query.where('type', 'Manga');
    	query.where('id', '40');
		query.limit(5);
		query.skip(0);


		query.exec(function (err, anidbs) {
		  	if (err)
	            res.send(err);

	        res.json(anidbs);
		});
    });



// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/anidb/:id/:type')

    // get the anidb with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Anidb.find({'id':req.params.id,'type':req.params.type}, function(err, anidb) {
            if (err)
                res.send(err);
            res.json(anidb);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);


console.log('Magic happens on port ' + port);