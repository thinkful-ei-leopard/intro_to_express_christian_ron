// Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values. 
// Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should 
// be given to converting them to numbers.

// http://localhost:8000/queryViewer?name=Legolas
// { name: 'Legolas' }

const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/sum', (req, res) => {
    // get the values from the request
    const a = req.query.a;
    const b = req.query.b;

    // validate the values
    if(!a) {
        return res.status(400).send('A is required.');
    }

    if(!b) {
        return res.status(400).send('B is required.');
    }

    // a and b are strings, make them numbers
    const c = parseInt(a) + parseInt(b);

    const replyText = `The sum of ${a} and ${b} is ${c}.`;

    res.send(replyText);
});

app.listen(8000, () => {
  console.log('Express is listening on port 8000')
});