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

