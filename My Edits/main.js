var map;


function createMap(long,latt) {
    // The location of Miami//
    var world = {lat: parseFloat(latt), lng: parseFloat(long) };
    // The map, centered at Miami//
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: {lat: latt, lng: long }});
    // The marker, positioned at Miami//
    var marker = new google.maps.Marker({position: world, map: map});
}


function Location (location) {
    var googlemaps = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBbxB1MpsCcOhzGs_uZQKFlUWw4EXugmiE&address=" + location;
    $.ajax({
        url: googlemaps,
        method: "GET"
    }).then(function(response) {


    var long = response.results[0].geometry.location.lng;
    var lat = response.results[0].geometry.location.lat;

createMap(long, lat);
}
)}

