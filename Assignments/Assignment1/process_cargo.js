$(document).ready(function() {
    // disable submissions for forms
    $("form").on("submit", function(event){
        event.preventDefault();
    }); 

    // Add events to our buttons
    $("#cargoResetButton").on("click", clear_cargo_inputs);
    $("#processCargoButton").on("click", process_cargo);
});

function clear_cargo_inputs() {
    $("#cargoID, #cargoDescription, #cargoWeight").val('');
}

function process_cargo() {
    let id = $("#cargoID").val();
    let description = $("#cargoDescription").val();
    let weight = $("#cargoWeight").val();
    if($("#cargoTable").length == 0){
        create_cargo_table();
    }
    add_cargo_row(id, description, weight);
    clear_cargo_inputs();
}

function add_cargo_row(id, description, weight) {
    console.log("adding row");
    let table = $("#cargoTable");

    const new_row = `
        <tr>
            <td>${id}</td>
            <td>${description}</td>
            <td>${weight}</td>
        </tr>
    `;

    table.find("tbody").append(new_row);
}

function create_cargo_table() {
    const new_table = `
        <table id="cargoTable">
            <thead>
                <th>Transport ID</th>
                <th>Description</th>
                <th>Weight</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    `;

    $("body").append(new_table);
}