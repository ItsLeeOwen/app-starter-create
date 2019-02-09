#!/usr/bin/env node

//var Git = require("nodegit")
// var fs = require("fs")
var exec = require("child_process").execSync
// var rimraf = require("rimraf")
var pkg = require("./package.json")
// var ncp = require("ncp").ncp
var fs = require("fs-extra")
var glob = require("glob")

var cwd = process.cwd()
var args = process.argv.slice(2)
var dirname = args[0]

console.log("  ::App Starter Start::  ", pkg.version)

if (!dirname || "string" !== typeof dirname || dirname.trim() === "") {
  console.log(
    "project name required.  example:",
    "npx app-starter my-new-project"
  )
  return process.exit(1)
}

exec("npm install app-starter --loglevel error", { stdio: "inherit" })

copyAppStarter()

exec("npm start", { stdio: "inherit" })

console.log("  ::App Starter End::  ", pkg.version)

function copyAppStarter() {
  try {
    var files = glob.sync("./node_modules/app-starter/**/*", {})

    files.forEach(filepath => {
      fs.copySync(
        filepath,
        filepath.replace("./node_modules/app-starter/", "./tmp/")
      )
    })
  } catch (err) {
    exitOnError(err)
  }
}

function exitOnError(err) {
  console.error(err)
  process.exit(1)
}
