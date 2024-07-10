$(document).ready(function(){
    $(".return-button").on("click", return_to_main);
    add_button_handlers();

    //$("#TESTINGBUTTON").on("click", update_box_car_select);
});

let boxCarArray = [];

// Functions for the main menu/ whole scope
function return_to_main(){
    $(".menu-div").not("#divA").hide();
    $("#divA").show();
    $("input[type=radio][name=menu]").prop("checked", false);
}

function switch_div(event){
    let currentElement = event.currentTarget;
    let div = "#" + currentElement.value;
    $(".menu-div").not(div).hide();
    $(div).show();
}

function clear_form(formID){
    console.log("clearing form " + formID);
    $(formID + " input").not(".static-input").val("");
}

function add_menu_button_handlers(){
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
    
    $("#boxCarID").on("keyup", boxcar_id_input_handler);
    $("#tareWeight").on("keyup", tare_weight_input_handler);
    $("#maxGrossWeight").on("keyup", max_gross_input_handler);
    $("#processBoxCar").on("click", process_box_car);
    $("#return_to_create_box_car_button").on("click", switch_div);
    $("#CreateCargoWeight").on("keyup", cargo_weight_input_handler);

    $("#boxCarSelect").on("change", box_car_select_change_handler);
}

// Functions for creating the Box Cars (Div B)
function boxcar_id_check(){
    let input = $("#boxCarID").val();
    const regex = new RegExp("^BX\\d{3}$");
    if(regex.test(input)){
        return true;
        //$("#boxCarErrorMsg").text("");
    } else {
        return false;
        //$("#boxCarErrorMsg").text("ID Must be BX followed by 3 digits");
    }
}

function tare_weight_check(){
    let input = $("#tareWeight").val();
    if(!isNaN(input) && input != ""){
        input = parseInt(input);
        if(input < 0 || input > 20000){
            return false;
            //$("#tareWeightErrorMsg").text("Whole number 0 - 20000");
        } else {
            return true;
            //$("#tareWeightErrorMsg").text("");
        }
    } else {
        return false;
        //$("#tareWeightErrorMsg").text("Whole number 0 - 20000");
    }
}

function max_gross_weight_check(){
    let input = $("#maxGrossWeight").val();
    let tare = parseInt($("#tareWeight").val());
    if(!isNaN(input) && input != ""){
        input = parseInt(input);
        if(input <= tare || input > 200000){
            return false;
            //$("#maxGrossWeightErrorMsg").text("Greater than Tare & 0 - 200000");
        } else {
            return true;
            //$("#maxGrossWeightErrorMsg").text("");
        }
    } else {
        return false;
        //$("#maxGrossWeightErrorMsg").text("Greater than Tare & 0 - 200000");
    }
}

function boxcar_id_input_handler(){
    if(boxcar_id_check()){
        $("#boxCarErrorMsg").text("");
    } else {
        $("#boxCarErrorMsg").text("ID Must be BX followed by 3 digits");
    }
}

function tare_weight_input_handler(){
    if(tare_weight_check()){
        $("#tareWeightErrorMsg").text("");
    } else {
        $("#tareWeightErrorMsg").text("Whole number 0 - 20000");
    }
    create_boxcar_gross_weight();
}

function max_gross_input_handler(){
    if(max_gross_weight_check()){
        $("#maxGrossWeightErrorMsg").text("");
    } else {
        $("#maxGrossWeightErrorMsg").text("Greater than Tare & 0 - 200000");
    }
}

function create_boxcar_gross_weight(){
    let tareWeight = parseInt($("#tareWeight").val());
    let cargoWeight = parseInt($("#cargoWeight").val());
    if(!isNaN(tareWeight) && !isNaN(cargoWeight)){
        $("#grossWeight").val(tareWeight + cargoWeight);
    } else {
        $("#grossWeight").val("");
    }
    
}

function process_box_car(){
    let error = false;
    if(!boxcar_id_check() || !tare_weight_check() || !max_gross_weight_check()){
        error = true;
    }

    if(!error){
        let id = $("#boxCarID").val();
        let tare = $("#tareWeight").val();
        let max = $("#maxGrossWeight").val();
        let newBoxCar = new BoxCar(id, tare, max);
        boxCarArray.push(newBoxCar);
        clear_form("#createBoxCarForm");
        $("#divC").show();
        populate_configured_cars_table();
        update_box_car_select();
    }
}

// Functions for displaying the configured box cars (Div C)

function populate_configured_cars_table(){
    let totalCargoWeight = 0;
    let table = $("#configured_box_cars_table");
    $("#configured_box_cars_table tbody").empty();
    boxCarArray.forEach((boxCar) => {
        let newRow = document.createElement("tr");

        let tdID = document.createElement("td");
        tdID.appendChild(document.createTextNode(boxCar.carID));

        let tdTare = document.createElement("td");
        tdTare.appendChild(document.createTextNode(boxCar.tareWeight));

        let tdMax = document.createElement("td");
        tdMax.appendChild(document.createTextNode(boxCar.maxWeight));

        let tdCargo = document.createElement("td");
        tdCargo.appendChild(document.createTextNode(boxCar.cargoWeight));

        let tdGross = document.createElement("td");
        tdGross.appendChild(document.createTextNode(boxCar.tareWeight + boxCar.cargoWeight));

        newRow.appendChild(tdID);
        newRow.appendChild(tdTare);
        newRow.appendChild(tdMax);
        newRow.appendChild(tdCargo);
        newRow.appendChild(tdGross);

        table.append(newRow);

        totalCargoWeight += boxCar.cargoWeight;
    });
    $("#total_cargo_weight_span").text(totalCargoWeight);
}

// Functions for adding freight (Div D)
function update_box_car_select(){
    let selectBox = $("#boxCarSelect");
    selectBox.find("option").remove();

    let placeHolder = document.createElement("option");
    placeHolder.value = "";
    placeHolder.text = "Select Box Car..";

    selectBox.append(placeHolder);

    boxCarArray.forEach((boxCar) => {
        let newOption = document.createElement("option");
        newOption.value = boxCar.carID;
        newOption.text = boxCar.carID;
        selectBox.append(newOption);
    });
}

function box_car_select_change_handler(){
    let selectedBoxCar = $("#boxCarSelect").val();
    $("#selectedBoxCar").val(selectedBoxCar);
}

function cargo_weight_input_check(){
    let input = $("#CreateCargoWeight").val();
    if(!isNaN(input) && input != ""){
        return true;
    } else {
        return false;
    }
}

function cargo_weight_input_handler(){
    console.log("cargo weight handler");
    if(cargo_weight_input_check()){
        $("#cargoWeightErrorMsg").text("");
    } else {
        $("#cargoWeightErrorMsg").text("Cargo weight must be numerical");
    }
}

function process_cargo(){
    let error = false;
    let selectedBoxCar = $("#selectedBoxCar").val();
    let transportID = $("#transportID").val();
    let cargoDescription = $("#cargoDescription").val();
    let cargoWeight = $("#createCargoWeight").val();

    if(selectedBoxCar ==""){
        error = true;
    }
    if(transportID == ""){
        error = true; 
    }
    if(cargoDescription == ""){
        error = true;
    }
    if(!cargo_weight_input_check){
        error = true;
    }

    if(!error){
        let newCargo = new Cargo(transportID, cargoDescription, cargoWeight);
        const selectedBoxCar = boxCarArray.find(boxCar => boxCar.CarID === selectedBoxCar);
        
    }

}