// var slider = document.getElementById("slider");
// var output = document.getElementById("slider");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

// var myJson={
//     "BreweryName": "Current Brewery",
//     "BeerNotes": [{
//         "Name": "Beer1",
//         "ABV": 4.5,
//         "IBU": 28,
//         "Style": "lager",
//         "Notes": "Light on the tongue with some citrus notes",
//         "Rating": 4.5 
//         },{
//         "Name": "Beer2",
//         "ABV": 5.2,
//         "IBU": 33,
//         "Style": "stout",
//         "Notes": "Bold up front but thin on the back end",
//         "Rating": 2.5
//         },{
//         "Name": "Beer3",
//         "ABV": 6.7,
//         "IBU": 78,
//         "Style": "IPA!",
//         "Notes": "Everything I want from a beer! Sharp and flavorful.",
//         "Rating": 4.8
//         }
//     ]
// };

// console.log(myJson);

// $("#brewery").text(myJson.BreweryName);
// for (var i=0; i<myJson.BeerNotes.length; i++){
//     $(".row").html("<input id='beername"+i+"' value='"+myJson.BeerNotes[i].Name+"'>");
//      break;
//     //code to create a row for myJSON.BeerNotes[i]
//     }
//     //code to add a blank row


var myNavs = ['search','notes','history','settings'];
$('.navButton').on('click', function (){
    myNavs.forEach(element => {
        if(element+'Tab'==$(this).attr('id')) {
            if(!$(this).hasClass('activeNav')) {
                $(this).removeClass('inactiveNav');
                $(this).addClass('activeNav');
                $('#'+element+'Div').css('display','block');
                LoadDiv(element);
            }
        } else {
            if($('#'+element+'Tab').hasClass('activeNav')){
                $('#'+element+'Tab').removeClass('activeNav');
                $('#'+element+'Tab').addClass('inactiveNav');
            }
            $('#'+element+'Div').css('display','none');
        }
    });
});

function LoadDiv(divName) {
    if (divName == 'notes') {
        LoadNotes();
    } else if (divName == 'history') {
        LoadHistory();
    } else if (divName == 'settings') {
        LoadSettings();
    }
}

function LoadNotes() {
    $('#notesDiv').html($('#breweryInfo').html());
}

function LoadHistory() {}
function LoadSettings() {}

function LoadCSS() {
   var width = window.innerWidth;
   var fontSize = width/36;
   $('body').css('background-size', width+'px '+window.innerHeight+'px');
   $('#params').css('font-size', fontSize+'px');
   $('#results').css('font-size', fontSize+'px');
}

LoadCSS();

$(window).resize(function(){
   LoadCSS();
});