# Documentation

### Running the Server

## npm start
Runs the server on localhost:3000.

## npm run dev
This command will run the server with nodemon so that HTML file updates cause server refreshes.

## npm run prod
This command will run the server using the production URLs for Strapi and our Express frontend.

## gulp
This command will watch for updates to sass and javascript files, preprocessing them accordingly.

### Legacy Information
Navigate to the folder with the server.js file, e.g. - `cd Desktop/Web Technology/Creative Map/Frontend/site`
Run the following command: `node server.js &`

This project uses Gulp to handle server maintence, compiling Sass and minimising JS.
Node should install the required dependencies for you. If they aren't there, use the following command.

`npm install node-sass gulp-sass gulp-concat gulp-rename gulp-uglify --save-dev`

### Compiling Sass

Navigate to the folder with the gulpfile, then
Use the gulpfile with `gulp sass`
Have the gulpfile watch the directory for changes and auto compile with `gulp sass:watch`
Note that this occasionally fails and needs to be restarted.

### What is Nunjucks?

Check out the documentation at https://mozilla.github.io/nunjucks/templating.html

### Setting Up Gulp to Build the Styles
I'm currently using Gulp to compile the Sass into css. In the future this could be expanded to all sorts of little tweaks for better website development.

To get it set up,
https://gulpjs.com/docs/en/getting-started/quick-start

**NB - it might already be part of your machine due to the Node.js automatic dependency installation.**

Also do `npm install gulp-sass --save-dev` if this hasn't already been installed. Again, automatic dependency installation could have done this for you already.

I haven't set this up yet, but in the future we can integrate with VSCode.
https://code.visualstudio.com/docs/languages/css#_transpiling-sass-and-less-into-css
