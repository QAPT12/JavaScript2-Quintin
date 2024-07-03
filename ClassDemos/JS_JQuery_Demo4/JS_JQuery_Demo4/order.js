"use strict";
$(document).ready( () => {

    // move focus to first text box
    $("#item_code_id").focus();
    
    // the handler for the click event of the submit button
    $("#order_form").submit( event => {
        let isValid = true;

        // validate the item_code entry with a regular expression
        const itemCodePattern = /\b[A-Za-z]{4}\b/;
        const itemCode = $("#item_code_id").val().trim();
        if (itemCode == "") { 
            $("#item_code_id").next().text("This field is required.");
            isValid = false;
        } else if ( !itemCodePattern.test(itemCode) ) {
            $("#item_code_id").next().text("Must be exactly 4 Letters");
            isValid = false;
        } else {
            $("#item_code_id").next().text("");
        }
        $("#item_code_id").val(itemCode);
            
        const itemDesc = $("#item_desc_id").val().trim();
        if ( itemDesc.length < 1) {
            $("#item_desc_id").next().text("Required Entry");
            isValid = false;
        } else {
            $("#item_desc_id").next().text("");
        }
        $("#item_desc_id").val(itemDesc);
        
        // prevent the submission of the form if any entries are invalid 
        if (isValid == false) {
            event.preventDefault();                
        }
    });

});

//     Original ASCII
//  0  1  2  3  4  5  6  7 
//  8  9  :  ;  <  =  >  ?  
//  @  A  B  C  D  E  F  G
//  H  I  J  K  L  M  N  O
//  P  Q  R  S  T  U  V  W 
//  X  Y  Z  [  \  ]  ^  _ 
//