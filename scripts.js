"use strict"
$(document).ready(function () {
    class village {
        constructor() {
            this.name = '';
            this.villagers = [];
            this.wood = 0;
            this.water = 10;
            this.food = 10;
            this.houses = 1;
            this.wells = 0;
            this.day = 0;
            $(".displayWood").html(this.wood);
            $(".displayFood").html(this.food);
            $(".displayWater").html(this.water);
            $(".displayHouse").html(this.houses);
            $(".displayWell").html(this.wells);
            $(".displayDrink").html(1);
            $(".day").html("day:" + this.day);
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
    $(".getFood").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        let random = Math.floor(Math.random() * 4) + 1;
        town.food = town.food + random;
        $(".message").html("You found " + random + " food! " + town.villagers.length +" was eaten. You are at " + (town.food - town.villagers.length) + " food.");
        $(".status").show();
    })
    $(".getWater").click(function () {
        $(".stats").hide();
        $(".choices").hide();
        let random = Math.floor(Math.random() * 4) + 1;
        town.water = town.water + random;
        $(".message").html("You found " + random + " water! " + town.villagers.length+ " was drank. You are at " + (town.water - town.villagers.length) + " water.");
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
        let random = Math.floor(Math.random() * 10) + 1;

        if (random === 1) {
            random = Math.floor(Math.random() * 4) + 1;
            town.wood = town.wood + random;
            $(".message").html("You found " + random + " wood! You are at " + town.wood + " wood.");
        } else if (random === 2) {
            random = Math.floor(Math.random() * 5) + 1;
            town.water = town.water + random;
            $(".message").html("You found " + random + " water! "+ town.villagers.length +" was drinken. You are at " + (town.water - town.villagers.length) + " water.");
        } else if (random === 3 || random === 6 || random === 7) {
            $(".message").html("You found nothing.");
        } else if (random === 4) {
            random = Math.floor(Math.random() * 3); //wood
            let random2 = Math.floor(Math.random() * 3); //water
            let random3 =  Math.floor(Math.random() * 3); //food
            town.wood = town.wood - random;
            town.water = town.water - random2;
            if (town.water < 0) {
                town.water = 0;
            }
            if (town.wood < 0) {
                town.wood = 0;
            }
            $(".message").html(town.name + " has been raided. You lost " + random + " wood, "+ random3+" food, and " + random2 + " water.");
        } else if (random === 5) {
            let names;
            let dead = town.villagers.pop();
            $(".message").html("Oh no!" + dead + " got killed by a bear.");
            town.villagers.forEach(function (name) {
                names = names + name + ' ';
            })
            $(".displayPeople").html(names);
        } else if (random === 8){
            let random = Math.floor(Math.random() * 5) + 1;
            town.food = town.food + random;
            $(".message").html("You found " + random + " food! "+ town.villagers.length +" was eaten. You are at " + (town.food - town.villagers.length) + " food.");

        } else if (random === 9){
            if (town.food< 5 && town.water < 5){
                town.food = town.food * 2;
                town.water = town.water * 2;
                $(".message").html("The natives bring you supplies. Your food and water have doubled.");
            } else {
                let random = Math.floor(Math.random() * 2) + 1;
                if (random === 1){
                    random = Math.floor(Math.random() * 5) + 1;
                    let random2 = Math.floor(Math.random() * 10) + 1;
                    town.food = town.food - random;
                    town.water = town.water + random2;
                    $(".message").html("You make a deal of a lifetime. You trade "+random + " food for " + random2 + "water.");
                } else {
                    random = Math.floor(Math.random() * 5) + 1;
                    let random2 = Math.floor(Math.random() * 10) + 1;
                    town.food = town.food - random;
                    town.water = town.water + random2;
                    $(".message").html("You make a deal of a lifetime. You trade "+random + " food for " + random2 + "water.");
                }
            }
            
        }
        $(".status").show();
    })
    $(".continue").click(function () {
        $(".status").hide();
        town.water = town.water + town.wells - town.villagers.length;
        town.food = town.food - town.villagers.length;
        town.day = town.day + 1;
        $(".day").html("day:" + town.day);
        $(".displayWood").html(town.wood);
        $(".displayFood").html(town.food);
        $(".displayWater").html(town.water);
        $(".displayHouse").html(town.houses);
        $(".displayWell").html(town.wells);
        if (town.villagers.length <= 0) {
            $("body").html(town.name + " has died. <form><input type='submit' value='Reset'></form>");
        } else if (town.villagers.length === 5){
            $("body").html(town.name + " has grown large. Over the next few years it has grown to the largest city in the world. GOOD JOB! <form><input type='submit' value='Reset'></form>");
        }
        else
        {

        
            if (town.water < 0 && turnProtection <= 0) {
                let dead = town.villagers.pop();
                turnProtection = 1;
                if (town.water <= 0){
                    town.water = 0;
                }
                if(town.food <= 0){
                    town.food = 0;
                }
                $(".displayFood").html(town.food);
                $(".displayWater").html(town.water);
                $(".message").html("Oh no!" + dead + " died from lack of water.");
                let names = "";
                town.villagers.forEach(function (name) {
                    names = names + name + ' ';
                })
                $(".displayPeople").html(names);
                $(".status").show();
            } else if (town.food < 0 && turnProtection <= 0) {
                let dead = town.villagers.pop();
                turnProtection = 1;
                $(".message").html("Oh no!" + dead + " died from lack of food.");
                if (town.water <= 0){
                    town.water = 0;
                }
                if(town.food <= 0){
                    town.food = 0;
                }
                $(".displayFood").html(town.food);
                $(".displayWater").html(town.water);
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
                        if (town.water <= 0){
                            town.water = 0;
                        }
                        if(town.food <= 0){
                            town.food = 0;
                        }
                        $(".displayFood").html(town.food);
                        $(".displayWater").html(town.water);
                        $(".stats").show();
                        $(".choices").show();
                    }
                } else {
                    if (town.water <= 0){
                        town.water = 0;
                    }
                    if(town.food <= 0){
                        town.food = 0;
                    }
                    $(".displayFood").html(town.food);
                    $(".displayWater").html(town.water);
                    $(".stats").show();
                    $(".choices").show();
                }
            }
        
        }
    })
});