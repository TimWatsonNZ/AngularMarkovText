var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    twitterService = require("./twitterService"),
    path = require("path"),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.get('/tweets', function(req, res) {
    var tweets = twitterService.get(req.query.twitterAccount, req.query.tweetCount)
                    .then((result) => {
                        res.json({ message: result }); 
                    })
                    .catch((reason) => {
                        console.log(reason);  
                    }); 
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(express.static("public"));

app.use('/api', router);
app.listen(port);

