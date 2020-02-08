
// Hard coding city for now.
var cityName = "miami";

// This will be the ID's for the input.
// var cityName = $('#citySearch').val();



var breweryObjects ;


function randomByCity (city) {
  var cityName = city;
  var beerByCityURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

  makeAjaxRequest(beerByCityURL, renderResults );

};


function renderResults (result) {

  breweryObjects = result;
  for (i = 0; i < breweryObjects.length; i++) {
    
      var p = $('<p>');
      var link = $('<a>').attr("href", breweryObjects[i].website_url);
      $(link).text("Name: " + breweryObjects[i].name);
      $(p).append(link);
      $('body').append(p);
    }
 
  consolelogResults(result)
}


// DEBUG FUNCTION TO CONSOLE LOG ANYTHING
function consolelogResults (result) {
  
  console.log(result);
};

randomByCity("miami");