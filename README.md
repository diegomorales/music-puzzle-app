# Simple Frontend Setup

An opinionated setup for creating very basic projects or onepagers.

You can use this setup as a starting point for your site.  

## Features

- Setup runs in an docker image.
- Uses gulp and webpack
- ES6 (babel)
- Sass
- Eslint with [standardJs](https://standardjs.com/)
- Stylelint
- browser-sync
- Build task

## Getting started

In the project root run

	$ ./start.sh

This will build and run the docker image, and then opens a console to the docker image.

	# It will look something like this
	node@<some hash>:~/code$


Now install all dependencies.

	node@<some hash>:~/code$ npm install
	
To quit the docker console just type `exit` or press `CTRL-D`.

## Commands
Run these in the docker console.

- `npm start`: For development. Starts gulp watchers and webpack in watch mode.
- `npm run build`: Makes a production build

## Notes 
- Always install or uninstall npm packages from the docker console.
- docker is only used here for development. This way it's not necessary to have node/npm installed globally. But obviously you can still run this setup without docker. (I'd recommend node v8+).
