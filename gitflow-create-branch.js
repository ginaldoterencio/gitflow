#! /usr/bin/env node
var shell = require("shelljs/global");
var colors = require("colors");
var program = require("commander");

program.parse(process.argv);

var branchName = program.args[0];

if(typeof branchName === "undefined") {
  console.log(colors.red("Por favor, informe o nome do branch a ser criado."));
  exit(1);
}

if(exec("git rev-parse --git-dir", {silent: true}).code !== 0) {
  console.log(colors.red("Esse não é um repositório git."));
  exit(1);
}

if(exec("git rev-parse --verify master", {silent: true}).code !== 0) {
  console.log(colors.red.bold("Erro ao mudar para o branch master."));
  exit(1);
} else {
  exec("git checkout master", {silent: true});
  exec("git pull origin master", {silent: true});
}

if(exec("git rev-parse --verify " + branchName, {silent: true}).code === 0) {
  console.log(colors.yellow.bold("Branch "+ branchName + " já existe"));
  exec("git checkout " + branchName, {silent: true});
} else {
  exec("git checkout -b " + branchName, {silent: true});
  console.log(colors.green.bold("Branch criado com sucesso!"));
}
