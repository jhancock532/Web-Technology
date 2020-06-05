var attraction_map_container = document.getElementById("map-container");

if (attraction_map_container){

  var latitude = parseFloat(document.getElementById("attraction__latitude").textContent); 
  var longitude = parseFloat(document.getElementById("attraction__longitude").textContent); 

  var attraction_map = L.map('map-container').setView([latitude, longitude], 16);

  //https://b.tile.openstreetmap.org/{z}/{x}/{y}.png //Donation based, should be used for testing purposes only. 
  //https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg //Creative commons, should be used with attribute.
  
  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
  }).addTo(attraction_map);
  
  L.marker([latitude, longitude]).addTo(attraction_map);
}


//Hello world two!
console.log("carousel");
var dropdownActive = false;

function toggleMenuVisibility(){
  if (dropdownActive){
    dropdownActive = false;
    dropdownMenuItems.style.display = 'none';
  } else {
    dropdownActive = true;
    dropdownMenuItems.style.display = 'block';
  }
}

function menuButtonKeydown(event){
  if (event.keyCode != 9) {
    toggleMenuVisibility();
  }
}

function lastLinkButtonKeydown(event){
  if (event.keyCode == 9){
    toggleMenuVisibility();
  }
}

var dropdownMenuButton = document.getElementById('dropdown-menu-button');
var dropdownMenuItems = document.getElementById('dropdown-menu-items');
var finalDropdownMenuLink = dropdownMenuItems.children[dropdownMenuItems.children.length-1];

dropdownMenuButton.addEventListener('click', toggleMenuVisibility);
dropdownMenuButton.addEventListener('keydown', menuButtonKeydown);
finalDropdownMenuLink.addEventListener('keydown', lastLinkButtonKeydown);
//Landing Page Hero Map Code
let landingPageMapContainer = document.getElementById("landing-page-hero__map-container");

if (landingPageMapContainer){
  let latitude = 51.453749;
  let longitude = -2.591873;
  let landingPageMap = L.map('landing-page-hero__map-container', { zoomControl: false }).setView([latitude, longitude], 14);

  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
  }).addTo(landingPageMap);
}

//Landing Page Explore Section Code
let attractions;
let attractionsVisited = 0;

let landingPageExploreContainer = document.getElementById('landing-page__explore-section');

function getSubcategoryChoices(){
  let subcategoryChoices = {};

  for (let i = 0; i < attractions.length; i++){
    let attraction = attractions[i];

    if (attraction.visited == false){
      for (let c = 0; c < attraction.subcategories.length; c++){
        let subcategory = attraction.subcategories[c];
  
        if ((subcategory in subcategoryChoices) == false){
          subcategoryChoices[subcategory.name] = i;
          break;
        }
      }
    }
  }

  return subcategoryChoices;
}

function fillInChoiceCard(choiceCardNum){
  let subcategoryChoices = getSubcategoryChoices();

  //Depending on choiceCardNum get the document elements we wish to edit
  
  for (let [key, value] of Object.entries(subcategoryChoices)){
    let subcategoryText = document.createElement("P"); 
    subcategoryText.innerHTML = key;
    landingPageExploreContainer.appendChild(subcategoryText);
  }

}

function fillInAttractionCard(attraction){
  //attraction.visited = true;
}

function loadRegionContent(region){

  let request = 'http://localhost:1337/attractions?region=' + encodeURIComponent(region);
  //encodeURIComponent - https://stackoverflow.com/questions/12141251/how-can-i-replace-space-with-20-in-javascript

  fetch(request)
  .then(response => response.json())
  .then(regionalAttractions => {
    attractions = regionalAttractions;

    for (let i = 0; i < attractions.length; i++){
      attractions[i].visited = false;
    }

    fillInChoiceCard(1);
  });

  landingPageExploreContainer.scrollIntoView({ 
    behavior: 'smooth' 
  });
}

let region_arnos_vale = document.getElementById("interactive-map--arnos-vale");
let region_temple_meads = document.getElementById("interactive-map--temple-meads");
let region_southville = document.getElementById("interactive-map--southville");
let region_harbourside = document.getElementById("interactive-map--harbourside");
let region_city_centre = document.getElementById("interactive-map--city-centre");
let region_clifton = document.getElementById("interactive-map--clifton");
let region_stokes_croft = document.getElementById("interactive-map--stokes-croft");

if (region_arnos_vale){
  region_arnos_vale.addEventListener('click', function() { loadRegionContent("Arnos Vale")}, false);
  region_temple_meads.addEventListener('click', function() { loadRegionContent("Temple Meads")}, false);
  region_southville.addEventListener('click', function() { loadRegionContent("Southville")}, false);
  region_harbourside.addEventListener('click', function() { loadRegionContent("Harbourside")}, false);
  region_city_centre.addEventListener('click', function() { loadRegionContent("City Centre")}, false);
  region_clifton.addEventListener('click', function() { loadRegionContent("Clifton")}, false);
  region_stokes_croft.addEventListener('click', function() { loadRegionContent("Stokes Croft")}, false);
  
}

