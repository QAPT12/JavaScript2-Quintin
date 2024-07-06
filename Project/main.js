$(document).ready(function(){
    $(".return-button").on("click", return_to_main);
    add_menu_button_handlers();
});

function return_to_main() {
    $(".menuDiv").not("#divA").hide();
    $("#divA").show();
    $("input[type=radio][name=menu]").prop("checked", false);
}

function switch_div(event) {
    let currentElement = event.currentTarget;
    let div = "#" + currentElement.value;
    $(".menuDiv").not(div).hide();
    $(div).show();
}

function add_menu_button_handlers() {
    console.log("adding handlers to menu buttons");
    let all_buttons = $("input[type=radio][name=menu]");
    all_buttons.change(switch_div);
}