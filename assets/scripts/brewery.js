// Hard coding city for now.
//var cityName = "miami";
var breweryObjects ;




function randomByCity (city) {
  var cityName = city;
  var beerByCityURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;
  makeAjaxRequest(beerByCityURL, renderResults );
};


// REFER TO https://api.eventful.com/docs/events/search
function beerEvents (city) {
  var cityName = city;
  var eventFulURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?keywords=beer&app_key=dSgcPNSbCFTGkjzg&location=" + cityName;
  makeAjaxRequest(eventFulURL, consolelogResults );
}


function renderResults (result) {
  // store the results globally to be used elsewhere and local storage if needed.
  breweryObjects = result;
  for (i = 0; i < breweryObjects.length; i++) {
    
      var tableRow = $("<tr>");
      tableRow.append('<td style="width: 10%; text-align: center" class="col"><button class="detailBtn Btn" type="button"' 
      // data-toggle="modal"
      +' data-index=' + [i] + ' data-target="#breweryDetail"><i class="fas fa-info-circle"></i></button><button class="editBtn Btn d-flex" type="button" data-toggle="modal" data-index=' + [i] + '><i class="far fa-edit"></i></button></td>');

      tableRow.append('<td style="width: 50%; text-align: left" class="col">' + breweryObjects[i].name + '</td>');
      var phone = formatPhone(breweryObjects[i].phone);
      tableRow.append('<td style="width: 40%; text-align: center" class="col">' + phone + '</td>');
      $('tbody').append(tableRow);
      beerEvents("miami")
    }
  // DEBUG   
  consolelogResults(result)
};


function checkLocal() {
  breweryObjects = JSON.parse(localStorage.getItem("Brewery-"));
  if (breweryObjects === null){
    return null;   
  } 
  else {
    return breweryObjects;
  }
};


function writeLocal (brewID, brewObject) {
  localStorage.setItem("Brewery-" + brewID , JSON.stringify(brewObject));
};

$(document).on("click", ".detailBtn", function(){
  var index = $(this).attr("data-index");  
 
  $('.modal-body').empty();
  $('#breweryDetailLongTitle').text(breweryObjects[index].name);
  $('.modal-body').append(breweryObjects[index].street);
  $('.modal-body').append("<br>" + breweryObjects[index].city);
  $('.modal-body').append(", " + breweryObjects[index].state);
  $('.modal-body').append(", " + breweryObjects[index].postal_code);
  if(breweryObjects[index].website_url){
  $("<a>").attr("href", breweryObjects[index].website_url).text(breweryObjects[index].website_url).appendTo($('.modal-body').append("<br>"));
  }

  $("#breweryInfo").html("<h4>"+breweryObjects[index].name+"</h4>"+$('.modal-body').html());
});

$('#thirstyBtn').on("click", function(){
// This will be the ID's for the input.
var cityName = $('#searchCity').val();
if (cityName) {
  randomByCity(cityName);
} else {
  randomByCity("Miami");
}

})

//Used to ignore input, hardcode search
//randomByCity("miami");