let React = require('react');
let ReactDOM = require('react-dom');
let Sidebar = require('./components/Sidebar');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bpa2UtbWFkZGVuIiwiYSI6ImNqNnM0cnRrcDBqNDAzMnBid3dtem1wcXgifQ.2advMY_wpO8eu24eg6OeOQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.6675, 45.5230],
  zoom: 13
});

map.on('load', () => {
  ReactDOM.render(
    <Sidebar map={map} />,
    document.getElementById('sidebar')
  );
});

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));


function format_html_marker (props) {
  let { name, address, rating, url } = props;
  let html = '<div class="marker-title">' + name + '</div>' +
        '<h4>Address</h4>' +
        '<span>' + address + '</span>' +
        '<h4>Rating</h4>' +
        convertRatingToHTML(rating) +
        '<h4>More Information</h4>' +
        '<span>' + '<a href="' + url + '" target=yelp>Website</a>' + '</span>';

  return html;
}

function convertRatingToHTML(rating) {
  let html = '';
  rating = Math.ceil(rating);
  for (let i = 1; i <= 5; i++) {
    html += i <= rating ? '<span class="fa fa-star checked"></span>' : '<span class="fa fa-star"></span>'
  }
  return html
}

export function addPopupToMap (feature) {
  return new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(format_html_marker(feature.properties))
    .addTo(map);
}

// popup for marker
map.on('click', 'carts', function (e) {
  module.exports.addPopupToMap(e.features[0]);
});

map.on('click', 'carts-highlight', function (e) {
  module.exports.addPopupToMap(e.features[0]);
});

// change the cursor to a pointer when the mouse is over the carts layer.
map.on('mouseenter', 'carts', function () {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseenter', 'carts-highlight', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// change it back to a pointer when it leaves.
map.on('mouseleave', 'carts', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseleave', 'carts-highlight', function () {
  map.getCanvas().style.cursor = '';
});
