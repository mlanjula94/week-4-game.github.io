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
        Power: 218,
        attack: 13,
        counterAttack: 14,
        image: jon_img,
        inCharacter: false
    },
    {
        code: jamie,
        name: "Jamie Lannister",
        Power: 208,
        attack: 10,
        counterAttack: 15,
        inCharacter: false,
        image: jamie_img
    },
    {
        code: khal,
        name: "Khal Drogo",
        Power: 195,
        attack: 12,
        counterAttack: 12,
        inCharacter: false,
        image: khal_img
    },
    {
        code: hound,
        name: "The Hound",
        Power: 205,
        attack: 12,
        counterAttack: 16,
        inCharacter: false,
        image: hound_img
    },
    {
        code: brienne,
        name: "Brienne of Tarth",
        Power: 200,
        attack: 13,
        counterAttack: 16,
        inCharacter: false,
        image: brienne_img
    },
    {
        code: ed,
        name: "Ed Sheran",
        Power: 10,
        attack: 15,
        counterAttack: 10,
        inCharacter: false,
        image: ed_img
    },
    {
        code: mountain,
        name: "The Mountain",
        Power: 210,
        attack: 8,
        counterAttack: 18,
        inCharacter: false,
        image: mountain_img
    }
];

var charaterSelected = false; //flag to tell if a character is selected
var defenderSelected = false;
var lost = false;
var user;
var computer;
var row = '<div class="row">';
var attackTimes = 1;
var wins = 0;

$(".character").on("click", function () {
    if (charaterSelected === false) {
        charaterSelected = true; //FLAG! letting the program know that the user selected a character

        $("#character-text").text("You chose " + $(this).attr("name")); //Display in text the charcter chosen by the user
        $("#character").css("display", "none"); //hiding the list of characters when user picks a character
        hero($(this).attr("name")); //calling the hero function
    }

    $(".enemy").on("click", function () {
        if (defenderSelected === false) {
            lost = false;
            defenderSelected = true; //FLAG! letting the program know that the user selected a defender
            defender($(this).attr("name")); //calling the hero function
        }
    });
});

$("#fight").on("click", function () {
    var initialUserPower = user.Power;
    var initianlComputerPower = computer.Power;

    if (lost === false) {
        computer.Power -= user.attack * attackTimes;
        user.Power -= computer.counterAttack;
        attackTimes++;

        var htmlHero = user.code + '<div>' + user.name + '</div>' +
            user.image +
            '<div class="strength">' + user.Power + '</div> </button>';
        $(".hero").html(htmlHero); //hero code is written in hero class

        var htmlDefender = computer.code + '<div>' + computer.name + '</div>' +
            computer.image +
            '<div class="strength">' + computer.Power + '</div> </button>';
        $(".defender").html(htmlDefender); //defender code is written in hero class

        if (user.Power <= 0) {
            lost = true;
            $("#character-text").text("You lost. Click reset."); //Display in text the charcter chosen by the user
            $(".defender").html("<p class='h2 text-center bg-danger text-white'>Game Over!</p>");
            hideFight();
        } else if (computer.Power <= 0) {
            lost = true;
            wins++;
            console.log(wins);
            if (wins === characters.length - 1) {
                $("#character-text").text("You Won!");
                $(".defender").html("<img src='assets/images/throne.jpg' attr=throne height=160px width=225px />" +
                    "<p class='h2 text-center bg-success text-white'>Throne is yours</p>");
                hideFight();
            } else {
                $(".defender").html("You have beaten the fighter.Select a another defender.");
                var defenderSelected = false;
            }

            $(".enemy").on("click", function () {
                lost = false;
                if (defenderSelected === false) {
                    defenderSelected = true; //FLAG! letting the program know that the user selected a defender
                    defender($(this).attr("name")); //calling the defender function
                }
            });
        }
    }
});

function hideFight() {
    $(".fightBtnSec").css("visibility", "hidden");
}

function wonAll() {
    return characters.inCharacter === true;
}

$("#rest").on("click", function () {
    location.href = 'index.html'
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
            characters[i].inCharacter = true; //if not selected by the user makes them an inCharacter
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
            characters[i].inCharacter = false;
            html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                characters[i].image +
                '<div class="strength">' + characters[i].Power + '</div> </button>';
            $(".defender").html(html); //defender code is written in hero class
            computer = characters[i];

            $(".fightSec").css("visibility", "visible");

        } else {

            if (characters[i].inCharacter === true) {
                html = characters[i].code + '<div>' + characters[i].name + '</div>' +
                    characters[i].image +
                    '<div class="strength">' + characters[i].Power + '</div> </button>';
                $(".enemies").append(html); //enemies are added to enemies class

                $(".fightBtn").html('<div class="h3 ">Fight Section </div>' +
                    '<button id="fight" type="button" class="ml-5 btn btn-warning">Fight</button>')
            }
        }
    }
    $(".enemies").append('</div>');
}