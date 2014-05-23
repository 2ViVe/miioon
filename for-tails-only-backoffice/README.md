# Getting Started for frontend

## Enviroment

### Ruby

We need Ruby and [Compass](http://compass-style.org/) to compile css: run `gem install compass`

### Node

Install [NVM](https://github.com/creationix/nvm): run `curl https://raw.github.com/creationix/nvm/master/install.sh | sh` or `wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh`

Install [Node.js](http://www.nodejs.org): `nvm install 0.10`

Optional: Make 0.10 as the defualt Node.js version: `nvm alias default 0.10`

Install [NPM](https://www.npmjs.org/): check the installation guide at [here](https://github.com/npm/npm). (For OSX, just run `brew install npm`)

### Global Node Package

We need to install two node packages to run them in command-line.

Install [Grunt](http://gruntjs.com/): run `npm install -g grunt-cli`

Install [Bower](http://bower.io): run `npm install -g bower`

## Dependencies

### Node Package dependencies

Run `npm install`

### Bower Package dependencies

Run `bower intall`

## Enjoy!

Run `grunt serve` and Grunt will automatically open [http://127.0.0.1:9000/](http://127.0.0.1:9000/)

When you modify anything, the page will refresh automatically.
