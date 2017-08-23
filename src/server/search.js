var twitLibrary = require("twit"),
    config = require("./config");

var twit = new twitLibrary(config);

var params = {
    q: "realDonaldTrump",
    count: 5
};

twit.get("search/tweets", params, searchedData);

function searchedData(err, data, response){
    console.log(data);
}