#!/usr/bin/env node
import chalk from 'chalk';
import terminalImage from 'terminal-image';
import got from 'got';
import wordWrap from 'word-wrap';
import inquirer from 'inquirer';
import open from 'open';

const calculateAge = (dob) => { 
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
const age = calculateAge(new Date(1999, 12, 26));

try {
  const response = await got('https://avatars.githubusercontent.com/u/52071488?v=4', { responseType: 'buffer' });
  const image = await terminalImage.buffer(response.body, { width: '33%' });

  console.log('\n\n');
  console.log(image);
  console.log(wordWrap(`

  Hi there! 👋 I'm ${chalk.blue.bold("Faizal Anwar")}! (but you can call me faisal - pronounced ${chalk.underline.bold.green("fay-sal")}) .  
  I'm a ${age}-yo, based in West Java, Indonesia. 
  Writing code by day, debugging life by night - with Java, Spring, Kotlin, Laravel, Next.js, and a cup that’s never empty (no grounds, ofc!). 😅
  When I'm not on duty (aka glued to my screen), you’ll probably find me unwinding, or tinkering with side projects I’ll probably never finish… but hey, it’s fun!

`.trim(), { width: 200, trim: true }));

  console.log('\n\n');
  const answer = await inquirer.prompt([{
    type: 'list',
    message: 'Do you want to know more about me?',
    name: 'open',
    choices: [
      { name: chalk.white(`💻  What am I doing about Open Source? (${chalk.bold('GitHub')})`), value: 'https://github.com/faizalanwar' },
      { name: chalk.cyan(`🐦  What do I think? (${chalk.bold('Twitter')})`), value: 'https://twitter.com/fzlanwr' },
      { name: chalk.blue(`🏹  Curriculum vitae, the path of my life (${chalk.bold('LinkedIn')})`), value: 'https://linkedin.com/in/faizalanwar/' },
      { name: chalk.red('👋  Nope. Bye.\n'), value: false }
    ]
  }]);

  if (answer.open) {
    await open(answer.open);
  }
  process.exit();
} catch (error) {
  console.error(error);
  process.exit(1);
}
