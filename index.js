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

console.log(`  ::: Create App Starter v${pkg.version} ::: `)

if (!dirname || "string" !== typeof dirname) {
  console.log(
    "project name required.  example:",
    "npx app-starter my-new-project"
  )
  return process.exit(1)
}

dirname = dirname.replace(/[^a-z0-9_-]/gi, "").trim()

if (dirname.trim() === "") {
  console.log(
    "project name required.  example:",
    "npx app-starter my-new-project"
  )
  return process.exit(1)
}

exec(`npm install app-starter --prefix ${dirname} --loglevel error`, {
  stdio: "inherit",
})

process.chdir(dirname)
copyAppStarter()

console.log(`  ::: Skończone ::: `)

exec("npm start", { stdio: "inherit" })

function copyAppStarter() {
  try {
    var pathToAppStarter = `./node_modules/app-starter`
    var files = glob.sync(`${pathToAppStarter}/**/*`, {})

    files.forEach(filepath => {
      fs.copySync(filepath, filepath.replace(`${pathToAppStarter}/`, `./`))
    })
  } catch (err) {
    exitOnError(err)
  }
}

function exitOnError(err) {
  console.error(err)
  process.exit(1)
}
