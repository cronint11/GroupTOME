/*  
  Generic Functions from template
*/
function displayAPIStuff(a,b,c,d) {
/* Comments Here
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

/*  
  Carlos's Code Starts Here
*/

// DEBUG FUNCTION TO CONSOLE LOG ANYTHING
function consolelogResults (result) {
  console.log(result);
};

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

/*  
  Carlos's Code Ends Here
*/