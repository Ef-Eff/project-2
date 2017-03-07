'use strict';

/* global google:true */

console.log('hey ho');

function initMap() {

  var lat = -33.868;
  var lng = 151.2195;

  if ($('[name=lat]').val()) {
    lat = parseFloat($('[name=lat]').val());
    lng = parseFloat($('[name=lng]').val());
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 17
  });

  var input = document.getElementById('input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    if (!place.geometry) {
      window.alert('No details available for input: "' + place.name + '"');
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }

    $('[name=lat]').val(lat);
    $('[name=lng]').val(lng);
  });
}

if ($('#map')) initMap();