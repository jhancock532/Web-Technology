//Server Libraries
const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const superagent = require('superagent');
const favicon = require('serve-favicon');
const showdown  = require('showdown'),
      markdownConverter = new showdown.Converter();

const VERIFY_XHTML = true;
const DEBUG_LOG = true;
const WEBSITE_TITLE = "Explore Bristol";

const STRAPI_DEV_URL = "http://localhost:1337";
const STRAPI_PROD_URL = "https://strapi-visit-bristol.herokuapp.com";

const SITE_DEV_URL = "http://localhost:3000";
const SITE_PROD_URL = "https://visit-bristol.herokuapp.com";

let development = true;
if (process.argv[2] == "production"){
  development = false;
}

let app = express();
let port = 3000;
let root = __dirname + "/public";
let siteURL = "";
let strapiURL = "";

if (development) {
  siteURL = SITE_DEV_URL;
  strapiURL = STRAPI_DEV_URL;
} else {
  siteURL = SITE_PROD_URL;
  strapiURL = STRAPI_PROD_URL;
}

nunjucks.configure(root, {
  autoescape: true,
  express: app
});

app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use('/favicon', express.static(path.join(__dirname, 'public/favicon')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/javascript', express.static(path.join(__dirname, 'public/javascript')));

// ** Server Responses to URLs **

app.get('/', function(req, res) {
  addXHTML(res);
  //Use .xhtml for this file name! It makes the SVG file for the map work with xhtml parsing
  //See the following source - https://dh.obdurodon.org/svg-embedding.xhtml

  res.render('index.xhtml', {
    INCLUDE_MAP: true, //INCLUDE_MAP includes the Leaflet.js JavaScript file when serving the webpage.
    title: WEBSITE_TITLE,
    shareURL: siteURL,
    strapiURL: strapiURL,
  });
});

app.get('/style-guide', function(req, res) {
  addXHTML(res);
  res.render('style-guide.html', {
    INCLUDE_MAP: true,
    title: WEBSITE_TITLE + " - Style Guide",
    shareURL: encodeURI(siteURL + req.url),
    strapiURL: strapiURL,
  });
});

app.get('/culture-and-heritage', function(req, res) {
  let api_req = strapiURL + "/categories/4";

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) { 
        return console.log(err); 
      }
      
      log(api_res.body);
      addXHTML(res);
      res.render('culture-and-heritage.html', {
        data: api_res.body,
        title: WEBSITE_TITLE + " - Culture & Heritage",
        shareURL: encodeURI(siteURL + req.url),
        strapiURL: strapiURL,
      });
    });
});

app.get('/food-and-drink', function(req, res) {
  let api_req = strapiURL + "/categories/3";

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) { 
        return console.log(err); 
      }
      
      log(api_res.body);
      addXHTML(res);

      res.render('food-and-drink.html', {
        data: api_res.body,
        title: WEBSITE_TITLE + " - Food & Drink",
        shareURL: encodeURI(siteURL + req.url),
        strapiURL: strapiURL,
      })
    });
});

app.get('/events-and-spaces', function(req, res) {
  let api_req = strapiURL + "/categories/5";

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) {
        return console.log(err); 
      }
      
      log(api_res.body);
      addXHTML(res);

      res.render('events-and-spaces.html', {
        data: api_res.body,
        title: WEBSITE_TITLE + " - Events & Spaces",
        shareURL: encodeURI(siteURL + req.url),
        strapiURL: strapiURL,
      })
    });
});

app.get('/subcategories/:id', function(req, res) {
  let api_req = strapiURL + '/subcategories/' + req.params['id'];

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) {
        res.render('404.html', {
          title: WEBSITE_TITLE + " - 404",
          shareURL: encodeURI(siteURL),
          strapiURL: strapiURL,
        });
        return console.log(err); 
      }

      log(api_res.body);
      addXHTML(res);
      res.render('subcategory.html', {
        data: api_res.body,
        title: WEBSITE_TITLE + " - " + api_res.body.name,
        shareURL: encodeURI(siteURL + req.url),
        strapiURL: strapiURL,
      })
  });
  
});

app.get('/attractions/:id', function(req, res) {

  let api_req = strapiURL + '/attractions/' + req.params['id'];

  log(api_req);

  superagent.get(api_req)
    .end((err, api_res) => {
      if (err) {
        res.render('404.html', {
          title: WEBSITE_TITLE + " - 404",
          shareURL: encodeURI(siteURL),
          strapiURL: strapiURL,
        });
        return console.log(err);
      }

      log(api_res.body);

      descriptionHtml = markdownConverter.makeHtml(api_res.body.description);

      addXHTML(res);

      res.render('attraction.html', {
        data: api_res.body,
        description: descriptionHtml,
        INCLUDE_MAP: true,
        title: WEBSITE_TITLE + " - " + api_res.body.name,
        shareURL: encodeURI(siteURL + req.url),
        strapiURL: strapiURL,
      })
  });
  
});

//Additional Server Functions

/**
 * Conditionally adds the XHTML response tag if VERIFY_XHTML is true.
 * @param {Server Response Object} res 
 */
function addXHTML(res){
  if (VERIFY_XHTML){
    res.set('content-type','application/xhtml+xml; charset=utf-8');
  }
}

/**
 * Logs text to the server logs if DEBUG_LOG is true.
 * @param {Text to be logged} text 
 */
function log(text){
  if (DEBUG_LOG){
    console.log(text);
  }
}

//This catches all other URLs - if they aren't in the list above, they aren't valid.
app.get('*', function(req, res){
  res.render('404.html', {
    title: WEBSITE_TITLE + " - 404",
    shareURL: encodeURI(siteURL),
  });
});

app.listen(port, () => console.log(`Website now listening on port ${port}!`));

// When interrupt signal is detected at the terminal, we terminate the process.
// This may not work as CTRL-C is has a default handler in Linux system, so it exits on terminal before getting detected by the server.
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  app.close(() => { 
    console.log('Http server closed.');
    process.kill(process.pid, 'SIGTERM');
    process.exit(0);    
  });
});