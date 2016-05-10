#! /usr/bin/env node
var shell = require("shelljs/global");
var colors = require("colors");
var program = require("commander");

program.parse(process.argv);

var branchName = program.args[0];

if(typeof branchName === "undefined") {
  console.log(colors.red.bold("Por favor, informe o nome do branch a ser feito deploy."));
  exit(1);
}

if(exec("git rev-parse --git-dir", {silent: true}).code !== 0) {
  console.log(colors.red.bold("Esse não é um repositório git."));
  exit(1);
}

if(exec("git rev-parse --verify " + branchName, {silent: true}).code !== 0) {
  console.log(colors.red.bold("Branch "+ branchName + " não existe"));
  exit(1);
}

if(exec("git rev-parse --verify working", {silent: true}).code !== 0) {
  console.log(colors.red.bold("Erro ao mudar para o branch working."));
  exit(1);
}

exec("git checkout working", {silent: true});
exec("git pull origin working", {silent: true});
exec("git merge " + branchName + " --no-ff");


