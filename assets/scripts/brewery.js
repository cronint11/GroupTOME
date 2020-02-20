// Hard coding city for now.
//var cityName = "miami";
var breweryObjects;

function randomByCity(city) {
  var cityName = city;
  var beerByCityURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;
  makeAjaxRequest(beerByCityURL, renderResults);
};

// REFER TO https://api.eventful.com/docs/events/search
function beerEvents(city) {
  var cityName = city;
  var eventFulURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?keywords=beer&t=Next+30+Days&include=links&app_key=dSgcPNSbCFTGkjzg&location=" + cityName;
  makeAjaxRequest(eventFulURL, renderResults);
}

function renderResults(result) {

    if (searchType === "events") {
    breweryObjects = JSON.parse(result).events.event;
  }
  else if (searchType === "breweries") {
    breweryObjects = result;
  }
  // DEBUG
  // console.log(breweryObjects);
  $('tbody').empty(); // Clear the table if populated.

  for (i = 0; i < breweryObjects.length; i++) {
    var editBtn = $("<a>").attr({
      class: "editBtn Btn d-inline text-muted",
      href: "#",
      type: "button",
      'data-toggle': "modal",
      'data-target': "#breweryDetail"
    });
    editBtn.data({
      'index': i
    });
    var editIcon = $('<i>').addClass("far fa-edit p-1");
    editBtn.append(editIcon);

    var infoBtn = $("<a>").attr({
      class: "detailBtn Btn d-inline text-muted",
      href: "#",
      type: "button",
      'data-target': "#breweryDetail"
    });
    var infoIcon = $('<i>').addClass("fas fa-info-circle");

    infoBtn.data({
      'index': i
    });
    infoBtn.append(infoIcon);

    var buttonCol = $('<td>').attr({
      style: "width:7%; text-align: center",
      class: "col align-center"
    });
    buttonCol.append(infoBtn); //, editBtn)
    var tableRow = $("<tr>").attr("data-row", i);
    tableRow.addClass("breweryRow");

    // Build the table
    tableRow.append(buttonCol);

    if (searchType === "breweries") {
      var name = breweryObjects[i].name;
      var detail = formatPhone(breweryObjects[i].phone);
    }
    else if (searchType === "events") {
      var name = breweryObjects[i].title;
      var detail = moment(breweryObjects[i].start_time).format("MMM Do, YYYY");
    }
    tableRow.append('<td style="width: 50%; text-align: left" class="col">' + name + '</td>');
    tableRow.append('<td style="width: 43%; text-align: center" class="col">' + detail + '</td>');
    $('tbody').append(tableRow);
  }
};


function checkLocal() {
  breweryObjects = JSON.parse(localStorage.getItem("Brewery-"));
  if (breweryObjects === null) {
    return null;
  }
  else {
    return breweryObjects;
  }
};


function writeLocal(brewID, brewObject) {
  localStorage.setItem("Brewery-" + brewID, JSON.stringify(brewObject));
};


$(document).on("click", ".detailBtn", function () {
  var index = $(this).data("index");
  
if (searchType === "breweries"){
  //TODO: Since we are no longer using this modal, perhaps consider to clean this code up.
  $('.modal-body').empty();
  $('#breweryDetailLongTitle').text(breweryObjects[index].name);
  $('.modal-body').append(breweryObjects[index].street);
  $('.modal-body').append("<br>" + breweryObjects[index].city);
  $('.modal-body').append(", " + breweryObjects[index].state);
  $('.modal-body').append(", " + breweryObjects[index].postal_code);
  if (breweryObjects[index].website_url) {
    $("<a>").attr("href", breweryObjects[index].website_url).text(breweryObjects[index].website_url).appendTo($('.modal-body').append("<br>"));
  }
  $("#breweryInfo").html("<b>" + breweryObjects[index].name + "</b><br>" + $('.modal-body').html());
  Location(breweryObjects[index].name.trim() + breweryObjects[index].street.trim() + breweryObjects[index].postal_code);
}
else if (searchType === "events"){
  $('#breweryInfo').html("<b>" + breweryObjects[index].title + "</b>");
  $('#breweryInfo').append("<br>" + breweryObjects[index].venue_name)
  if (breweryObjects[index].url) {
    $("<a>").attr({
    "href": breweryObjects[index].url,
    "target": "_blank"
  }).text("Event Details").appendTo($('#breweryInfo').append("<br>"));
  }
  if (breweryObjects[index].links){
    $("<a>").attr({
      "href": breweryObjects[index].links.link[0].url,
      "target": "_blank"
    }).text("Register/Buy Tickets").appendTo($('#breweryInfo').append("<br>"));
  }
  Location(breweryObjects[index].venue_name.trim() + breweryObjects[index].venue_address.trim() );
}

$("#breweryInfo").css("display","block");

});

$(document).on("click", ".editBtn", function () {

  var index = $(this).data("index");
  var brewNotes = $('<textarea>').attr({
    class: "",
    id: "brewNotesText",
    placeholder: "Tasting Notes/Would Come Back",
    rows: "5",
    cols: "50",
    style: "border:solid 1px"
  });


  $('.modal-body').empty();
  $('#breweryDetailLongTitle').text(breweryObjects[index].name);
  $('.modal-body').append("<span class='align-top'>Beer / Brewery Review:</span>");
  $('.modal-body').append(brewNotes);


  // Call map function 

});

$('#thirstyBtn').on("click", function () {
  // This will be the ID's for the input.
  $('#breweryInfo').empty();
  $('#map').empty();
  var cityName = $('#location').val();
  searchType = getSearchType();

  if (searchType === "breweries") {
    if (!cityName) {
      cityName = "Miami";
    }
    randomByCity(cityName);
    updateHeaders(searchType);
  }
  else if (searchType === "events") {
    if (!cityName) {
      cityName = "Miami";
    }
    beerEvents(cityName);
    updateHeaders(searchType);
  }

  $("#breweryInfo").css("display","none");
})

//Used to ignore input, hardcode search
//randomByCity("miami");