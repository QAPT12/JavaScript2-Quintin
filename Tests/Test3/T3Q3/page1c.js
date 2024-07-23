"use strict";

var ones_value = 0;
var hundreds_value = 0;
var answer = 0;

$(document).ready(() => {
    $("#calculate_id").click(event => {
        event.preventDefault();
        readButtons();
        calculateAndDisplay();
    });
});

const readButtons = () => {
    ones_value = parseInt($("input[name=ones_code]:checked").val());
    hundreds_value = parseInt($("input[name=hundreds_code]:checked").val()) * 100;    // Fill in Missing Line (1)
}

const calculateAndDisplay = () => {
    answer = ones_value + hundreds_value; // Fill in Missing Line (2)
    $("#answer_id").val(answer);   // Fill in Missing Line (3)
}



