const express = require('express');
const router = express.Router();


const agentMod = require('../../agent');

var agentList = [];

router.post('/', (req, res) => {
    var sessionID = req.body.sessionID;
    var message = req.body.content;
    var response = '';

    // Eliza 
    if (typeof agentList[sessionID] === 'undefined') {
        // First interaction
        var agent = agentMod.createInstance(sessionID);
        agentList[sessionID] = agent;
        response = agent.initialMessage();
        console.log('New Client connected. SessionID: ' + sessionID);
    } else {
        // Previously interacted
        response = agentList[sessionID].processMessage(message);
    }

    if (response !== '')
        res.status(200).json(response);

});

router.post('/reset', (req, res) => {
    var sessionID = req.body.sessionID;
    var agent = agentList[sessionID];

    // Eliza 
    agent.resetAgent(sessionID);
    response = agent.initialMessage();

    if (response !== '')
        res.status(200).json(response);
});

module.exports = router;