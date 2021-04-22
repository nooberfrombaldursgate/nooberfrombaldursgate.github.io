//GeoJS start
var mymap = L.map('mapid').setView([56.149375, 10.213509], 11);

L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

// fetch('https://webkort.aarhuskommune.dk/spatialmap?page=get_geojson_opendata&datasource=fitness_i_det_fri_friluftsliv_aarhus')
// fetch('https://admin.opendata.dk/dataset/6a7f7691-5f5a-44e1-b03b-d80cbd9657e4/resource/4a15576a-5622-4d40-99ff-6393738b88bf/download/arragenemter.geojson')
// fetch('https://admin.opendata.dk/dataset/2d5e2ffa-2341-4b32-876f-73b1df1ffa04/resource/3ace0e47-46a7-4ab8-9d7a-2da81fff641f/download/kioskerwgs84.json')
// fetch('https://webkort.aarhuskommune.dk/spatialmap?page=get_geojson_opendata&datasource=betalingspomrveje')

var myLayer = L.geoJSON().addTo(mymap);

fetch('https://api.jsonbin.io/b/6080bd869a9aa93333549d61')
  .then(function (data) {
    return data.json();
  })
  .then(function (post) {
    var geojsonFeatures = post.features;
    console.log(geojsonFeatures);
    geojsonFeatures.forEach(element => myLayer.addData(element));
    // console.log(post);
    // var geojsonFeature = post;
    
    // features.forEach(element => console.log(element));
    
  })
  .catch(function (error) {
    console.log(error);
  });

//GeoJS end
