"use strict";

var code = "0000";
var cost = 150.00
var colour = "WHITE";



$(document).ready(() => {
    // $("#item_code_id").focus();

    $("#purchase_id").click(event => {
        try {
            var paintCode = $("#paint_code_id");
            paintCode = validatePaintCode(paintCode);
            var selectedColour = readRadioButton();
            processPurchase(paintCode, selectedColour);
            $("#paint_code_id").next().text("");
        }
        catch (error) {
            $("#paint_code_id").next().text(error.message);
            $("#message_id").text("Purchase Cancelled !!! Try Again !!!");
        }
    });
});


const processPurchase = (paintCode, colourSelected) => {
    code = paintCode;
    colour = colourSelected;
    cost = 150;
    var sellingPrice = cost * 2;
    const message = `Purchase: 
                     Code: ${code} 
                     Colour: ${colour} 
                     Selling Price: ${sellingPrice}`;
    $("#message_id").text(message);
}

const readRadioButton = () => {
    const selRadioBtnVal = $(":radio:checked").val();
    return selRadioBtnVal;
}

const validatePaintCode = (testCode) => {
    const itemCodePattern = /^[0-9]{4}$/;
    var testString = testCode.val().trim(); // has to be var !!
    if (testString == "") {
        throw new Error("This field is required");

    } else if (!itemCodePattern.test(testString)) {
        throw new Error("Must be exactly 4 Numbers");
    } else {
        return testString;
    }
}
