$(document).ready(function() {
    // disable submissions for forms
    $("form").on("submit", function(event){
        event.preventDefault();
    }); 

    // Add events to our buttons
    $("#cargoResetButton").on("click", clear_cargo_inputs);
    $("#processCargoButton").on("click", process_cargo);
});

var totalCarWeight = 15000;
var totalCargoWeight = 0;

function clear_cargo_inputs() {
    $("#cargoID, #cargoDescription, #cargoWeight").val('');
}

function process_cargo() {
    let boxID = $("#boxCarID").val();
    let id = $("#cargoID").val();
    let description = $("#cargoDescription").val();
    let weight = $("#cargoWeight").val();
    if($("#cargoTable").length == 0){
        create_cargo_table(boxID);
    }
    add_cargo_row(id, description, weight);
    clear_cargo_inputs();
}

function add_cargo_row(id, description, weight) {

    const new_row = `
        <tr>
            <td>${id}</td>
            <td>${description}</td>
            <td>${weight}</td>
        </tr>
    `;

    totalCarWeight += parseInt(weight);
    totalCargoWeight += parseInt(weight);

    $("#boxCarWeight").val(totalCarWeight);

    $('#cargoWeightSummaryRow').before(new_row);
    $('#cargoWeightSummaryRow td').eq(2).text(totalCargoWeight);
}   

function create_cargo_table(boxID) {
    const manifest_title = `
        <h3>Cargo Box Car Manifest for Box Car ${boxID}</h3>
    `;

    const new_table = `
        <table id="cargoTable">
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