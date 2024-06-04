// set vars for keeping track of car and cargo weight
var emptyCarWeight = 0;
var totalCarWeight = 0;
var maxCarWeight = 0
var totalCargoWeight = 0;

$(document).ready(function() {
    // Add events to our buttons
    $("#cargoResetButton").on("click", clear_cargo_inputs);
    $("#processCargoButton").on("click", process_cargo);
    // set value for total car weight and max car weight
    emptyCarWeight = parseInt($("#boxCarEmpty").val());
    totalCarWeight = parseInt($("#boxCarEmpty").val());
    maxCarWeight = parseInt($("#boxCarMaxWeight").val());

});

function clear_cargo_inputs() {
    $("#cargoID, #cargoDescription, #cargoWeight").val('');
}

function process_cargo() {
    let submissionError = false;

    let boxID = $("#boxCarID").val();
    let id = $("#cargoID").val().trim();
    let description = $("#cargoDescription").val().trim();
    let weight = parseInt($("#cargoWeight").val());
    if($("#manifestTable").length == 0){
        create_manifest_table(boxID);
    }

    if(id == ""){
        submissionError = true;
        $("#cargoID").next().text("Transport ID is required");
    }
    if(description == ""){
        submissionError = true;
        $("#cargoDescription").next().text("Cargo Item must have description");
    }
    if(isNaN(weight)){
        submissionError = true;
        $("#cargoWeight").next().text("Cargo Weight must be numerical");
    } else if(weight < 1 || weight + emptyCarWeight > maxCarWeight){
        submissionError = true;
        $("#cargoWeight").next().text("Cargo weight must be greater than 1 and cannot push Car above max weight");
    }

    if(!submissionError){
        add_manifest_row(id, description, weight);
        clear_cargo_inputs();
    }
    
}

function add_manifest_row(id, description, weight) {

    const new_row = `
        <tr>
            <td>${id}</td>
            <td>${description}</td>
            <td>${weight}</td>
        </tr>
    `;
    totalCarWeight += weight;
    totalCargoWeight += weight;

    $("#boxCarWeight").val(totalCarWeight);

    $('#cargoWeightSummaryRow').before(new_row);
    $('#cargoWeightSummaryRow td').eq(2).text(totalCargoWeight);
}   

function create_manifest_table(boxID) {
    const manifest_title = `
        <h3>Manifest: ${boxID}</h3>
    `;

    const new_table = `
        <table id="manifestTable">
            <thead>
                <tr>
                    <th>Transport ID</th>
                    <th>Description</th>
                    <th>Cargo Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr id="cargoWeightSummaryRow">
                    <td></td>
                    <td>Total Cargo Weight</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    `;

    $("body").append(manifest_title, new_table);
}