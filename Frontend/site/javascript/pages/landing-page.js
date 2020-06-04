var homepage_map_container = document.getElementById("landing-page-hero__map-container");

if (homepage_map_container){
  var latitude = 51.453749;
  var longitude = -2.591873;
  var homepage_map = L.map('landing-page-hero__map-container', { zoomControl: false }).setView([latitude, longitude], 14);

  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
  }).addTo(homepage_map);
}

function loadRegionContent(region){
  console.log(region);
}

var region_arnos_vale = document.getElementById("interactive-map--arnos-vale");
var region_temple_meads = document.getElementById("interactive-map--temple-meads");
var region_southville = document.getElementById("interactive-map--southville");
var region_harbourside = document.getElementById("interactive-map--harbourside");
var region_city_centre = document.getElementById("interactive-map--city-centre");
var region_clifton = document.getElementById("interactive-map--clifton");
var region_stokes_croft = document.getElementById("interactive-map--stokes-croft");

region_arnos_vale.addEventListener('click', function() { loadRegionContent("Arnos Vale")}, false);
region_temple_meads.addEventListener('click', function() { loadRegionContent("Temple Meads")}, false);
region_southville.addEventListener('click', function() { loadRegionContent("Southville")}, false);
region_harbourside.addEventListener('click', function() { loadRegionContent("Harbourside")}, false);
region_city_centre.addEventListener('click', function() { loadRegionContent("City Centre")}, false);
region_clifton.addEventListener('click', function() { loadRegionContent("Clifton")}, false);
region_stokes_croft.addEventListener('click', function() { loadRegionContent("Stokes Croft")}, false);

