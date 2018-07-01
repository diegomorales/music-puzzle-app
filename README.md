# Music Puzzle

I started this game as a project for my graduation (CAS).
It's a simple game where you have to put sounblocks in correct order.
As an additional challenge for myself i developed it with WebVR.

This project is still a work in progress and by far not finished.
It will mainly serve me as a plattform for experimenting and testing out ideas in WebVR. And obviously for learning to develop for VR.

Suggestions and feedback are of course very welcome.


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
