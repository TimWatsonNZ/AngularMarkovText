"use strict"; 

var angular = require("angular");
var MarkovTextChain = require("./MarkovTextChain");
var twitterService = require("./twitterService");

var module = angular.module("markovApp", []);

angular.module("markovApp", [])
       .component("markovGenerator", 
       {
            templateUrl: "generator.html",
            controller: controller,
            controllerAs: "vm"
       }
);

function controller(){
    let chain = new MarkovTextChain.default();
    let self = this;

    this.input = "";
    this.output = "";
    this.outputLength = 200;
    this.order = 2;
    this.tweetAuthor = "";
    this.tweetCount = 5;

    this.getTweets = () => {
        var tweetData = twitterService.getTweets(this.tweetAuthor, this.tweetCount);
        this.input = tweetData.join("\n\n");
    };

    this.analyze = () => {
        let output = chain.analyze(self.input, self.order);
    }

    this.generate = () => {
        self.output = chain.generate(self.outputLength);
    };
};