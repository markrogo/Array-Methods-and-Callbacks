import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

let i = 0;
for (i in fifaData) {
    if ((fifaData[i].Stage === "Final") && (fifaData[i].Year === 2014)) {
        
        console.log (fifaData[i]["Home Team Name"]);
        console.log (fifaData[i]["Away Team Name"]);
        console.log (fifaData[i]["Home Team Goals"]);
        console.log (fifaData[i]["Away Team Goals"]);
        if ((fifaData[i]["Home Team Goals"]) > (fifaData[i]["Away Team Goals"])) {
            console.log (`The winner was ${(fifaData[i]["Home Team Name"])}`) 
        } else {
            console.log (`The winner was ${(fifaData[i]["Away Team Name"])}`)
        };
        console.log (fifaData[i].City);
        
        
    }
}

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) { 
    let i = 0;
    let finalsArray = [];
    for (i in data) {
        if (data[i].Stage === "Final") {
            finalsArray.push(data[i]);
          };
    }
    return finalsArray;
};

console.log ("Task 2: here are all the finals");
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data, cb) {
    let yearsArray = [];
    let i = 0;
    let cbArray = cb(data);
    for (i in cbArray) {
        yearsArray.push(cbArray[i].Year);
      };
    return yearsArray;
};
console.log ("task 3: here are all the years")
console.log(getYears(fifaData, getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(data, cb) {
    let winners = [];
    let i = 0;
    let cbArray = cb(data);
    // console.log (cbArray);

    for (i in cbArray) {
    if ((cbArray[i]["Home Team Goals"]) > (cbArray[i]["Away Team Goals"])) {
        winners.push((cbArray[i]["Home Team Name"]));
    } else {
        winners.push((cbArray[i]["Away Team Name"]));
    };
    };
    return winners;
};
console.log ("task 5: these are the winners");
console.log(getWinners(fifaData, getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data, winnersFunc, yearsFunc) {
    // let yearsArray =[];
    // let winnersArray = [];
    // why doesn't this code work?!?
    let finalsEmbed = [];
    finalsEmbed = (getFinals(data));
    console.log (`Here's Task 6 with a copy of Task 2s array ${finalsEmbed}`);
    // end broken code
    let returnArray = [];
    let winnersArray = winnersFunc(data, getFinals);
    let yearsArray = yearsFunc(data, getFinals);
    for (i in winnersArray) {
        returnArray.push (`In year ${yearsArray[i]}, the World Cup winner was ${winnersArray[i]}`)
    };
    return returnArray;
};

console.log(getWinnersByYear(fifaData, getWinners, getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let initialValue = 0;
    let total = data.reduce (function (accumulator, object){
        return accumulator + object["Home Team Goals"]; }, initialValue);
    console.log (`The average number of home team goals is ${total / data.length}`);

    // test code -- SEEMS TO PROVE THE REDUCE IS WORKING AS THEY MATCH!
    // let testTotal = 0;
    // for (i in data) {
    //     testTotal = testTotal + data[i]["Home Team Goals"];
    // }
    // console.log (`Total goals scored by home teams ever is ${testTotal}`);
    // console.log (`Total games is ${data.length}`);
    // console.log (`Average home team goals is ${testTotal/data.length}`)
};

getAverageGoals(fifaData);

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

// function getCountryWins(data, initials) {
//     let startWins = 0;
//     let wins = data.reduce (function )
//     /* code here */

// };

// getCountryWins(fifaData, GER);


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */ 