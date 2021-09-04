#!/usr/bin/env node
'use strict';
var c = require('chalk');
var link = require('terminal-link');
var img = require('terminal-image');
var got = require('got');
var ww = require('word-wrap');
var iq = require('inquirer');
var opn = require('open');

function calculate_age(dob) { 
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
var umur = calculate_age(new Date(1999, 12, 26));

got('https://avatars.githubusercontent.com/u/52071488?v=4', { responseType: 'buffer' })
  .then(function (image) { return img.buffer(image.body, { width: '33%' }) })
  .then(function (image) {

    console.log('\n\n')
    console.log(image)
    console.log(ww(`


Hi. I'm ${c.blue.bold("Faizal Anwar")}! , but you can call me Isal ${c.underline.bold.green("(read: e'sal)")} .\n
I'm ${umur} years old a 👨‍💻 ${c.bgCyan.black.bold("Frontend Engineer")} , living in West Java - Indonesia.\n
Currently learning about Design thinking and ${c.white.bold("write a program ")} with ${c.underline.bold.yellow("JavaScript")} and ${c.bold.blue("PhP")}. \n
Love open source development and share on my GitHub profile 🚶 ${link(c.red.bold('github.com/faizalanwar'), 'https://github.com/faizalanwar')}.
`.trim(), { width: 200, trim: true }));

    console.log('\n\n')
    iq.prompt([
      {
        type: 'list',
        message: 'Do you want to learn more about me?',
        name: 'open',
        choices: [
          { name: c.white(`💻  What am I doing about Open Source? (${c.bold('GitHub')})`), value: 'https://github.com/faizalanwar' },
          { name: c.cyan(`🐦  What do I think? (${c.bold('Twitter')})`), value: 'https://twitter.com/fzlanwr' },
          { name: c.blue(`🏹  Curriculum vitae, the path of my life (${c.bold('LinkedIn')})`), value: 'https://linkedin.com/in/faizalanwar/' },
          { name: c.red('👋  Nope. Bye.\n'), value: false }
        ]
       
      }
    ]).then(function (a) { opn(a.open); process.exit() }).catch(function () { });
  }).catch(function (e) { console.log(e) });
