#! /usr/bin/env node
var program = require("commander");

program
  .version("0.0.1")
  .command("create-branch [name]", "Cria um novo branch a partir do master.")
  .command("deploy [name]", "Faz o merge do branch infomado no working.")
  .parse(process.argv);
