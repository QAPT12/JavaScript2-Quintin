"use strict";
// Conversion from Global Variables based problem
// to Class Object based problem

// There are five checkpoints for this problem (1) ... (5)

// =(1)======== COMMENT OUT THE FOLLOWING 3 LINES =======
//                                 (a) (b) (c)
// Converting from use of local Variables 
// to Class Variables begins with this required deletion
// ------------------------------------------------------
// var item_name; // (a)
// var item_wholesale; //(b)
// var item_markup; //(c)
// =(1)==================================================

$(document).ready(() => {
    loadDataIntoClass();
    preDisplay();
    $("#calculate_selling_id").click(event => {
        displaySellingPrice();
    });
});

// =(2)=================================================================
// Complete the class 'StoreItem'  
// set all three attributes of the attributes to null
// you will require (1) item_name (2) item_wholesale (3) item_markup
// 3 lines of code for the constructor 2 lines of code for selling price
// ----------------------------------------------------------------------
class StoreItem {
    constructor() {
        this.item_name = null;
        this.item_wholesale = null;
        this.item_markup = null;
    }
    // you will require a get sellingPrice method
    // formula is selling price = item_wholesale + item_markup

    get sellingPrice() {
        let sellingPrice = this.item_wholesale + this.item_markup;
        return sellingPrice;
    }
}
// =(2)===============================================================

const loadDataIntoClass = () => {

    // =(3)===============================================================    
    // comment out the three lines marked as COMMENT OUT 
    // local variable are not used in the solution (a) (b) (c)
    // item_name = "Cookies"; // (a) Comment out
    // item_wholesale = 5.95; // (b) Comment out
    // item_markup = 1.11; // (c) Comment out
    // Add in the correspond 3 lines (d) (e) (f) to populate your new class 'storeItem'
    // with (d) item_name = "cookies", (e) item_wholesale = 5.95, (f) item_markup = 1.11
    // -------------------------------------------------------------------------------
    // (a) 
    storeItem.item_name = "cookies";
    // (b)
    storeItem.item_wholesale = 5.95;
    // (c)
    storeItem.item_markup = 1.11;
    // =(3)===============================================================    
}

const preDisplay = () => {
    // =(4)====================================================================
    // Comment out the following 3 lines marked as (a) (b) (c)
    // display is no longer based on local variables
    // -------------------------------------------------------------------------
    // $("#name_id").val(item_name); // (a) comment out this line
    // $("#wholesale_id").val(item_wholesale); // (b) comment out this line
    // $("#markup_id").val(item_markup); // (c) comment out this line

    // create 3 lines of code to populate the form display variables based on 
    // the 3 class attributes (d) (e) (f)
    // --------------------------------------------------------------------------------

    //(d)
    $("#name_id").val(storeItem.item_name);
    //(e)
    $("#wholesale_id").val(storeItem.item_wholesale);
    //(f)
    $("#markup_id").val(storeItem.item_markup);
    // =(4)============================================================================
}

const displaySellingPrice = () => {
    // =(5)====================================================================
    // Comment out the following 2 lines marked as comment out (a) (b)
    // The calculations are not done locally and will a class method
    // ----------------------------------------------------------------------------
    // var item_selling = item_wholesale + item_markup; // (a) comment out this line
    // $("#selling_id").val(`$ ${item_selling.toFixed(2)}`); // (b) comment out this line

    // create 1 line of code (c) to display the selling price using the class function
    // the class function involved is storeItem.sellingPrice
    // -----------------------------------------------------------------------------
    // (c)
    $("#selling_id").val(`$ ${storeItem.sellingPrice.toFixed(2)}`);
    // =(5)============================================================================
}

var storeItem = new StoreItem();
