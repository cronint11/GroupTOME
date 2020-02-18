/*  
  Generic Functions from template
*/
​
var searchType;
​
function makeAjaxRequest(url, callback) {
  $.ajax (
    {
      url: url,
      method: "GET",
      // this headers section is necessary for CORS-anywhere
      headers: {
        "x-requested-with": "xhr" 
      }
    }).then(function(response){
      callback(response);
    }).fail(function(jqXHR, textStatus) { 
      console.error(textStatus)
    })
};
​
/*  
  Carlos's Code Starts Here
*/
​
// DEBUG FUNCTION TO CONSOLE LOG ANYTHING
function consolelogResults (result) {
  console.log(result);
};
​
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
​
​
function getSearchType() {
  var type = $('input[name=searchType]:checked').val();
  return type;
}
​
function updateHeaders() {
  
  if(searchType === "breweries") {
    $('th:nth-child(2)').text("Brewery");
    $('th:nth-child(3)').text("Phone");
  } 
  else if (searchType === "events")
  {
    $('th:nth-child(2)').text("Event Description");
    $('th:nth-child(3)').text("Date");
  }
}
​
​
$('input[name=searchType]').on("click", function(){
  var selected = $(this).attr('id');
​
  // Changes the button text.
  if (selected === "breweries") {
    $('#thirstyBtn').text("Im thirsty!");
    searchType = selected;
  } 
  else if (selected === "events")
  {
    $('#thirstyBtn').text("Where's the fun!"); 
    searchType = selected;
  }
​
  // Updates headers only if nothing in table.
  if ($('tbody > tr').length < 1) {
    updateHeaders();
  }
})
/*  
  Carlos's Code Ends Here
*/