[TOC]

# Configure ESLint and Flow in VS Code

This short guide is to configure VS Code for a consistent and reusable development setup.

## ESLint Setup

ESLint is a pluggable linting utility for JavaScript.
Install ESLint either locally or globally by running 

a) **npm install eslint --save-dev** in the workspace folder for a local install or 

b) **npm install -g eslint** for a global install.

Create a .eslintrc.json configuration file by running

a) **eslint --init** in a terminal (for global installation)

b) **./node_modules/.bin/eslint --init** in a terminal (for local installation)

Install ESLint VS Code extension using command **ext install vscode-eslint**

For more information and configuration settings refer [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Flow Setup
Flow is a static type checker for JavaScript code.
Flow should be setup per project for best performance. Install flow-bin using npm

**npm install flow-bin --save-dev**

Open the package.json file and add the following script with approriate flow-bin version

```
"scripts": {
  "flow": "./node_modules/flow-bin/flow-linux64-v0.54.1/flow"
}
```
For the first time run:

**npm run flow init**

It will create a '.flowconfig' file. For more configuration refer [.flowconfig](https://flow.org/en/docs/config/)

After running flow with init the first time, run:

**npm run flow**

```
> https-certificate-tutorial@1.0.0 flow /home/manisuec/personal/r&d/study/https
> ./node_modules/flow-bin/flow-linux64-v0.54.1/flow

Launching Flow server for /home/manisuec/personal/r&d/study/https
Spawned flow server (pid=29263)
Logs will go to /tmp/flow/zShomezSmanisueczSpersonalzSr&dzSstudyzShttps.log
No errors!
```

After this run:

**npm run flow stop**

```
> https-certificate-tutorial@1.0.0 flow /home/manisuec/personal/r&d/study/https
> ./node_modules/flow-bin/flow-linux64-v0.54.1/flow "stop"

Trying to connect to server for /home/manisuec/personal/r&d/study/https
Attempting to nicely kill server for /home/manisuec/personal/r&d/study/https
Successfully killed server for /home/manisuec/personal/r&d/study/https
```

This sets up VS Code with ESLint and Flow for development with a consistent configuation.
