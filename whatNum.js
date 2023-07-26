#!/usr/bin/env node

const readline = require('readline');
var log = console.log;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


const quizNumber = getRandomInt(0,99);
log(`Please, find number between 0 до 99 (spoiler for test... it is ${quizNumber})`);
let recursiveAsyncReadLine = function () {
  rl.question('', function (answer) {
    if (Number(answer) === quizNumber) {
      log('Got it! You are a maaaan!: ', answer);
      return rl.close();
    } 
    else if (Number(answer) > quizNumber) {
      log('Please, less than', answer);
    }
    else{
      log('Please, more than', answer);
    }
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

recursiveAsyncReadLine(); //we have to actually start our recursion somehow
  