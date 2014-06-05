# Getting Started

## Enviroment

### Nginx

We use nginx to host the local dev env. Please check the [installation guide](http://wiki.nginx.org/Install).

If you are using mac, you can use this command: `brew tap homebrew/nginx && brew install nginx-full` to install.

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

## Config

**Notice:** the word "site" in below configs should be changed to your current project short name, for example: fto, miioon...

### Nginx

Below is an example Nginx config:

	server {
        listen       11442;
        server_name  site.www.dev.com;

        location / {
            root   /site/retail/app; #change to your site app path
            index  index.html index.htm;
        }

        location /api/ {
            proxy_pass   http://127.0.0.1:8090/api/;
        }

        location /upload/ {
            proxy_pass http://site.www.abovegem.com:11442/upload/;
        }

        location /styles/ {
            root   /site/retail/.tmp; #change to your site tmp path
        }

        location /images/generated {
            root /site/retail/.tmp; #change to your site tmp path
        }
    }

    server {
        listen       22442;
        ssl on;
        ssl_certificate self-ssl.crt; #your self certification file
        ssl_certificate_key self-ssl.key; #your self certification file
        server_name  site.www.dev.com;

        location / {
            root   /site/retail/app; #change to your site app path
            index  index.html index.htm;
        }

        location /api/ {
            proxy_pass   http://127.0.0.1:8090/api/;
        }

        location /upload/ {
            proxy_pass http://site.www.abovegem.com:11442/upload/;
        }

        location /styles/ {
            root   /site/retail/.tmp; #change to your site tmp path
        }

        location /images/generated {
            root /site/retail/.tmp; #change to your site tmp path
        }
    }

    server {
        listen       22442;
        ssl on;
        ssl_certificate self-ssl.crt; #your self certification file
        ssl_certificate_key self-ssl.key; #your self certification file
        server_name  site.backoffice.dev.com;

        location / {
            root   /site/backoffice/app; #change to your site app path
            index  index.html index.htm;
        }

        location /api/ {
            proxy_pass   http://127.0.0.1:8090/api/;
        }

        location /upload/ {
            proxy_pass http://site.www.abovegem.com:11442/upload/;
        }

        location /styles/ {
            root   /site/backoffice/.tmp; #change to your site tmp path
        }

        location /images/generated {
            root /site/backoffice/.tmp; #change to your site tmp path
        }
    }

### grunt.json

Under `retail/` and `backoffice/` folder, run `cp grunt.json.example grunt.json`. Or you can config the grunt.json file as you like.

### /etc/hosts

Add bellow lines into your /etc/hosts:

	0.0.0.0 site.backoffice.dev.com
	0.0.0.0 site.www.dev.com

## Node Connector

We need node connector to handle replicate website routes, so we need to install node-connector locally to setup local dev env.

### Installation

	git clone git@github.com:2ViVe/nodejs-connector.git
	npm install

### Config

Please config the node-connector based on `config.json.development`

### Start

	node index.js site.config.json | ./node_modules/bunyan/bin/bunyan

## Enjoy!

Run `nginx` to start nginx server.

Run `grunt compass` if it's your first time to start the dev env

Run `grunt watch`, and grunt will automatically generate css, check js error when you change any css or js file.

Open [http://site.www.dev.com:11442](http://site.www.dev.com:11442) for Retail Site

Open [https://site.backoffice.dev.com:11442](https://site.backoffice.dev.com:11442) for Back Office Site.
