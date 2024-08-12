"use strict";
// Focus of this problem is to convert from an 
// iterative array solution to an array map solution
// (1) Goal is to remove the existing Iterative Array Code
//     and replace it with a MAP REDUCE function

var arrayA = [];
var arrayB = [];

$(document).ready(() => {
    $("#process_id").click(event => {
        process_d(arrayB);
    });
    loadData();
});

const loadData = () => {
    arrayA = ["Bars", "Chips", "Cookies", "Batteries", "Detergent"];
    arrayB = [2.95, 3.95, 5.95, 9.95, 12.95];
    const ul = document.createElement("ul");
    $("#data_id").append(ul);
    for (let i = 0; i < arrayA.length; i++) {
        const name = arrayA[i];
        const price = arrayB[i];
        const name_price = String(`${name} ${price}`);
        const li = document.createElement("li");
        const text = document.createTextNode(name_price);
        li.appendChild(text);
        ul.appendChild(li);
    }
}

const process_d = (numbers) => {

    //=(1)=========================================================
    //comment out the following Array Approach and replace it with 
    // an Array Based Map Reduce function
    // The array that you will work with is numbers.
    // No conversion required.
    // Solution Code required 2 lines: 1 to calculate 1 to print
    // ------------------------------------------------------------
    // var result = 0;
    // for (let i = 0; i < numbers.length; i++) {
    //     result += numbers[i];
    // }
    let result = numbers.reduce(function(total, num){return total + num}, 0);
    $("#results_id").val(result);
    //=(1)=========================================================
}
