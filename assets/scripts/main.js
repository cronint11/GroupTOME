
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
