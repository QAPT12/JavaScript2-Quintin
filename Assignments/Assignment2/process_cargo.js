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
    $("#cargoForm input").val('');
}

function clear_spans() {
    $("span").text("");
}

function process_cargo() {
    let submissionError = false;
    clear_spans();

    let boxID = $("#boxCarID").val();
    let id = $("#cargoID").val().trim();
    let description = $("#cargoDescription").val().trim();
    let weight = parseInt($("#cargoWeight").val());
    if($("#statusTable").length == 0){
        create_status_table();
    }
    if($("#manifestTable").length == 0){
        create_manifest_table(boxID);
    }
    

    if(id == "") {
        submissionError = true;
        $("#cargoID").next().text("Transport ID is required");
    }
    if(description == "") {
        submissionError = true;
        $("#cargoDescription").next().text("Cargo Item must have description");
    }
    if(isNaN(weight)) {
        submissionError = true;
        $("#cargoWeight").next().text("Cargo Weight must be numerical");
    } else if(weight < 1) {
        submissionError = true;
        $("#cargoWeight").next().text("Cargo weight must be greater than 1");
    } else if(weight + emptyCarWeight > maxCarWeight) {
        submissionError = true;
        $("#cargoWeight").next().text("Cargo weight + Empty cannot exceed Max");
    }

    if(!submissionError) {
        if(weight + totalCarWeight > maxCarWeight) {
            add_status_row(id, description, weight, "Warehouse");
        } else {
            add_status_row(id, description, weight, boxID);
            add_manifest_row(id, description, weight);
            clear_cargo_inputs();
        }
        
    }
    
}

function create_status_table() {
    const status_title = `
        <h3>Cargo Status</h3>
    `;

    const new_table = `
        <table id="statusTable">
            <thead>
                <tr>
                    <th>Transport ID</th>
                    <th>Description</th>
                    <th>Weight</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    $("body").append(status_title, new_table);
}

function add_status_row(id, description, weight, status){
    const new_row = `
        <tr>
            <td>${id}</td>
            <td>${description}</td>
            <td>${weight}</td>
            <td>${status}</td>
        </tr>
    `;

    $("#statusTable").append(new_row);
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
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr id="cargoWeightSummaryRow">
                    <td></td>
                    <td>Total Weight</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    `;

    $("body").append(manifest_title, new_table);
}