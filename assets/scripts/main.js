var map;

function createMap () {
    var options = {
       center: { lat: 25.800254, lng: -80.2009170923563 },
       zoom: 12,
    };

    map = new google.maps.Map(document.getElementById('map'), options);

}
  
function displayAPIStuff(a,b,c,d) {
/* Comments Here
  describe a,b,c,d etc...
  Name of 

*/
};

function getAPIStuff(){
  makeAjaxRequest(URL, function (response) {
    // get something a,b,c,d
    displayAPIStuff(a,b,c,d);
  })
}

function makeAjaxRequest(url, callback) {
  $.ajax (
    {
      url: url,
      method: "GET"

    }).then(function(response){
      
      callback(response);
    })
};

