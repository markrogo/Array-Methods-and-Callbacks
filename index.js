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
       // console.log (fifaData[i].City);
        
        
    }
}
// redo with .filter
const summary2014 = fifaData.filter((matches) => {
    return ((matches.Year === 2014) && (matches.Stage === "Final"));
});

console.log (`Here we go`);
// console.log (summary2014);
console.log ("Home team in the 2014 final was " + summary2014[0]["Home Team Name"]);
console.log ("Away team in the 2014 final was " + summary2014[0]["Away Team Name"]);
console.log ("Home team goals in the 2014 final was " + summary2014[0]["Home Team Goals"]);
console.log ("Away team goals in the 2014 final was " + summary2014[0]["Away Team Goals"]);
if ((summary2014[0]["Home Team Goals"]) > (summary2014[0]["Away Team Goals"])) {
    console.log (`The winner was ${(summary2014[0]["Home Team Name"])}`) 
} else {
    console.log (`The winner was ${(summary2014[0]["Away Team Name"])}`)
};




/* Task 2: Create  function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

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

// Now lets try it with a .filter

function getFinalsFilter(data) { 
    const finalsArray = data.filter((matches) => {
        return (matches.Stage === "Final");
    });
    return finalsArray;
};


console.log ("Task 2: here are all the finals using reduce");
console.log(getFinalsFilter(fifaData));



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

// now lets try it with a .map
function getYearsMap(data, cb) {
    let cbArray = cb(data);
    const yearsArray = cbArray.map((matches) => {
      return [matches.Year];
    });
    return yearsArray;
};
console.log ("task 3: here are all the years using a map")
console.log(getYearsMap(fifaData, getFinals));


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

// rewrite using a forEach

function getWinnersAdvanced(data, cb) {
    let cbArray = cb(data);
    let winners = [];
    // console.log (cbArray);
    cbArray.forEach((match) => {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
        winners.push(match["Home Team Name"]);
    } else {
        winners.push(match["Away Team Name"]);
    };
    });
    return winners;
};
console.log ("task 5: these are the winners using a forEach instead");
console.log(getWinnersAdvanced(fifaData, getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data, winnersFunc, yearsFunc) {
    // let yearsArray =[];
    // let winnersArray = [];
    // why doesn't this code work?!?
    // or in short, how do you log an array with object literals?!?!?
    // let finalsEmbed = [];
    // finalsEmbed = (getFinals(data));
    // console.log (`Here's Task 6 with a copy of Task 2s array ${finalsEmbed}`);
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

// I'm not really sure how to make this one array out of two arrays using a forEach
// function getWinnersByYearForEach(data, winnersFunc, yearsFunc) {
//   let returnArray = [];
//     let winnersArray = winnersFunc(data, getFinals);
//     let yearsArray = yearsFunc(data, getFinals);
//     winnersArray.forEach (() => {
//         returnArray.push (`In year ${yearsArray[year]}, the World Cup winner was ${winnersArray[year]}`)
//     });
//     return returnArray;
// };

// console.log(getWinnersByYearForEach(fifaData, getWinners, getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let initialValue = 0;
    let homeTotal = data.reduce (function (accumulator, object){
        return accumulator + object["Home Team Goals"]; }, initialValue);
    console.log (`The average number of home team goals is ${homeTotal / data.length}`);
    let awayTotal = data.reduce (function (accumulator, object){
        return accumulator + object["Away Team Goals"]; }, initialValue);
    console.log (`The average number of away team goals is ${awayTotal / data.length}`);

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

function getCountryWins(data, initials) {
    // test code, repeating stretch 1 the "old way"
//     let testWins = 0;
//     for (i = 0; i < data.length; i++) {
//         if ((data[i]["Home Team Initials"] === initials) && (data[i]["Home Team Goals"] > data[i]["Away Team Goals"])) {
//             console.log (`${initials} won this game by a score of ${data[i]["Home Team Goals"]} - ${data[i]["Away Team Goals"]}`);
//             testWins++;
//             console.log (`${initials} has a total of ${testWins} wins`);
//         } else {
//             if ((data[i]["Away Team Initials"] === initials) && (data[i]["Away Team Goals"] > data[i]["Home Team Goals"])) {
//                 console.log (`${initials} won console.log(getCountryWins(fifaData, "FRA"));console.log(getCountryWins(fifaData, "FRA")); game by a score of ${data[i]["Away Team Goals"]} - ${data[i]["Home Team Goals"]}`);
//                 testWins++;
//                 console.log (`${initials} has a total of ${testWins} wins`);
//         }
//     }
// };


    // end test code
    // validates that the team GER has 33 world cup wins!!!

    let startWins = 0;
    let wins = data.reduce (function (accumulator, object) {
        if ((object["Home Team Initials"] === initials) && (object["Home Team Goals"] > object["Away Team Goals"])){
            accumulator++; 
        } else {
            if ((object["Away Team Initials"] === initials) && (object["Away Team Goals"] > object["Home Team Goals"])) {
            accumulator++;
            }
        }
        return accumulator;
    }, startWins );
    return wins;

};
  
console.log(`Total wins for GER ${getCountryWins(fifaData, "GER")}`);
console.log(`Total wins for FRG ${getCountryWins(fifaData, "FRG")}`);
console.log(`Total wins for BRA ${getCountryWins(fifaData, "BRA")}`);
console.log(`Total wins for FRA ${getCountryWins(fifaData, "FRA")}`);
console.log(`Total wins for USA ${getCountryWins(fifaData, "USA")}`);

console.log(`Total wins for ENG ${getCountryWins(fifaData, "ENG")}`);

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    let finalsArray = [];
    let allTheScores = [];
    finalsArray = (getFinals (data));
    console.log (`here are the finals in Stretch 3`);
        console.log (finalsArray);
    // again why doesn't the next line of code work.
    // console.log(`Here's all the finals in an array for stretch 3 ${(finalsArray)}`);

    // this will put all the team and score pairs in a single array of objects
    for (i in finalsArray) {
        let homeScoreOjbect = {};
        let awayScoreOjbect = {};
        homeScoreOjbect.team = (finalsArray[i]["Home Team Name"]);
        homeScoreOjbect.score =(finalsArray[i]["Home Team Goals"]);
        awayScoreOjbect.team = (finalsArray[i]["Away Team Name"]);
        awayScoreOjbect.score =(finalsArray[i]["Away Team Goals"]);
        allTheScores.push (homeScoreOjbect);
        allTheScores.push (awayScoreOjbect);
    }
    console.log (allTheScores);
    
    // have "king of the hill" where the best total bubbles to the top
    

};

getGoals(fifaData);


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */ 