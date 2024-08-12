"use strict";
// There are two basic objectives
// (1) Use regular expression to provide validation for Access Code
// (2) User range testing to provide validation for the two Keys
var valid_keys = false;
var valid_access_code = false;

$(document).ready(() => {
    setStatus();
    $("#access_code_id").focus();
    $("#validate_id").click(() => {
        validateAll();
    });
});

const validateAll = () => {
    var access_code_input = $("#access_code_id").val();
    valid_access_code = testAccessCode(access_code_input);

    if (valid_access_code) {
        var key_1_input = $("#key_1_id").val();
        var key_2_input = $("#key_2_id").val();
        valid_keys = testKeys(key_1_input, key_2_input);
    }

    setStatus();
}

const testAccessCode = (testCode) => {
    var testString = testCode.trim();

    if (testString == "")
        return false;
    //=(1)====================================================
    // REGULAR EXPRESSION component
    // Add in a regular expression to test for 
    // exactly three letters Upper and Lower Case are allowed
    // Use the space provided below.
    // Solution key used 4 lines of code
    // -------------------------------------------------------
    const matchString = /^[A-Z]{3}$/i;
    if(matchString.test(testString)){
        return true;
    }
    //=(1)====================================================
}

const testKeys = (key1, key2) => {
    if (key1 == "" || key2 == "")
        return false;
    if (isNaN(key1) || isNaN(key2))
        return false;
    var k1 = parseInt(key1);
    var k2 = parseInt(key2);
    // =(2)====================================================
    // RANGE TESTING component
    // Data has been validated for blank and number testing
    // and has been converted to itegers
    // Your goal is to ensure that k1 and k1 are both in the 
    // range of 00 to 99 (inclusive)
    // You are not to use Regular Expressions testing for this
    // checkpoint(2) as it was it was already used for checkpont (1)
    // Fill in the required code in the space provided.
    // Solution key used 5 lines of code.
    // --------------------------------------------------------
    if(0 > k1 > 99 || 0 > k2 > 99){
        return false;
    } else if(k1 + k2 == 100){
        return true;
    }
    
    //=(2)========================================================
}
// NO MODIFICATONS below this point
const setStatus = () => {
    if (valid_access_code) {
        $("#key_1_id").removeClass("lock_keys").prop("readonly", false);
        $("#key_2_id").removeClass("lock_keys").prop("readonly", false);
        $("#access_code_id").next().text("Valid Access Code");

        if (valid_keys) {
            $("#display_id").removeClass("invalid_access_code");
            $("#display_id").removeClass("invalid_keys");
            $("#display_id").addClass("valid_keys");
            $("#key_1_id").next().text("KEYS PAIR is VALID !!!");
        }
        else {
            $("#display_id").removeClass("invalid_access_code");
            $("#display_id").removeClass("valid_keys");
            $("#display_id").addClass("invalid_keys");
            $("#key_1_id").next().text("Invalid Key Pair");
        }
    }
    else {
        $("#display_id").removeClass("invalid_keys");
        $("#display_id").removeClass("valid_keys");
        $("#display_id").addClass("invalid_access_code");
        $("#access_code_id").next().text("Invalid Access Code");
        $("#key_1_id").addClass("lock_keys").prop("readonly", true);
        $("#key_2_id").addClass("lock_keys").prop("readonly", true);
        $("#key_1_id").val("");
        $("#key_2_id").val("");
    }
}
