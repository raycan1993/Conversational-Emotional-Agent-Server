console.log('Agent has been called...');

const elizaModule = require('./modules/eliza');
var Sentiment = require('sentiment');

module.exports = {
    createInstance: function (sessionID) {
        return new Agent(sessionID);
    }
}


function Agent(sessionID) {
    this.id = createID();
    this.clientSessionID = sessionID;
    this.eliza = elizaModule.createInstance();
    this.xAxis = Math.floor(Math.random() * 21 - 10); // -10 - 10
    this.yAxis = Math.floor(Math.random() * 21 - 10); // -10 - 10
    this.prevX = [this.xAxis],
    this.prevY = [this.yAxis]

    if((this.xAxis < 0) & (this.yAxis <= 0)){ // Traurigkeit
        console.log('Der Agent ist traurig. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }else if((this.xAxis >= 0) & (this.yAxis >= 0)){ // Glück
        console.log('Der Agent ist glücklich. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')'); 
    }else if((this.xAxis < 0) & (this.yAxis > 0)){ // Hilfesuchend
        console.log('Der Agent ist hilfesuchend. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }else if((this.xAxis >= 0) & (this.yAxis < 0)){ // Neutral
        console.log('Der Agent ist neutral. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }

}

Agent.prototype.initialMessage = function(){
    var reply = '';
    var emoji = this.setEmoji(this.xAxis, this.yAxis);

    var bot_story_very_very_bad = [
        "My Parents have passed away recently and my sister won't talk to me. ",
        "I also just got fired from my job. ",
        "I just don't know what to do anymore to be honest. I'm an emotional wreck.",
        "I started drinking and taking drugs again. ",
        "I just don't see a point anaymore in this all... ",
        "Why should I ceep going?! Tell me! Why??? I should just end all my suffering...",
        "Well I already tried it last week..."
    ],
    bot_story_very_bad = [
        "I lost my job some time ago and my parents died in a car accident recently...",
        "I just don't know what to do with my life...."
    ],
    bot_story_bad = [
        "My parents died in a car accident recently and my sister is blaming me for that",
        " because prior to that, they came to visit and we had an intense argument, so they left. ",
        " On their way home, a strangers car crashed into theirs and yeah..."
    ],
    bot_story_kinda_bad = [
        "My parents died two weeks ago in a car and now it's just me and my sister."
    ],
    bot_story_still_bad = [
        "I'm getting bullied in school and I just can't make them stop! ",
        "Why are they doing this? I'm scared to go to school."
    ];

    if(this.xAxis >= -10 && this.xAxis < -8){ 
        var i = Math.floor(Math.random() * bot_story_very_very_bad.length);
        reply = bot_story_very_very_bad[i];
    }else if(this.xAxis >= -8 && this.xAxis < -6){ 
        var i = Math.floor(Math.random() * bot_story_very_bad.length);        
        reply = bot_story_very_bad[i];
    }else if(this.xAxis >= -6 && this.xAxis < -4){ 
        var i = Math.floor(Math.random() * bot_story_bad.length);
        reply = bot_story_bad[i];
    }else if(this.xAxis >= -4 && this.xAxis < -2){ 
        var i = Math.floor(Math.random() * bot_story_kinda_bad.length);
        reply = bot_story_kinda_bad[i];
    }else{
        var i = Math.floor(Math.random() * bot_story_still_bad.length);
        reply = bot_story_still_bad[i];
    }


    return {
        reply: reply,
        emoji_code: emoji,
        x: this.xAxis,
        y: this.yAxis
    };
}

Agent.prototype.processMessage = function (message) {
    var eliza = this.eliza;
    var emoji = '';
    var deltaX, deltaY = 0;

    var sentimentRes = this.analyzeSentiment(message, this.xAxis, this.yAxis, this.prevX, this.prevY);

    this.xAxis = sentimentRes.x;
    this.yAxis = sentimentRes.y;
    this.prevX = sentimentRes.prevX;
    this.prevY = sentimentRes.prevY;

    //console.log('X: ' + this.xAxis + ', Y: ' + this.yAxis);

    if(this.prevX.length >= 2 && this.prevY.length >= 2){        
        deltaX = (this.prevX[this.prevX.length-1] - this.prevX[this.prevX.length-2]);
        deltaY = (this.prevY[this.prevY.length-1] - this.prevY[this.prevY.length-2]);
        //console.log('Δy: ' + (this.prevX[this.prevY.length-2] - this.prevX[this.prevY.length-1]));
        //console.log('Δx: ' + (this.prevY[this.prevX.length-2] - this.prevX[this.prevX.length-1]));
    } 
    
    emoji = this.setEmoji(this.xAxis, this.yAxis);

    if (message) {
        var reply = eliza.transform(message, this.xAxis, this.yAxis);
        //console.log('YOU:   ' + message);
        //console.log('ELIZA: ' + reply);
        return {
            reply: reply,
            emoji_code: emoji,
            x: this.xAxis,
            y: this.yAxis,
            prevX: this.prevX,
            prevY: this.prevY,
            'Δx': deltaX, 
            'Δy': deltaY
        };
    } else {
        var reply = eliza.getInitial();
        //console.log('ELIZA: ' + reply);
        return {
            reply: reply,
            emoji_code: emoji,
            x: this.xAxis,
            y: this.yAxis,
            prevX: this.prevX,
            prevY: this.prevY,
            'Δx': deltaX,
            'Δy': deltaY
        };
    }
   
}

Agent.prototype.analyzeSentiment = function (message, x, y, prevX, prevY) {

    var sentiment = new Sentiment();
    var msgSentiment = sentiment.analyze(message).comparative;

    // X-Axis
    x = sigmoid(x + msgSentiment);

    if(prevX.length >= 5){
        prevX.shift();
        prevX.push(x);
    }else{
        prevX.push(x);
    }
    
    // Y-Axis
    yStdev = getYAxis(stdev(prevX)); 
    y = sigmoid(y + yStdev);

    if(prevY.length >= 5){
        prevY.shift();
        prevY.push(y);
    }else{
        prevY.push(y);
    }

    return {x, y, prevX, prevY};
}

function sigmoid(x){
    return (20 / (1 + Math.exp(-0.25*x)))-10;
}

function getYAxis(x){
    return 2*x-1;
}

function stdev(values) {
    if(values.length > 1){
        const average = (data) => data.reduce((sum, value) => sum + value, 0) / data.length;
        const avg = average(values);
        const diffs = values.map((value) => value - avg);
        const squareDiffs = diffs.map((diff) => diff * diff);
        const avgSquareDiff = average(squareDiffs);
        return Math.sqrt(avgSquareDiff);
    }else{
        return 0;   
    }
    
};

Agent.prototype.resetAgent = function(sessionID){
    console.log('Agent (SessionID: ' + sessionID + ') has been reset...');

    this.xAxis = Math.floor(Math.random() * 21 - 10); // -10 - 10
    this.yAxis = Math.floor(Math.random() * 21 - 10); // -10 - 10
    this.prevX = [this.xAxis],
    this.prevY = [this.yAxis]

    if((this.xAxis < 0) & (this.yAxis <= 0)){ // Traurigkeit
        console.log('Der Agent ist traurig. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }else if((this.xAxis >= 0) & (this.yAxis >= 0)){ // Glück
        console.log('Der Agent ist glücklich. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')'); 
    }else if((this.xAxis < 0) & (this.yAxis > 0)){ // Hilfesuchend
        console.log('Der Agent ist hilfesuchend. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }else if((this.xAxis >= 0) & (this.yAxis < 0)){ // Neutral
        console.log('Der Agent ist neutral. (' + 'X: ' + this.prevX + ', ' + 'Y: ' + this.prevY + ')');
    }
}

Agent.prototype.setEmoji = function (x, y) {
    var emojis = {
        "Traurigkeit": "&#128557;",    // 😭 Traurigkeit  (x < 0) & (y <= 0)
        "Glück": "&#128515;",          // 😃 Glück        (x >= 0) & (y >= 0)
        "Hilfesuchend": "&#128532;",   // 😔 Hilfesuchend (x < 0) & (y > 0)
        "Neutral": "&#128528;"         // 😐 Neutral      (x >= 0) & (y < 0)
    };

    if((x < 0) & (y <= 0)){
        return emojis['Traurigkeit'];
    }else if((x >= 0) & (y >= 0)){
        return emojis['Glück'];
    }else if((x < 0) & (y > 0)){
        return emojis['Hilfesuchend'];
    }else if((x >= 0) & (y < 0)){
        return emojis['Neutral'];
    }
}

Agent.prototype.getID = function () {
    return this.id;
}

// Creates ID from UNIX timestamp im ms
var createID = function () {
    return new Date().getTime();
}



