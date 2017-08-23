module.exports = {
    getTweets: function(twitterAccount, tweetCount){
        var xhr = new XMLHttpRequest();
        var url = "/api/tweets?twitterAccount={account}&tweetCount={count}"
                    .replace("{account}", twitterAccount)
                    .replace("{count}", tweetCount);

        xhr.open("GET", url, false);
        xhr.send();

        if (xhr.readyState === 4) {
            console.log(xhr.response); //Outputs a DOMString by default
            return JSON.parse(xhr.response).message;
        }
        return [];
    }
}