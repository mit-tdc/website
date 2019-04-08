# website
Official TDC rush website. 

## How to Edit Code

### Making Changes

To make changes, pull the code by running:

```bash
git pull https://github.com/mit-tdc/website.git
```

Then, make changes. Then, make *explicit* commits. That means, if you edited file `path/to/file/somefile.extension`, do the following to submit changes to that file:

```bash
git add path/to/file/somefile.extension
git commit -m 'updated {X} to do {Y} because {Z}'
```

where `X` represents what exactly you updated, `Y` what the new thing does now, and `Z` represents why you made those changes. You can also use the (_recommended_) long format of committing:

```bash
git add path/to/file/somefile.extension
git commit -m '
updated {X} to do {Y} because {Z}

additional comment/context about this update
```

### Reflecting Changes on the Real Website

Log into the MIT AFS system, then navigate to `/afs/athena.mit.edu/activity/t/tdc` (Note, there's a way to do this much faster if you read the MIT AFS guide below).

Now, this website is currently held inside `/tdc/web_scripts/rush` directory, so navigate to that (including `rush`) and run the following:

```bash
git pull https://github.com/mit-tdc/website.git
```

In the future, it would be good to include a cron script that just pulls every 30 min or so. In addition, it would be good to move the website to the root of `web_scripts`, but there are other files there that we should identify the use of and carefully rearrange before we can safely do that. 

## Project Goals

### v1.0.0: MVP

This app can display the events we have planned for rush.

`[Completed]`

### v2.0.0: Show Brothers

Shows current brothers living in the house.

### v3.0.0: Brothers Upgrade

Have Brothers with description of themselves and their nationalities displayed. 

### v4.0.0: Values 

Show the house values and quick history.   

## MIT AFS

[Gist](https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a)

## Things in This Repo

### NPM

#### `package.json` `package-lock.json`

NPM stands for Node Package Manager. Since this website is static, all the packages we have are actually `dev` packages, which can be seen in the `devDependencies` key in `package.json`. 

`dev` packages are install via command 
```bash
npm install {package-name} --save-dev
```
 or via  
 ```bash
 npm install --save-dev {package-name}
 ```

### Bower

#### `.bowerrc` `bower.json` `/bower_components`

Bower is like NPM but for static front-end websites. It allows one to install and manage and update packages (frameworks). We use this to keep the most up to date version of `React` and `Aviator`.  

The file `bower.json` is similar to NPM's package.json. All the dependencies are the ones installed. These files will be installed in the directory `/bower_components`, which is specify in the `.bowerrc` file by the key `directory`. For us, the path to it is `/static/bower_components`. 

Some important packages installed:
- React
  - An MVC javascript framework. 
  - Allows for clear decomposition of elements and code.
- Aviator
  - This is a front-end routing system. 
  - Allows us to pretend that users are moving to a different page when they really aren't.

### Gulp

#### `gulpfile.js`

Gulp is like a file manager. It essentially runs scripts specified in `gulpfile.js`. The way it works is one first installs the scripts via NPM, then write code to run the scripts. 

We use gulp to compile React `.jsx` files into `.js` files from the directory `/static/jsx` to `/static/js`. To do that, we first delete everything that's in `/static/js`, then compile everything back. In addition, we watch for any change in `/static/jsx/**/*.jsx` which triggers the script to run again (delete + compile). 


### ESLint

#### `.eslintrc.json`

This is a javascript linting tool. The specific rules are set pretty intuitively in `.eslintrc.json`. 

### GitIgnore

#### `.gitignore`

This file tells git to ignore all the files or directories specified line by line in `.gitignore`.
