//Server Libraries
const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const superagent = require('superagent');
const showdown  = require('showdown'),
      markdownConverter = new showdown.Converter();

//Developed with Express
let app = express();
let port = 3000;
let root = __dirname + "/public";

nunjucks.configure(root, {
  autoescape: true,
  express: app
});


app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/javascript', express.static(path.join(__dirname, 'public/javascript')));

app.get('/', function(req, res) {
  res.render('index.html', {
    INCLUDE_MAP: true, //INCLUDE_MAP includes the Leaflet.js JavaScript file when serving the webpage.
  });
});

app.get('/style-guide', function(req, res) {
  res.render('style-guide.html', {
    INCLUDE_MAP: true,
  });
});

app.get('/culture-and-heritage', function(req, res) {
  superagent.get('http://localhost:1337/categories/4')
    .end((err, api_res) => {
      if (err) { return console.log(err); }
      console.log(api_res.body);

      res.render('culture-and-heritage.html', {
        data: api_res.body,
      });
    });
});

app.get('/food-and-drink', function(req, res) {
  superagent.get('http://localhost:1337/categories/3')
    .end((err, api_res) => {
      if (err) { return console.log(err); }
      console.log(api_res.body);

      res.render('food-and-drink.html', {
        data: api_res.body,
      })
    });
});

app.get('/events-and-spaces', function(req, res) {
  superagent.get('http://localhost:1337/categories/5')
    .end((err, api_res) => {
      if (err) { return console.log(err); }
      console.log(api_res.body);

      res.render('events-and-spaces.html', {
        data: api_res.body,
      })
    });
});

app.get('/subcategories/:id', function(req, res) {

  //console.log(req.params);

  let api_req = 'http://localhost:1337/subcategories/' + req.params['id'];

  //console.log(api_req);

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) { return console.log(err); }
      //console.log(api_res.body);

      res.render('subcategory.html', {
        data: api_res.body,
      })
  });
  
});

app.get('/attractions/:id', function(req, res) {

  console.log(req.params);

  let api_req = 'http://localhost:1337/attractions/' + req.params['id'];

  console.log(api_req);

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) { return console.log(err); }
      console.log(api_res.body);

      descriptionHtml = markdownConverter.makeHtml(api_res.body.description);

      res.render('attraction.html', {
        data: api_res.body,
        description: descriptionHtml,
        INCLUDE_MAP: true
      })
  });
  
});

app.listen(port, () => console.log(`Website now listening on port ${port}!`));

////////////////////////////////////////////////////////////
// KEEP THIS AROUND TO RECALL THE UNSOLVED ISSUE
////////////////////////////////////////////////////////////

// When interrupt signal is detected at the terminal, we terminate the process 
// - This does not work CTRL-C is has a default handler in Linux system, so it exits on terminal before getting detected by the server.

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  app.close(() => { //this used to be server.close but we're using app so I fixed this for you?
    console.log('Http server closed.');
    process.kill(process.pid, 'SIGTERM');
    process.exit(0);    
  });
});

// console.log( "kill" , process.pid.toString() );

// process.on('SIGTERM', () => {
//     console.info('SIGTERM signal received.');
//     console.log('Process terminated')
//     process.exit(0);
//   });

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//app.use('/css', express.static(__dirname + '/css'));
//app.use('/img', express.static(__dirname + '/img'));
//app.use('/static', express.static(path.join(__dirname, 'public')));

//app.use(express.static(root)); - This gives access to public resources?

//https://expressjs.com/en/starter/static-files.html
//https://stackoverflow.com/questions/24582338/how-can-i-include-css-files-using-node-express-and-ejs
//Be careful here, this is difficult to get right.



// // Run a node.js web server for local development of a static web site. Create a
// // site folder, put server.js in it, create a sub-folder called "public", with
// // at least a file "index.html" in it. Start the server with "node server.js &",
// // and visit the site at the address printed on the console.
// //     The server is designed so that a site will still work if you move it to a
// // different platform, by treating the file system as case-sensitive even when
// // it isn't (as on Windows and some Macs). URLs are then case-sensitive.
// //     All HTML files are assumed to have a .html extension and are delivered as
// // application/xhtml+xml for instant feedback on XHTML errors. Content
// // negotiation is not implemented, so old browsers are not supported. Https is
// // not supported. Add to the list of file types in defineTypes, as necessary.

// // Change the port to the default 80, if there are no permission issues and port
// // 80 isn't already in use. The root folder corresponds to the "/" url.
// let port = 8080;
// let root = "./public"

// // Load the library modules, and define the global constants and variables.
// // Load the promises version of fs, so that async/await can be used.
// // See http://en.wikipedia.org/wiki/List_of_HTTP_status_codes.
// // The file types supported are set up in the defineTypes function.
// // The paths variable is a cache of url paths in the site, to check case.
// let http = require("http");
// let fs = require("fs").promises;
// let OK = 200, NotFound = 404, BadType = 415, Error = 500;
// let types, paths;



// // Start the server:
// start();

// // Check the site, giving quick feedback if it hasn't been set up properly.
// // Start the http service. Accept only requests from localhost, for security.
// // If successful, the handle function is called for each request.
// async function start() {
//     try {
//         await fs.access(root);
//         await fs.access(root + "/index.html");
//         types = defineTypes();
//         paths = new Set();
//         paths.add("/");
//         let service = http.createServer(handle);
//         service.listen(port, "localhost");
//         let address = "http://localhost";
//         if (port != 80) address = address + ":" + port;
//         console.log("Server running at", address);
//     }
//     catch (err) { console.log(err); process.exit(1); }
// }

// // Serve a request by delivering a file.
// async function handle(request, response) {
//     let url = request.url;
//     if (url.endsWith("/")) url = url + "index.html";
//     let ok = await checkPath(url);
//     if (! ok) return fail(response, NotFound, "URL not found (check case)");
//     let type = findType(url);
//     if (type == null) return fail(response, BadType, "File type not supported");
//     let file = root + url;
//     let content = await fs.readFile(file);
//     deliver(response, type, content);
// }

// // Check if a path is in or can be added to the set of site paths, in order
// // to ensure case-sensitivity.
// async function checkPath(path) {
//     if (! paths.has(path)) {
//         let n = path.lastIndexOf("/", path.length - 2);
//         let parent = path.substring(0, n + 1);
//         let ok = await checkPath(parent);
//         if (ok) await addContents(parent);
//     }
//     return paths.has(path);
// }

// // Add the files and subfolders in a folder to the set of site paths.
// async function addContents(folder) {
//     let folderBit = 1 << 14;
//     let names = await fs.readdir(root + folder);
//     for (let name of names) {
//         let path = folder + name;
//         let stat = await fs.stat(root + path);
//         if ((stat.mode & folderBit) != 0) path = path + "/";
//         paths.add(path);
//     }
// }

// // Find the content type to respond with, or undefined.
// function findType(url) {
//     let dot = url.lastIndexOf(".");
//     let extension = url.substring(dot + 1);
//     return types[extension];
// }

// // Deliver the file that has been read in to the browser.
// function deliver(response, type, content) {
//     let typeHeader = { "Content-Type": type };
//     response.writeHead(OK, typeHeader);
//     response.write(content);
//     response.end();
// }

// // Give a minimal failure response to the browser
// function fail(response, code, text) {
//     let textTypeHeader = { "Content-Type": "text/plain" };
//     response.writeHead(code, textTypeHeader);
//     response.write(text, "utf8");
//     response.end();
// }

// // The most common standard file extensions are supported, and html is
// // delivered as "application/xhtml+xml".  Some common non-standard file
// // extensions are explicitly excluded.  This table is defined using a function
// // rather than just a global variable, because otherwise the table would have
// // to appear before calling start().  NOTE: add entries as needed or, for a more
// // complete list, install the mime module and adapt the list it provides.
// function defineTypes() {
//     let types = {
//         html : "application/xhtml+xml",
//         css  : "text/css",
//         js   : "application/javascript",
//         mjs  : "application/javascript", // for ES6 modules
//         png  : "image/png",
//         gif  : "image/gif",    // for images copied unchanged
//         jpeg : "image/jpeg",   // for images copied unchanged
//         jpg  : "image/jpeg",   // for images copied unchanged
//         svg  : "image/svg+xml",
//         json : "application/json",
//         pdf  : "application/pdf",
//         txt  : "text/plain",
//         ttf  : "application/x-font-ttf",
//         woff : "application/font-woff",
//         aac  : "audio/aac",
//         mp3  : "audio/mpeg",
//         mp4  : "video/mp4",
//         webm : "video/webm",
//         ico  : "image/x-icon", // just for favicon.ico
//         xhtml: undefined,      // non-standard, use .html
//         htm  : undefined,      // non-standard, use .html
//         rar  : undefined,      // non-standard, platform dependent, use .zip
//         doc  : undefined,      // non-standard, platform dependent, use .pdf
//         docx : undefined,      // non-standard, platform dependent, use .pdf
//     }
//     return types;
// }
