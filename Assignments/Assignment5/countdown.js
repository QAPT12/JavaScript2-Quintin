"use strict";

$(document).ready( () => {

    $("#countdown").click( function() {
        let name = $("#event").val();
        let dateString = $("#date").val();    

        //make sure event name and date are entered
        if (validation.isEmpty(name) || validation.isEmpty(date)) {
            $("#message").text("Please enter both a name and a date.");
            return;
        }  

        //make sure due date string has slashes and a 4-digit year
        if (validation.hasNoSlashes(dateString)) { 
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        } 

        const year = dateString.substring(dateString.length - 4); 
        if (validation.isInvalidYear(year)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        }     
        //convert due date string to Date object and make sure date is valid
        let newEvent = new Event(name, dateString);
        if (validation.isInvalidDate(newEvent.date)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return;
        }

        $("#message").text(newEvent.getCountdownMessage());

    });
    
    $("#event").focus();
});