function renderResults (result) {
  // store the results globally to be used elsewhere and local storage if needed.
  var searchType = getSearchType();

  breweryObjects = result;
  $('tbody').empty();

  if (searchType === "events") {
    $('th:nth-child(2)').text("Event Description");
    $('th:nth-child(3)').text("Date");
  } 
  else if (searchType === "breweries") {
    $('th:nth-child(2)').text("Brewery");
    $('th:nth-child(3)').text("Phone");
  }
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
  
    }
  // DEBUG   
  //consolelogResults(result)
};
