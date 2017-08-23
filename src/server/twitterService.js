var twitLibrary = require("twit"),
    config = require("./config");

var twit = new twitLibrary(config);

module.exports.get = function(twitterAccount, tweetCount){
    var params = {
        screen_name: twitterAccount,
        count: tweetCount
    };

    return new Promise((resolve, reject) => {
        twit.get("statuses/user_timeline", params, (err, data, response) => {
            if(err) reject(err);

            console.log(data);

            var textArray = data.reduce((messages, current) => {
                if(current.text){
                    messages.push(current.text.replace("&amp;", "&"));
                } 
                return messages;
            }, []);

            resolve(textArray);
        });
    });
} 