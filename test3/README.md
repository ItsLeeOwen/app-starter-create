## Get Started

```sh
npx create-app-starter my-app

# If you want to create a pure js/css/html app include `vanilla` as the 4th argument
npx create-app-starter my-app vanilla
```

or

```sh
git clone https://github.com/ItsLeeOwen/app-starter.git my-app

cd my-app

# If you want to create a pure js/css/html app include
# checkout the vanilla branch
git checkout vanilla

npm install
```

That's it.

## Code Splitting

Add additional packages to package.json's "webpack.entry" config.

```json
"webpack": {
  "entry": {
    "index.html": "./src/index.html",
    "index.js": "./src/index.js",

    "login.html": "./src/login.html",
    "login.js": "./src/login.js"
  }
}
```

## .env Environment Vars

Want to expose environment variables to your javascript? Use a .env file in the root of your project. The variables will be accessible on `process.env`, such as `process.env.PUBLIC_KEY_EXAMPLE`.

Although these values are not committed to your github repo when `.env` is gitignored, they ARE transpiled in your clientside code, so don't use any private secrets, or anything you don't want others to find.

Restarting your app between .env changes is required.

```json
"webpack": {
  "env": {
    "PUBLIC_KEY_EXAMPLE": "$PUBLIC_KEY_EXAMPLE"
  }
}
```

## Heroku Integration

Heroku cli is required, if not already installed you can install [heroku cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) with brew.

```sh
brew tap heroku/brew && brew install heroku
```

### Dockerfile

Any .env vars in use need to be added to the ARG section of the `Dockerfile` found in the root of your project.

```dockerfile
# dockerfile build arg example
ARG PUBLIC_KEY_EXAMPLE="default"
```

To publish to heroku, your project will need to be added to heroku once:

```sh
./heroku/create
```

After this you can deploy the project to heroku using:

```sh
./heroku/deploy
```
