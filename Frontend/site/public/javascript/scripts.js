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
let landingPageExploreContainer = document.getElementById('landing-page__explore-section');
let attractionsVisited = 0;



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

function displayNextChoiceCard(choiceCardNum){
  if (choiceCardNum == attractionsVisited + 1){
    fillInChoiceCard(choiceCardNum);

    let choiceCardToShowId = "choice-card--" + choiceCardNum.toString();
    document.getElementById(choiceCardToShowId).style.display = "block";
  }
}

function fillInChoiceCard(choiceCardNum){
  let subcategoryChoices = getSubcategoryChoices();

  let choiceCardListId = "choice-card-list--" + choiceCardNum.toString();
  let choiceCardList = document.getElementById(choiceCardListId);
  choiceCardList.innerHTML = "";

  if (Object.entries(subcategoryChoices).length == 0){
    choiceCardList.innerHTML = "<p class='landing-page__choice-card--error-message'>We're sorry, but there are no other registered attractions in this region. This website is under development and more will be added soon.</p>";
    return;
  }

  let numSubcategoriesToChooseFrom = 3;
  if (Object.entries(subcategoryChoices).length < numSubcategoriesToChooseFrom){
    numSubcategoriesToChooseFrom = Object.entries(subcategoryChoices).length;
  }

  for (let i = 0; i < numSubcategoriesToChooseFrom; i++){
    let buttonHTML = '';
    buttonHTML += '<a href="#attraction-card--' + choiceCardNum + '" onclick="fillInAttractionCard(' + choiceCardNum + ', ';
    buttonHTML += Object.entries(subcategoryChoices)[i][1].toString(); //The index in 'attractions' of the subcategory attraction.
    buttonHTML += ')"><li class="card__link-item">'
    buttonHTML += Object.entries(subcategoryChoices)[i][0].toString(); //The name of the subcategory.
    buttonHTML += '</li></a>';

    choiceCardList.innerHTML += buttonHTML;
  }
}

function fillInAttractionCard(cardNum, attractionNum){
  if (cardNum == attractionsVisited + 1){
    attractionsVisited += 1;

    let attractionCardToShowId = "attraction-card--" + cardNum.toString();
    document.getElementById(attractionCardToShowId).style.display = "block";
  
    let attraction = attractions[attractionNum];
  
    let attractionCardImageId = "attraction-card--image-" + cardNum.toString();
    let attractionCardTitleId = "attraction-card--title-" + cardNum.toString();
    let attractionCardTaglineId = "attraction-card--tagline-" + cardNum.toString();
    let attractionCardExploreLinkId = "attraction-card--explore-link-" + cardNum.toString();
  
    let attractionCardImage = document.getElementById(attractionCardImageId);
    let attractionCardTitle = document.getElementById(attractionCardTitleId);
    let attractionCardTagline = document.getElementById(attractionCardTaglineId);
    let attractionCardExploreLink = document.getElementById(attractionCardExploreLinkId);
  
    attractionCardTitle.innerHTML = attraction.name;
    attractionCardTagline.innerHTML = attraction.tagline;
    attractionCardImage.style.backgroundImage = "url('http://localhost:1337" + attraction.image[0].url + "')";
    attractionCardExploreLink.href = "http://localhost:3000/attractions/" + attraction.id;
  
    attraction.visited = true;
  }
}

function loadRegionContent(region){

  if (attractionsVisited != 0){
    return;
  }

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
    document.getElementById("choice-card--1").style.display = "block";
  });

  exploreSectionHider.style.display = "none";

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
let finishButton = document.getElementById('attraction-card--finish-button');
let adventureEndCard = document.getElementById('adventure-end-card');
let exploreSectionHider = document.getElementById('landing-page__explore-section-hider');

if (region_arnos_vale){
  region_arnos_vale.addEventListener('click', function() { loadRegionContent("Arnos Vale")}, false);
  region_temple_meads.addEventListener('click', function() { loadRegionContent("Temple Meads")}, false);
  region_southville.addEventListener('click', function() { loadRegionContent("Southville")}, false);
  region_harbourside.addEventListener('click', function() { loadRegionContent("Harbourside")}, false);
  region_city_centre.addEventListener('click', function() { loadRegionContent("City Centre")}, false);
  region_clifton.addEventListener('click', function() { loadRegionContent("Clifton")}, false);
  region_stokes_croft.addEventListener('click', function() { loadRegionContent("Stokes Croft")}, false);
  finishButton.addEventListener('click', function() { adventureEndCard.style.display = "block";}, false);
}


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