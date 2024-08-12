"use strict";
var current_guess = null;
// There are 4 Checkpoints (1) ... (4)

// =(1)============================================
//      Comment out the following line
//  The secret_number will be placed in an enclosure
//  go to the end of the document for checkpoint (2)

const secret_number = 123; // comment this line out

// =(1)============================================

var cnaSecretNumber = null;

$(document).ready(() => {

    activateEnclosure();

    $("#guess_id").focus();
    $("#check_guess_btn").click(() => {
        if (validateGuess()) {
            $("#display_id").text("Congratulations !!! you WIN !!!");
        }
        else {
            $("#display_id").text("Try Again !!!");
        }
    });
});


// =(3)===================================================
//    Create an enclosure with one attribute
//    and one method.
//    Attribute is secretNumber = 123 
//    hardcode the number - There is no set method
//    provide a method call getSecret that will return
//    the secretNumber.
//                                     
//    Complete the enclosure in the space provided
//    within generateSecretVar
//    Solution key used 5 lines 
// -----------------------------------------------------------
const generateSecretVar = () => {








};
// =(3)===================================================

// =(4)===================================================
// Fill in the one line that will activate the enclosure
// in the space provide within activateEnclosure function
// ---------------------------------------------------------
const activateEnclosure = () => {



}
// =(4)===================================================

const validateGuess = () => {
    const guessObj = $("#guess_id");
    var guessText = guessObj.val();
    if (guessText == "" || //(1)
        isNaN(guessText) || //(2)
        !Number.isInteger(parseFloat(guessText))) //(3)
    {
        guessObj.next().text("Invalid Guess - Enter 00 to 99");
        current_guess = null;
        return false;
    }

    current_guess = parseInt(guessText);
    if (current_guess != lookUpSecretNumber()) {
        current_guess = null;
        guessObj.next().text("Incorrect Guess - Not the Secret Number");
        return false;
    }

    guessObj.next().text("*");
    return true;
}

// =(2)============================================================================
// Switch from the Variable Version over to use Class Version
// Comment out the (a) line
// remove the comments from the (b) line - this will switch to use your class function
// ----------------------------------------------------------------------------------
const lookUpSecretNumber = () => {

    return secret_number; // (a) comment this line OUT to disable use of
    //     Local Vars in the solution
    // return cnaSecretNumber.getSecret();  // (b) remove the comment form this line
    //     to use closure function
}

// =(2)============================================================================
//=========================== END OF CODE ================================