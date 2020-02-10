var map;

function createMap () {
    var options = {
       center: { lat: 25.800254, lng: -80.2009170923563 },
       zoom: 12,
    };

    map = new google.maps.Map(document.getElementById('map'), options);

}

