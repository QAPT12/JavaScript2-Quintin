$(document).ready(function(){
    $(".return-button").on("click", return_to_main);
    add_button_handlers();
});

// Functions for the main menu/ whole scope
function return_to_main() {
    $(".menu-div").not("#divA").hide();
    $("#divA").show();
    $("input[type=radio][name=menu]").prop("checked", false);
}

function switch_div(event) {
    let currentElement = event.currentTarget;
    let div = "#" + currentElement.value;
    $(".menu-div").not(div).hide();
    $(div).show();
}

function clear_form(formID){
    console.log("clearing form " + formID);
    $(formID + " input").val("");
}

function add_menu_button_handlers() {
    console.log("adding handlers to menu buttons");
    let all_buttons = $("input[type=radio][name=menu]");
    all_buttons.change(switch_div);
}

function add_form_reset_handlers(){
    console.log("adding handlers to form reset buttons");
    $(".reset-form-button").on("click", function(){
        let parent_form_id = $(this).parent().parent().attr("id");
        let form = "#" + parent_form_id;
        clear_form(form);
    })
}

function add_button_handlers(){
    add_menu_button_handlers();
    add_form_reset_handlers();
    
    $("#boxCarID").on("keyup", boxcar_id_check);
}

// Functions for creating the Box Cars
function boxcar_id_check() {
    let input = $("#boxCarID").val();
    const regex = new RegExp("^BX\\d{3}$");
    if(regex.test(input)){
        console.log("good input");
        $("#boxCarErrorMsg").text("");
        
    } else {
        console.log("bad input");
        $("#boxCarErrorMsg").text("ID Must be BX followed by 3 digits");
    }
}
