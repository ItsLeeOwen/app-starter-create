#!/usr/bin/env node

const child = require("child_process")
const pkg = require("./package.json")
const fs = require("fs-extra")

const args = process.argv.slice(2)

const EXEC_OPTIONS = { stdio: "inherit" }
const REPO = "https://github.com/ItsLeeOwen/app-starter.git"

//const githubUsername = getGithubUsername()

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

  case "heroku":
    cloneRepo(dirname, "heroku")
    break

  default:
    cloneRepo(dirname, "master")
}

if (!chdir(dirname)) {
  return
}

child.execSync(`rm -rf .git`)
child.execSync("git init")
child.execSync("git add . && git commit -m 'app started'")

// hub requires auth prompts
//child.execSync("hub create -d 'Another Excellent App Starter Project'")
//child.execSync("git push origin master")

npmInstall(dirname)

function npmInstall(dirname) {
  child.execSync(
    //    `npm install --loglevel error --prefix ${dirname}`,
    `npm install --loglevel error`,
    EXEC_OPTIONS
  )
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

function chdir(dirname) {
  try {
    process.chdir(`./${dirname}`)
    return true
  } catch (err) {
    console.error("chdir: " + err)
    return err
  }
}

function getGithubUsername() {
  try {
    return child.execSync("git config --global github.username").toString()
  } catch (err) {
    console.log(
      "git config --global github.username is required, please add & try again:"
    )
    console.log('git config --global github.username "<YOUR GITHUB USERNAME>"')
    //git config user.username "ItsLeeOwen"
  }
}
