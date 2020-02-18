const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/lotto', (req, res) => {
  // accept an array of numbers between 1-20 called "numbers"
  const numbers = req.query.arr;
  let matchedNumbers = [];

  // we need to validate the input
  // also need to make sure the numbers are between 1 and 20
  if(numbers.length !== 6) {
    return res.status(400).send('Please enter 6 digits');
  }

  // NICE TO DO - not needed
  // numbers.forEach(number => {
  //     if (!Number.isNaN(number)) {
  //         return res.status(400).send('Please enter numbers only');
  //     }
  // });

  // randomly generate 6 numbers between 1-20
  const randomNumbers = [];
  for( let i=0; i < 6; i++) {
    randomNumbers.push(Math.floor(Math.random()*20));
  }
  // compare the numbers sent to the random numbers
  if(req.query.arr) {
    matchedNumbers = numbers.filter(number => {
        return randomNumbers.includes(parseInt(number));
    });
  }
  

  // if you get fewer than 4, return Sorry, you lose
  // If 4 match, "Congratulations, you win a free ticket"
  // if 5 match "Congratulations! You win $100!"
  // if 6 match "Wow! Unbelievable! You could have won the mega millions!"
  res.send(`Numbers: ${numbers} Random Numbers: ${randomNumbers} Matched Numbers: ${matchedNumbers}`);
});

// for( let i=o; i < 6; i++) {
//     if(numbers.includes(randomNumbers[i])) {
//         res.
//     }
// }

app.listen(8000, () => {
  console.log('Express is listening on port 8000');
});

//Math.floor(Math.random()*x)