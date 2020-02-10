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



function formatPhone (number) {
  if (number.length == 7) {
    number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
  } else if (number.length == 10) {
    number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (number.length > 10) {
    number = number.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "($2) $3-$4");
  }
  return number;
};

function renderResults (result) {
  // store the results globally to be used elsewhere and local storage if needed.
  breweryObjects = result;
  for (i = 0; i < breweryObjects.length; i++) {
    
      var tableRow = $("<tr>");
      tableRow.append('<td style="width: 10%; text-align: center" class="col"><button class="detailBtn Btn" type="button" data-toggle="modal" data-index=' + [i] + ' data-target="#breweryDetail"><i class="fas fa-info-circle"></i></button></td>');
      tableRow.append('<td style="width: 50%; text-align: left" class="col">' + breweryObjects[i].name + '</td>');
      var phone = formatPhone(breweryObjects[i].phone);
      tableRow.append('<td style="width: 40%; text-align: center" class="col">' + phone + '</td>');
      $('tbody').append(tableRow);
      
    }
  // DEBUG   
  consolelogResults(result)
};



// DEBUG FUNCTION TO CONSOLE LOG ANYTHING
function consolelogResults (result) {
   console.log(result);
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
});

$('#thriftyBtn').on("click", function(){
// This will be the ID's for the input.
var cityName = $('#searchCity').val();
randomByCity(cityName);

})

//Used to ignore input, hardcode search
//randomByCity("miami");