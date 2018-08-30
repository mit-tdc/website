# website
Official TDC rush website. 

## Project Goals

### v1.0.0: MVP

This app can display the events we have planned for rush.

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
