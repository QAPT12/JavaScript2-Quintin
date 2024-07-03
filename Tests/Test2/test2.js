"use strict"

var day_val = 1;
var rain_total = 0;
var snow_total = 0;
var results_array = [];

$(document).ready(() => {
  $("#day_id").val(day_val);
  // reset_form();

  $("#yn_input_id").change(evt => { next_day() })

  $("#precipitation_input_id").on("keyup", check_precipitation_input);
});

const next_day = () => {
  var yn = $("#yn_input_id").val();
  if (yn == "Y" || yn == "y") {
    day_val++;
    $("#day_id").val(day_val);

    if($("#rain_selected_id").prop("checked")){
      var day_rain = parseInt($("#precipitation_input_id").val());
      rain_total += day_rain;
      $("#rain_total_id").val(rain_total);
      var results_str = "Day " + (day_val - 1) + ":  Rain  " + day_rain; 
      results_array.push(results_str);
    } else if($("#snow_selected_id").prop("checked")){
      var day_snow = parseInt($("#precipitation_input_id").val());
      snow_total += day_snow;
      $("#snow_total_id").val(snow_total);
      var results_str = "Day " + (day_val - 1) + ":  Snow  " + day_snow; 
      results_array.push(results_str);
    }
  }
  $("#yn_input_id").val("");
  reset_form();
  if(day_val > 5){
    show_results();
  }
}

const show_results = () => {
  $("#data_entry_id").hide();
  $("#yn_id").hide();
  $("#results_id").show();

  const new_ul = document.createElement("ul");

  for(let i = results_array.length - 1; i >= 0; i--){
    let new_li = document.createElement("li");
    new_li.textContent = results_array[i];
    new_ul.append(new_li);
  }

  $("#results_id").append(new_ul);
}

const check_precipitation_input = () => {
  var precipitation_input_ele = $("#precipitation_input_id");
  var precipitation_input_txt = precipitation_input_ele.val();
  var precipitation_input_val = -1;
  var error_status_p = false;

  if (isNaN(precipitation_input_txt) ||
    precipitation_input_txt == "") {
    error_status_p = true;
    precipitation_input_ele.next().text("Error - Not a Number");
    $("inches_display_id").val("0");
  }
  else {
    precipitation_input_val = parseInt(precipitation_input_txt);

    if (precipitation_input_val < 0 ||
      precipitation_input_val > 1000) {
      error_status_p = true;
      precipitation_input_ele.next().text("Error - <0 or > 1000");
      $("#inches_display_id").val("0");
    }
    else {
      precipitation_input_ele.next().text("");
      var inches_val = get_precip_inches(precipitation_input_val);
      $("#inches_display_id").val(inches_val);
    }
  }

  if(error_status_p == true){
    $("#yn_id").hide();
  } else {
    $("#yn_id").show();
  }
}

const get_precip_inches = (precip_input) => {
  return (precip_input * 0.039701).toFixed(2);

}

const reset_form = () => {
  $("#precipitation_input_id").val("0");
  $("#precipitation_input_id").next().text("");
  $("#inches_display_id").val("0");
  $("#rain_selected_id").prop("checked", true);
  $("#snow_selected_id").prop("checked", false);
  
}
