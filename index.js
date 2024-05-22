/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from 'inquirer';
import qr from "qr-image" ;// import x from qr-image ; replaced :import { image } from 'qr-image';
import fs  from "fs" ;

// var qr = require('qr-image');

inquirer
  .prompt([
    {
     message : "Type in your URL: ",
     name: "URL",
  },
    /* Pass your questions in here : in {}- as it is a javascript object
    If we scroll down in npm documentation, we'll see that
the question is actually an object containing various optional values, such as the message to print,
or the name to use when you're storing the answer and a lot of other things which are all optional.*/
      
  ])
  .then((answers) => {
    //console.log(answers);
    const url = answers.URL;// step 1 completed
    
    var qr_svg = qr.image(url);
    // qr_svg.pipe(require('fs').createWriteStream('qr_img.g'));
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

    /*Use user feedback for... whatever!! : 
    And then the answer is a key/value hash containing the client answers in each of the prompts you pass.
So you can pass multiple questions.*/
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });