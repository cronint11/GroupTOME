// var slider = document.getElementById("slider");
// var output = document.getElementById("slider");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

var myJson= {
    "BreweryName": "Biscayne Bay Brewery",
    "BeerNotes": [{
        "Name": "Beer1",
        "ABV": 4.5,
        "IBU": 28,
        "Style": "lager",
        "Notes": "Light on the tongue with some citrus notes",
        "Rating": 4.5 
        },{
        "Name": "Beer2",
        "ABV": 5.2,
        "IBU": 33,
        "Style": "stout",
        "Notes": "Bold up front but thin on the back end",
        "Rating": 2.5
        },{
        "Name": "Beer3",
        "ABV": 6.7,
        "IBU": 78,
        "Style": "IPA!",
        "Notes": "Everything I want from a beer! Sharp and flavorful.",
        "Rating": 4.8
        }
    ]
}
console.log(myJson);

$("#brewery").text(myJson.BreweryName);