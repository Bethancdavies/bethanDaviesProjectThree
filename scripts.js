// set up variables, arrays and name object
const santaApp = {};
santaApp.Array = [];
santaApp.ArrayS = [];
// randmoized function to ensure that the length of the list is shuffled, added variable "attempts" in the for loop is to ensure no endless iteration, index numbers are assigned and using "i" are double checked to ensure no one has themselves, this is then pushed onto array

function randomize() {
    santaApp.ArrayS = [];
    for (let i = 0; i < santaApp.Array.length; i++) {
        let randomIndex = -1;
        let attempts = 0;
        while (
            randomIndex == -1 ||
            randomIndex == i ||
            santaApp.ArrayS.indexOf(santaApp.Array[randomIndex]) != -1
        ) {
            randomIndex = Math.floor(Math.random() * santaApp.Array.length);
            attempts++;
            if (attempts >= santaApp.Array.length) {
                randomize();
                return;
            }
        }
        santaApp.ArrayS.push(santaApp.Array[randomIndex]);
    }
}

// functions below append the arrays onto the page 
santaApp.init = function () {
    $(".inputtedNames").on("submit", function (event) {
        event.preventDefault();
        const inputtedName = $("input").val();
        if (inputtedName !== "") {
            $(".namesEntered").empty();
            santaApp.Array.push(inputtedName);
            console.log(santaApp.Array);
            santaApp.Array.forEach(function (element, index) {
                $(".namesEntered").append(`<li id=${index}>${element}</li>`);
            });

            $("input").val("");
        }
    });

    $("#randomize").on("click", function () {
        santaApp.Array.forEach(name => {
            $(".namesEnteredList").append(`<li>${name}</li>`);
        });
        randomize();
        $("html,body").animate({
                scrollTop: $(".secretSanta").offset().top
            },
            "slow"
        );
        snowStorm.start();
        // imported js library for snowstorm effect
        santaApp.ArrayS.forEach(name => {
            $(".namesRandomized").append(`<li>${name}</li>`);
        });
    });
    $("ul").on("click", "li", function (e) {
        santaApp.Array.splice(e.target.id, 1);
        $(".namesEntered").empty();

        santaApp.Array.forEach(function (element, index) {
            $(".namesEntered").append(`<li id=${index}>${element}</li>`);
        });

    });
};
// ^this above bracket is for the entire init function

// keep everything above this point :)
// call init function
$(document).ready(function () {
    santaApp.init();
});
// these brackets end initfunction