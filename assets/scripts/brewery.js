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
  $('tbody').empty();
  for (i = 0; i < breweryObjects.length; i++) {
    
      var editBtn = $("<a>").attr({
        class:"editBtn Btn d-inline text-muted",
        href:"#",
        type:"button",
        'data-toggle': "modal",
        'data-target': "#breweryDetail"
        });
      editBtn.data({
          'index': i
        });
      var editIcon = $('<i>').addClass("far fa-edit p-1");
      editBtn.append(editIcon);
      
      var infoBtn = $("<a>").attr({
        class:"detailBtn Btn d-inline text-muted",
        href:"#",
        type:"button",
        'data-target': "#breweryDetail"
        });
      var infoIcon = $('<i>').addClass("fas fa-info-circle");

      infoBtn.data({
          'index': i
        });
      infoBtn.append(infoIcon);

      var buttonCol = $('<td>').attr({
        style:"width:20%; text-align: center",
        class:"col align-center "
      });
      buttonCol.append(infoBtn, editBtn)
      var tableRow = $("<tr>").attr("data-row", i);
      tableRow.addClass("breweryRow");
 
      tableRow.append(buttonCol);

      tableRow.append('<td style="width: 50%; text-align: left" class="col">' + breweryObjects[i].name + '</td>');
      var phone = formatPhone(breweryObjects[i].phone);
      tableRow.append('<td style="width: 40%; text-align: center" class="col">' + phone + '</td>');
      $('tbody').append(tableRow);
      //beerEvents("miami")
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
  var index = $(this).data("index");  

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

$(document).on("click", ".editBtn", function(){

  var index = $(this).data("index"); 
  var brewNotes = $('<textarea>').attr({
    class: "",
    id: "brewNotesText",
    placeholder: "Tasting Notes/Would Come Back",
    rows:"5",
    cols:"50",
    style:"border:solid 1px"
  });
  

  $('.modal-body').empty();
  $('#breweryDetailLongTitle').text(breweryObjects[index].name);
  $('.modal-body').append("<span class='align-top'>Beer / Brewery Review:</span>");
  $('.modal-body').append(brewNotes);


  // Call map function 

});

$('#thirstyBtn').on("click", function(){
// This will be the ID's for the input.
var cityName = $('#searchCity').val();

if(!cityName){
  cityName = "Miami";
}
randomByCity(cityName);

})

//Used to ignore input, hardcode search
//randomByCity("miami");