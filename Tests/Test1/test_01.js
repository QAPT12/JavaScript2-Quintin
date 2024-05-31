"use strict";
// CP1295 Advanced JavaScript CP1295
// window.alert("Script is running");

const $ = selector => document.querySelector(selector);

let total_seats = 0;

const addText = () => {
    clearSpans();
    
    let error = false;

    const text_area = $("#output_ta_id");
    const seats_area = $("#seat_count_id");
    const seats = parseInt($("#seats_id").value);
    const name = $("#name_id").value;

    // Checking name field
    if(name == ''){
        $("#name_feedback_id").textContent = "Name cannot be blank";
        $("#name_id").value = '';
        error = true;
    }

    // Checking seats
    if(isNaN(seats)){ // Seats empty or not number
        $("#seats_feedback_id").textContent = "Seat must be valid number (1-4)";
        $("#seats_id").value = '';
        error = true;
    } else { // Check seats in range
        if(seats < 1 || seats > 4){
            $("#seats_feedback_id").textContent = "Seat must be valid number (1-4)";
            $("#seats_id").value = '';
            error = true;
        }
    }

    // See if too many seats being booked
    if(total_seats + seats > 12){
        error = true;
        seat_count_feedback_id.textContent = "Total seats cannot exceed 12";
    }

    // No error found, add to total seats and text area
    if(!error){
        text_area.value += `\n${name}\t${seats}`;
        total_seats += seats;
        seats_area.value = total_seats;
    }
};

// Function for clearing span error messages
function clearSpans() {
    document.querySelectorAll("span").forEach((span) => {
        span.textContent = '';
    });
}

// Function for clearing input fields
const clearFields = () => {
    const fields = document.querySelectorAll(".clear_list");
    fields.forEach((field) => {
        field.value = '';
    });
    total_seats = 0;
}

// Add event listeners to buttons
$("#process_ticket_id").addEventListener("click", addText);
$("#clear_fields_id").addEventListener("click", clearFields);
