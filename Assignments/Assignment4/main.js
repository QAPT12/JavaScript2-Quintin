"use strict";

$(document).ready( () => {

    const scores = [];

    $("#addScore").click( () => {
        
        const score = parseFloat($("#score").val());
                
        if (isNaN(score) || score < 0 || score > 100) {
            $("#addScore").next().text("Score must be from 0 to 100."); 
        }
        else {
            $("#addScore").next().text("");  
            // add score to scores array 
            scores.push(score);

            updateDom(scores, calculateAverageScore(scores), getLastThreeScores(scores));
        }
        
        // get text box ready for next entry
        $("#score").val("");
        $("#score").focus(); 
    });

    $("#deleteScore").click( () => {
        
        const index = parseInt($("#delete").val());

        if (isNaN(index) || index < 0 || index >= scores.length) {
            $("#deleteScore").next().text("Index out of range"); 
        }
        else {
            $("#deleteScore").next().text("");
            // remove score at index
            scores.splice(index, 1);

            updateDom(scores, calculateAverageScore(scores), getLastThreeScores(scores));
        }

    });

    // set focus on initial load
    $("#score").focus();
});

function calculateAverageScore(scores){
    const total = scores.reduce( (tot, val) => tot + val, 0 );
    return total/scores.length;
}

function getLastThreeScores(scores){
    const len = scores.length;
    const lastScores = (len <= 3) ? scores.slice() : scores.slice(len - 3, len); // copy last three
    return lastScores.reverse();
}

function updateDom(scores, avgScores, lastThreeScores){
    $("#all").text(scores.join(", "));
    $("#avg").text(avgScores.toFixed(2));
    $("#last").text(lastThreeScores.join(", "));
}