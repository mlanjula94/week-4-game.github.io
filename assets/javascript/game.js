var jon = '<button id="jon" name="Jon Snow" hero=false class="enemy float-left bg-dark text-white text-center">';
var jon_img = '<img class="img-fluid img" src="assets/images/jon.jpg" alt="Jon Snow">';

var jamie = '<button id="jamie" name="Jamie Lannister" hero=false class="enemy float-left bg-dark text-white text-center">';
var jamie_img = '<img class="img-fluid img" src="assets/images/jamie.jpg" alt="Jamie">';

var khal = '<button id="khal" name="Khal Drogo" hero=false class="enemy float-left bg-dark text-white text-center">';
var khal_img = '<img class="img-fluid img" src="assets/images/khal.jpg" alt="Khal Drogo">';

var hound = '<button id="hound" name="The Hound" hero=false class="enemy float-left bg-dark text-white text-center">';
var hound_img = '<img class="img-fluid img" src="assets/images/hound.jpeg" alt="The hound">';

var brienne = '<button id="brienne" name="Brienne of Tarth" hero=false class="enemy float-left bg-dark text-white text-center">';
var brienne_img = '<img class="img-fluid img" src="assets/images/brienne.jpg" alt="Brienne">'

var ed = '<button id="ed" name="Ed Sheran" hero=false class="enemy float-left bg-dark text-white text-center">';
var ed_img = '<img class="img-fluid img" src="assets/images/ed.jpg" alt="Mountain">';

var mountain = ' <button id="mountain" name="The Mountain" hero=false class="enemy float-left bg-dark text-white text-center">';
var mountain_img = '<img class="img-fluid img" src="assets/images/moutain.jpg" alt="Mountain">';

var characters = [{
        code: jon,
        name: "Jon Snow",
        Power: 130,
        image: jon_img,
        enemy: false
    },
    {
        code: jamie,
        name: "Jamie Lannister",
        Power: 120,
        enemy: false,
        image: jamie_img
    },
    {
        code: khal,
        name: "Khal Drogo",
        Power: 150,
        enemy: false,
        image: khal_img
    },
    {
        code: hound,
        name: "The Hound",
        Power: 135,
        enemy: false,
        image: hound_img
    },
    {
        code: brienne,
        name: "Brienne of Tarth",
        Power: 140,
        enemy: false,
        image: brienne_img
    },
    {
        code: ed,
        name: "Ed Sheran",
        Power: 10,
        enemy: false,
        image: ed_img
    },
    {
        code: mountain,
        name: "The Mountain",
        Power: 180,
        enemy: false,
        image: mountain_img
    }
];

var charaterSelected = false; //flag to tell if a character is selected
var defenderSelected = false;
var user;
var computer;
var row= '<div class="row">';

$(".character").on("click", function () {
    if (charaterSelected === false) {
        charaterSelected = true; //FLAG! letting the program know that the user selected a character
        $("#character-text").text("You chose " + $(this).attr("name")); //Display in text the charcter chosen by the user
        $("#character").css("display", "none"); //hiding the list of characters when user picks a character
        hero($(this).attr("name")); //calling the hero function
    }

    $(".enemy").on("click", function () {
        console.log("test");
        if (defenderSelected === false) {
            defenderSelected = true; //FLAG! letting the program know that the user selected a defender
            defender($(this).attr("name")); //calling the hero function
        }
    });
});

$("#fight").on("click", function () {
    var initialUserPower = user.Power;
    var initianlComputerPower = computer.Power;
    computer.Power -= Math.floor(Math.random() * initialUserPower);
    user.Power -= Math.floor(Math.random() * initianlComputerPower);
   
    console.log(computer.Power +" "+ user.Power)
    var htmlHero = user.code + '<div>' + user.name + '</div>' +
                user.image +
                '<div class="strength">' + user.Power + '</div> </button>';
            $(".hero").html(htmlHero); //hero code is written in hero class

    var htmlDefender = computer.code + '<div>' + computer.name + '</div>' +
            computer.image +
            '<div class="strength">' + computer.Power + '</div> </button>';
        $(".defender").html(htmlDefender); //defender code is written in hero class
    
    if(user.Power <= 0){
        $("#character-text").text("You lost"); //Display in text the charcter chosen by the user
    }
    else if (computer.Power<= 0){
        $(".defender").append("You have beaten the fighter.Select a another defender.");
        var defenderSelected = false;

        $(".enemy").on("click", function () {
            console.log("test");
            if (defenderSelected === false) {
                defenderSelected = true; //FLAG! letting the program know that the user selected a defender
                defender($(this).attr("name")); //calling the defender function
            }
        });
    }
});

function hero(name) {
    var html; //html variable to save the inner html code
    for (var i = 0; i < characters.length; i++) { //For loop to go thru the list characters
        if (name === characters[i].name) {
            html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                characters[i].image +
                '<div class="strength">' + characters[i].Power + '</div> </button>';
            $(".hero").html(html); //hero code is written in hero class
            user = characters[i];
        } else {
            characters[i].enemy = true; //if not selected by the user makes them an enemy
            html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                characters[i].image +
                '<div class="strength">' + characters[i].Power + '</div> </button>';
            $(".enemies").append(html); //enemies are added to enemies class
        }
    }
}

function defender(name) {
    $(".enemies").empty();
    var html; //html variable to save the inner html code
    $(".enemies").append(row);
  
    for (var i = 0; i < characters.length; i++) { //For loop to go thru the list characters
        if (name === characters[i].name) {
            characters[i].enemy = false;
            html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                characters[i].image +
                '<div class="strength">' + characters[i].Power + '</div> </button>';
            $(".defender").html(html); //defender code is written in hero class
            computer = characters[i];

            $(".fightSec").css("visibility","visible");
            
        } else {

            if (characters[i].enemy === true) {
                html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                    characters[i].image +
                    '<div class="strength">' + characters[i].Power + '</div> </button>';
                $(".enemies").append(html); //enemies are added to enemies class

                $(".fightBtn").html('<div class="h3 ">Fight Section </div>'+
                '                       <button id="fight" type="button" class="ml-5 btn btn-warning">Fight</button>')
            }
        }
    }
    $(".enemies").append('</div>');
}