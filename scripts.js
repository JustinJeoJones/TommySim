"use strict"
$(document).ready(function () {
    class village {
        constructor() {
            this.name = '';
            this.villagers = [];
            this.wood = 0;
            this.water = 10;
            this.houses = 1;
            this.wells = 0;
            this.day = 0;
            $(".displayWood").html(this.wood);
            $(".displayWater").html(this.water);
            $(".displayHouse").html(this.houses);
            $(".displayWell").html(this.wells);
            $(".displayDrink").html(1);
        }
    }
    let town = new village();
    let turnProtection = 0; //Used to stop everyone from leaving right away
    $(".person").hide();
    $(".stats").hide();
    $(".choices").hide();
    $(".status").hide();
    $(".submitTown").click(function () {
        town.name = $("#town").val();
        if (town.name !=""){
            $(".city").hide();
            $(".person").show();
            $(".townDisplay").html('Welcome to ' + town.name);
        }
        
    })
    $(".submitPerson").click(function () {
        town.villagers.push($("#name").val());
        $(".person").hide();
        let names = "";
        town.villagers.forEach(function (name) {
            names = names + name + ' ';
        })
        $(".displayPeople").html(names);
        $(".displayDrink").html(town.villagers.length);
        $(".stats").show();
        $(".choices").show();
    })
    $(".getWood").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        town.wood = town.wood + 1;
        $(".message").html("You got a wood! You are at " + town.wood + " wood.");
        $(".status").show();
    })
    $(".getWater").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        let random = Math.floor(Math.random() * 4) + 1;
        town.water = town.water + random;
        $(".message").html("You found " + random + " water! You are at " + town.water + " water.");
        $(".status").show();
    })
    $(".getHouse").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        if (town.wood >= 5) {
            town.wood = town.wood - 5;
            town.houses = town.houses + 1;
            $(".message").html("You got a house! You are at " + town.houses + " houses.");
        } else {
            $(".message").html("You do not have enough wood. You have " + town.wood + "/5");
        }
        $(".status").show();
    })
    $(".getWell").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        if (town.wood >= 6) {
            town.wood = town.wood - 6;
            town.wells = town.wells + 1;
            $(".message").html("You got a well! You are at " + town.wells + " wells.");
        } else {
            $(".message").html("You do not have enough wood. You have " + town.wood + "/6");
        }
        $(".status").show();
    })
    $(".getRandom").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        let random = Math.floor(Math.random() * 7) + 1;
        if (random === 1) {
            random = Math.floor(Math.random() * 4) + 1;
            town.wood = town.wood + random;
            $(".message").html("You found " + random + " wood! You are at " + town.wood + " wood.");
        } else if (random === 2) {
            random = Math.floor(Math.random() * 5) + 1;
            town.water = town.water + random;
            $(".message").html("You found " + random + " water! You are at " + town.water + " water.");
        } else if (random === 3 || random === 6 || random === 7) {
            $(".message").html("You found nothing.");
        } else if (random === 4) {
            random = Math.floor(Math.random() * 3) + 1; //wood
            let random2 = Math.floor(Math.random() * 3) + 1; //water
            town.wood = town.wood - random;
            town.water = town.water - random2;
            if (town.water < 0) {
                town.water = 0;
            }
            if (town.wood < 0) {
                town.wood = 0;
            }
            $(".message").html(town.name + " has been raided. You lost " + random + "wood and " + random2 + " water. You are at " + town.wood + " wood and " + town.water + " water.");
        } else if (random === 5) {
            let names;
            let dead = town.villagers.pop();
            $(".message").html("Oh no!" + dead + " got killed by a bear.");
            town.villagers.forEach(function (name) {
                names = names + name + ' ';
            })
            $(".displayPeople").html(names);
        }
        $(".status").show();
    })
    $(".continue").click(function () {
        $(".status").hide();
        town.water = town.water + town.wells - town.villagers.length;
        if (town.water <= 0){
            town.water = 0;
        }
        $(".displayWood").html(town.wood);
        $(".displayWater").html(town.water);
        $(".displayHouse").html(town.houses);
        $(".displayWell").html(town.wells);
        if (town.villagers.length <= 0) {
            $("body").html(town.name + " has been left. <form><input type='submit' value='Reset'></form>");
        } else if (town.villagers.length === 5){
            $("body").html(town.name + " has grown large. Over the next few years it has grown to the largest city in the world. GOOD JOB! <form><input type='submit' value='Reset'></form>");
        }
        else
        {

        
            if (town.water <= 0 && turnProtection <= 0) {
                let dead = town.villagers.pop();
                turnProtection = 1;
                $(".message").html("Oh no!" + dead + " left from lack of water.");
                let names = "";
                town.villagers.forEach(function (name) {
                    names = names + name + ' ';
                })
                $(".displayPeople").html(names);
                $(".status").show();
            } else {
                turnProtection = turnProtection - 1;
                if (town.houses > town.villagers.length) {
                    if (town.water > 0) {
                        $(".person").show();
                    } else {
                        $(".stats").show();
                        $(".choices").show();
                    }
                } else {
                    $(".stats").show();
                    $(".choices").show();
                }
            }
        
        }
    })
});