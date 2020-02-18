const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  if (!text) {
    return res.status(400).send('text is required');
  }

  if (!shift) {
    return res.status(400).send('shift is required');
  }
    
  const cipher = text
    .toUpperCase()
    .split('')
    .map((letter, idx) => {
      // INPUT: text = C, shift = 5 OUTPUT SHOULD BE H (72)
      const code = letter.charCodeAt(idx); // C = 67   
      let diff = code + parseFloat(shift); // 67 + 5 = 72 SHIFT needs to be a number
      const newChar = String.fromCharCode(diff); // 67 + 7 , 74 which is J
      return newChar;
    })
    .join('');
    // OUR ISSUE: It only takes converts the first letter, and the remain letters are blank
    // example:
    // INPUT: text=ABC shift=2
    // OUTPUT: "C  "
    
  res.status(200).send(cipher);

  // charcode 65 is A, charcode 90 is Z (lowercase a 97, lowercase z is 122)

  // if text = A and shift is 5
  // we need to get the charcode of A
  // 'A'.charcodeat0 is 65
  // add the shift to it
  // 65 + 5
  // convert the number to a string
  // string.fromcharcode(70)

  // 'A'.charCodeAt(0) is the number 65
  // 'ABC.charCodeAt(2) is 67 (charcode for letter C)
  // console.log(String.fromCharCode(189, 43, 190, 61));
  // expected output: "½+¾="

});
app.listen(8000, () => {
  console.log('Express is running');
});
