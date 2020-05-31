var homepage_map_container = document.getElementById("landing-hero__map-container");

if (homepage_map_container){
  var latitude = 51.453749;
  var longitude = -2.591873;
  var homepage_map = L.map('landing-hero__map-container', { zoomControl: false }).setView([latitude, longitude], 14);

  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
  }).addTo(homepage_map);
}