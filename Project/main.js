$(document).ready(function(){
    $(".return-button").on("click", return_to_main);
    add_button_handlers();
    configure_warehouses(4); // configure 4 warehouses (s1 - s4)
});

let boxCarArray = [];

// TODO: wareHouseArray
// This becomes an array of "boxCar" objects with a max/tare of 0 that represent the station warehouse.
// When a car is at a station and cargo is dropped off/ cant' be added - add the cargo to the correct
// Station warehouse.
// Display warehouse manifest will work the same as boxCar manifest but will loop through the objects in 
// the warehouse array
let wareHouseArray = []; 

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
    let all_buttons = $("input[type=radio][name=menu]:not([value='secondPage'])");
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
    $("#returnToCreateFreightButton").on("click", switch_div);
    $("#createCargoWeight").on("keyup", cargo_weight_input_handler);
    $("#boxCarSelect").on("change", box_car_select_change_handler);
    $("#boxCarSelect").on("change", function(){
        let boxCar = $("#boxCarSelect").val();
        populate_box_car_manifest(boxCar);
    });
    $("#processCargoButton").on("click", process_cargo);
}

function configure_warehouses(num){
    for(let i = 0; i < num; i++){
        let ID = "S" + (i > 9 ? "" + i : "0" + (i + 1));
        let newWarehouse = new BoxCar(ID, 0, 99999999999999);
        wareHouseArray.push(newWarehouse);
    }
    generate_warehouse_manifests();
}

// Functions for creating the Box Cars (Div B)
function boxcar_id_check(){
    let input = $("#boxCarID").val();
    const regex = new RegExp("^BX\\d{3}$");
    if(regex.test(input)){
        return true;
    } else {
        return false;
    }
}

function tare_weight_check(){
    let input = $("#tareWeight").val();
    if(!isNaN(input) && input != ""){
        input = parseInt(input);
        if(input < 0 || input > 20000){
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function max_gross_weight_check(){
    let input = $("#maxGrossWeight").val();
    let tare = parseInt($("#tareWeight").val());
    if(!isNaN(input) && input != ""){
        input = parseInt(input);
        if(input <= tare || input > 200000){
            return false;
        } else {
            return true;
        }
    } else {
        return false;
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
        let tare = parseInt($("#tareWeight").val());
        let max = parseInt($("#maxGrossWeight").val());
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
    let input = $("#createCargoWeight").val();
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
    let cargoWeight = parseInt($("#createCargoWeight").val());

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
        const selectedBoxCarObject = boxCarArray.find(boxCar => boxCar.carID === selectedBoxCar);
        
        let selectedBoxCarMaxWeight = parseInt(selectedBoxCarObject.maxWeight);
        let selectedBoxCarTare = parseInt(selectedBoxCarObject.tareWeight);
        let selectedBoxCarCargo = parseInt(selectedBoxCarObject.cargoWeight); 

        console.log("box max: " + selectedBoxCarMaxWeight + " box tare: " + selectedBoxCarTare + " box cargo: " + selectedBoxCarCargo + " new cargo weight: " + newCargo.weight);
        console.log(selectedBoxCarTare + selectedBoxCarCargo + newCargo.weight);
        if(selectedBoxCarTare + selectedBoxCarCargo + newCargo.weight > selectedBoxCarMaxWeight){
            add_cargo_to_warehouse(newCargo);
            update_all_freight();
            $("#transportIDErrorMsg").text("Weight Exceed - Sent to Warehouse");
            $("#divF").show();
            $("#divE").hide();
        } else {
            console.log("adding cargo to box car");
            $("#transportIDErrorMsg").text("")
            selectedBoxCarObject.addCargo(newCargo);
            populate_configured_cars_table();
            populate_box_car_manifest(selectedBoxCar);
            $("#divE").show();
            $("#divF").hide();
        }
        clear_form("#addFreightForm");
        update_all_freight();
    }

}

function add_cargo_to_warehouse(cargo){
    wareHouseArray.push(cargo);
    update_warehouse_data();
    update_all_freight();
}

// Functions for Box Car manifest (Div E)
function populate_box_car_manifest(boxCarID){
    $("#boxCarManifestTitle").text("CNA Box Car Manifest - Box Car " + boxCarID);

    let boxCarManifestTable = $("#box_car_manifest_table");
    boxCarManifestTable.find("tbody").empty();
    
    let chosenBoxCar = boxCarArray.find(boxCar => boxCar.carID === boxCarID);
    chosenBoxCar.cargoList.forEach((item) => {
        let newRow = document.createElement("tr");

        let tdTransportID = document.createElement("td");
        tdTransportID.appendChild(document.createTextNode(item.transportID));

        let tdDescription = document.createElement("td");
        tdDescription.appendChild(document.createTextNode(item.description))

        let tdWeight = document.createElement("td");
        tdWeight.appendChild(document.createTextNode(item.weight));

        newRow.appendChild(tdTransportID);
        newRow.appendChild(tdDescription);
        newRow.appendChild(tdWeight);

        boxCarManifestTable.find("tbody").append(newRow);
    });
    $("#manifest_total_cargo_weight_span").text(chosenBoxCar.cargoWeight)
}

// Functions for warehouse data (Div F)
function generate_warehouse_manifests(){
    console.log("generating the manifests");
    //create table and append it to div f
    wareHouseArray.forEach(warehouse => {
        console.log("generating for warehouse " + warehouse.carID);
        const title = document.createElement('h2');
        title.textContent = `Warehouse manifest - Warehouse ${warehouse.carID}`;
        $("#divF").find(".spacer").before(title);
  
        // Create the table
        const table = document.createElement('table');
        table.setAttribute('id', `warehouseManifestTable-${warehouse.carID}`);

        // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Transport ID', 'Description', 'Weight'];
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the table footer for total weight
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        totalCell.setAttribute('colspan', 2);
        totalCell.textContent = 'Total Weight';
        footerRow.appendChild(totalCell);

        const totalWeightCell = document.createElement('td');
        footerRow.appendChild(totalWeightCell);

        tfoot.appendChild(footerRow);
        table.appendChild(tfoot);

        // Append the table to the container
        $("#divF").find(".spacer").before(table);
    });
}

function update_warehouse_data(){
    // TODO: This will mimic the all freight operations above but using the wareHouseArray only
    let totalWarehouseWeight = 0;
    let warehouseTable = $("#warehouseDataTable");
    warehouseTable.find("tbody").empty();

    wareHouseArray.forEach((item) => {
        let newRow = document.createElement("tr");

        let tdTransportID = document.createElement("td");
        tdTransportID.appendChild(document.createTextNode(item.transportID));

        let tdDescription = document.createElement("td");
        tdDescription.appendChild(document.createTextNode(item.description))

        let tdWeight = document.createElement("td");
        tdWeight.appendChild(document.createTextNode(item.weight));

        totalWarehouseWeight += parseInt(item.weight);

        newRow.appendChild(tdTransportID);
        newRow.appendChild(tdDescription);
        newRow.appendChild(tdWeight);

        warehouseTable.find("tbody").append(newRow);
    });
    $("warehouseTotalCargoWeight").text(totalWarehouseWeight);
}

// functions for all cargo status (Div G)
function update_all_freight(){
    let freightTable = $("#allFreightDataTable");
    freightTable.find("tbody").empty();

    boxCarArray.forEach((car) => {
        let cargoList = car.cargoList;
        cargoList.forEach((item) =>{
            let newRow = document.createElement("tr");

            let tdTransportID = document.createElement("td");
            tdTransportID.appendChild(document.createTextNode(item.transportID));
    
            let tdDescription = document.createElement("td");
            tdDescription.appendChild(document.createTextNode(item.description))
    
            let tdWeight = document.createElement("td");
            tdWeight.appendChild(document.createTextNode(item.weight));
    
            let tdStatus = document.createElement("td");
            tdStatus.appendChild(document.createTextNode(car.carID));
    
            newRow.appendChild(tdTransportID);
            newRow.appendChild(tdDescription);
            newRow.appendChild(tdWeight);
            newRow.appendChild(tdStatus);
            freightTable.find("tbody").append(newRow);
        });   
    });

    // TODO: This will mimic the operations above but using the wareHouseArray of objects instead.
    wareHouseArray.forEach((item) => {
        let newRow = document.createElement("tr");

            let tdTransportID = document.createElement("td");
            tdTransportID.appendChild(document.createTextNode(item.transportID));
    
            let tdDescription = document.createElement("td");
            tdDescription.appendChild(document.createTextNode(item.description))
    
            let tdWeight = document.createElement("td");
            tdWeight.appendChild(document.createTextNode(item.weight));
    
            let tdStatus = document.createElement("td");
            // status will become the "carID" of the warehouse "boxCar" object
            tdStatus.appendChild(document.createTextNode("Warehouse"));
    
            newRow.appendChild(tdTransportID);
            newRow.appendChild(tdDescription);
            newRow.appendChild(tdWeight);
            newRow.appendChild(tdStatus);
            freightTable.find("tbody").append(newRow);
    });
}