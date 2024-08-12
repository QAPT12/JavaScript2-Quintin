"use strict";
// Goal of the problem is to correct 2 problems in train.js

// (1) add in a setCookie call that will generate a location cookie
// (2) complete the setCookie Function
// 
$(document).ready(() => {

    $("#train_form").submit(event => {
        event.preventDefault();
        try {
            var selRadioLocation = $("[name=location]:radio:checked").val();
            setCookie("location", selRadioLocation, 1); // 1 day persistent cookie
            // =(1)===============================================================
            // setCookie code is missing (a) Add in missing code where indicated
            var selRadioSpeed = $("[name=speed]:radio:checked").val();
            //(a) 
            setCookie("speed", selRadioSpeed, 1);
            $("#message").val("CK GEN");
        }
        catch (error) {
            event.preventDefault();
            $("#message").val("NO CK GEN");
        }
    });
});

const setCookie = (name, value, days) => {
    // =(2) =================================================
    // Complete the required cookie code to complete 
    // the creation of the cookie.
    // factor in all of the supplied attributes name, value, days
    // Solution Key used 5 lines of code
    // -(2)--------------------------------------------------
    var date = new Date()
    date.setDate(date.getDate() + days)

    document.cookie = `${name}=${value}; expires=${date}; path=/`;
    // ========================================================
}
