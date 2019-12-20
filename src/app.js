let React = require('react');
let ReactDOM = require('react-dom');
let Sidebar = require('./components/Sidebar');
const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bpa2UtbWFkZGVuIiwiYSI6ImNqNnM0cnRrcDBqNDAzMnBid3dtem1wcXgifQ.2advMY_wpO8eu24eg6OeOQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.662805, 45.512230],
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
    html += i <= rating ? '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="orange" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>' : '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#aaa" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>'
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
