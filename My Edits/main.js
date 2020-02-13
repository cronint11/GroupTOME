var map;

function createMap () {
    var options = {
       center: { lat: 25.800254, lng: -80.2009170923563 },
       zoom: 12,
    
    };
    var marker = new google.maps.Marker(
        {position: { lat: 25.800254, lng: -80.2009170923563 },
        map: map
        });

    map = new google.maps.Map(document.getElementById('map'), options);
    console.log(options);
}
function Location (name) {
    var googlemaps = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBbxB1MpsCcOhzGs_uZQKFlUWw4EXugmiE&address=" + name;
    makeAjaxRequest(googlemaps, consolelogResults )};

    
 