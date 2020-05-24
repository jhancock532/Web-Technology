# Documentation

### Running the Server

Navigate to the folder with the server.js file, e.g. - `cd Desktop/Web Technology/Creative Map/Frontend/site`
Run the following command: `node server.js &`

### Developing the Server

This project uses Gulp to handle server maintence, compiling Sass and minimising JS.
Node should install the required dependencies for you. If they aren't there, use the following command.

`npm install node-sass gulp-sass gulp-develop-server gulp-concat gulp-rename gulp-uglify --save-dev`
`npm install browser-sync --save-dev'

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

# To Do List

- Map of Bristol
  - Inkscape SVG Creation
  - HTML Component (With CSS?)
  - JavaScript to make it trigger something

- Card for Event / Location
- Buttons for Cards

- Restyle the dropdown button so that it uses :after with a CSS triangle for a cleaner look.
- Fix the dropdown hovering effect.
- Implement the dropdown javascript so that it operates on button click. Unique ids for dropdowns may be necessary.

# For my MACS, 
npm install somehow does not install [nunjucks] and [express] ... 
- Have to run npm install nunjucks express manually.
- Server does not close after running the command [ node server.js & ] , still running in the background 
# Command to print only node processes 
- ps -ef | grep node
# Command to kill node processes with pid 
- kill -9 pid
