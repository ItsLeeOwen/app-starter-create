#!/usr/bin/env node

const child = require("child_process")
const pkg = require("./package.json")
const fs = require("fs-extra")

const args = process.argv.slice(2)

const EXEC_OPTIONS = { stdio: "inherit" }
const REPO = "https://github.com/ItsLeeOwen/app-starter.git"

let dirname = args[0]
let type = "master"
if (args.length > 1 && "string" === typeof args[1]) {
  type = args[1].toLowerCase()
}

console.log(`::: Create App Starter v${pkg.version} :::`)

if (!dirname || "string" !== typeof dirname) {
  return exitOnError(
    new Error(`project name required, example: npx app-starter my-new-app`)
  )
}

dirname = dirname.replace(/[^a-z0-9_-]/gi, "").trim()

if (dirname.trim() === "") {
  return exitOnError(
    new Error(`project name required, example: npx app-starter my-new-app`)
  )
}

if (fs.existsSync(dirname)) {
  return exitOnError(new Error(`project name already in use: ${dirname}`))
}

switch (type) {
  case "vanilla":
    cloneRepo(dirname, "vanilla")
    break

  default:
    cloneRepo(dirname, "master")
}

child.execSync(`rm -rf ./${dirname}/.git`)
npmInstall(dirname)

function npmInstall(dirname) {
  child.execSync(
    `npm install --loglevel error --prefix ${dirname}`,
    EXEC_OPTIONS
  )
  console.log("ok ok")
  process.exit(0)
}

function cloneRepo(dirname, branch = "master") {
  child.execSync(
    `git clone --depth 1 --single-branch --branch ${branch} ${REPO} ${dirname}`,
    EXEC_OPTIONS
  )
}

function exitOnError(err = "an unknown error occured") {
  console.log(err.toString())
  process.exit(1)
}
