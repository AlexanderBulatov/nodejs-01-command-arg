#!/usr/bin/env node
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: "y",
        type: "Number",
        description: "year"
    })
    .option('month', {
        alias: "m",
        type: "Number",
        description: "month"
    })
    .option('date', {
        alias: "d",
        type: "Number",
        description: "date"
    })
    .argv

function whatDate (param, value){

    let dtt = new Date();
    switch (param) {
        case 'y':
            dtt.setFullYear(dtt.getFullYear()+value);
            return {date: dtt, log:`${(value < 0) ? 'Уменьшение': 'Увеличение'} текущей даты на ${Math.abs(value)} лет (год(-а)):`};
            break;
        case 'm':
            dtt.setMonth(dtt.getMonth()+value);
            return {date: dtt, log:`${(value < 0) ? 'Уменьшение': 'Увеличение'} текущей даты на ${Math.abs(value)} месяца(-ев):`};
            break;
        case 'd':
            dtt.setDate(dtt.getDate()+value);
            return {date: dtt, log:`${(value < 0) ? 'Уменьшение': 'Увеличение'} текущей даты на ${Math.abs(value)} дня (дней):`};
            break;
    }
}

function parsArgv (argv){
  let command = argv._[0];
  let param = {};
  (argv.d) ? param = {flag: 'd', value: argv.d}: 
  ((argv.m) ? param = {flag: 'm', value: argv.m}: 
  ((argv.y) ? param = {flag: 'y', value: argv.y}:param = {flag: 'unknown', value: false}));
  return {...param, command: command}
}

function dateAnsw(arg) {
  let dtt = new Date();
  switch (arg.command) {

    case 'current':

      switch (arg.flag) {
        case 'unknown':
          return ans = { date: dtt, log: "Текущая дата: " };
          break;
        case 'y':
          return { date: dtt.getFullYear(), log: "Текущий год:" };
          break;
        case 'm':
          return { date: dtt.getMonth() + 1, log: "Текущий месяц:" };
          break;
        case 'd':
          return { date: dtt.getDate(), log: "Текущая дата календарного месяца:" };
          break;
      }
      break;

    case 'add':

      switch (arg.flag) {
        case 'unknown':
          return { date: dtt, log: "Несуществующий флаг команды. Текущая дата" };
          break;
        default:
          return whatDate(arg.flag, arg.value);
          break;
      }
      break;

    case 'sub':

      switch (arg.flag) {
        case 'unknown':
          return 'flag error';
          break;
        default:
          return whatDate(arg.flag, -arg.value);
          break;
      }
      break;
    default:
      return 'command error';
      break;
  }
}
ans = dateAnsw(parsArgv(argv));
console.log(`${ans==='command error'?'неизвестная  или отсутствующая команда': ans.log+' '+ ans.date} `)