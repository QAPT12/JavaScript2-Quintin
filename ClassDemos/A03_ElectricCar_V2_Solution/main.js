"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);
const timerObj = $("#timer_id");
const speedKMHObj = $("#speed_KMH_id");
const speedKMMObj = $("#speed_KMM_id");
const batteryMinObj = $("#battery_min_id");

var simulator_status = 0;
var master_clock_var = 0;
var master_clock_step_var = 0;

var power_level_var = 0;
var power_level_step_var = 0;

var charge_status = 0;
var driving_status = 0;
var current_speed_pm_var;

const driving_process = () => {
    console.log(
      `driving_process - master_clock_var ${master_clock_var} ` +
      `charge_status ${charge_status} ` +
      `driving_status ${driving_status} ` +
      `power_level_var ${power_level_var}`
    );
    if (power_level_var <= 0) {
      driving_status = 0;
      power_level_step_var = 0;
      power_level_var = 0;
      const drivingIndicatorObj = $("#battery_drain_id");
      drivingIndicatorObj.checked = false;
      timerObj.nextElementSibling.textContent = "Battery Depleted";
      batteryMinObj.value = "0";
    }
    else {
      var time_left = (power_level_var / power_level_step_var).toFixed(2);
      batteryMinObj.value = time_left * -1;
    }
};


const charge_process = () => {
    console.log(
      `charge_process - master_clock_var ${master_clock_var} ` +
      `charge_status ${charge_status} ` +
      `driving_status ${driving_status} ` +
      `power_level_var ${power_level_var}`
    );
    if (power_level_var >= 100) {
      charge_status =0;
      power_level_step_var = 0;
      power_level_var = 100;
      const chargingIndicatorObj = $("#battery_charge_id");
      chargingIndicatorObj.checked = false;
      timerObj.nextElementSibling.textContent = "Battery charged";
    }
};


const tick = () => {
  if (simulator_status == 1) {
    master_clock_var += master_clock_step_var;
    timerObj.value = master_clock_var;
    power_level_var += power_level_step_var;
    
    console.log(
      `tick - master_clock_var ${master_clock_var} ` +
      `charge_status ${charge_status} ` +
      `driving_status ${driving_status} ` +
      `power_level_var ${power_level_var}`
    );
  
    if (charge_status == 1) {
      charge_process();   
    }

    if (driving_status == 1) {
      driving_process();
    }
    const batteryPowerObj = $("#battery_power_id");
    batteryPowerObj.value = power_level_var.toFixed(2);
  }
}

const start_timer = () => {
  simulator_status = 1;
  // alert("Simulator Started");
  master_clock_step_var = 1;
  setInterval(tick, 2000);
  timerObj.nextElementSibling.textContent = "Simulator Started";
}


const reset_system = () => {

  simulator_status = 0; 
  timerObj.nextElementSibling.textContent = "Simulator not yet started";

  master_clock_var = 0;
  master_clock_step_var = 0;

  power_level_var = 0;
  power_level_step_var = 0;

  timerObj.value = "0";
  timerObj.nextElementSibling.textContent = "Reset Simulator";

  $("#battery_power_id").value = "0";
  $("#battery_charge_id").checked = false;
  $("#battery_drain_id").checked = false;

 
 
}


const valid_input_speed = () => {

  var tempSpeedH = speedKMHObj.value;

  if (!isNaN(tempSpeedH)) {
    tempSpeedH = parseInt( tempSpeedH )

    if (tempSpeedH > 0 && tempSpeedH <= 240) {
      var tempSpeedM = (tempSpeedH / 60.0).toFixed(2);
      speedKMMObj.value = tempSpeedM;
      speedKMHObj.nextElementSibling.textContent = " ";
      return true;
    } 
    else {
      speedKMHObj.nextElementSibling.textContent = "Invalid Input";
      return false;
    }

  }
  else {
    speedKMHObj.nextElementSibling.textContent = "Invalid Input";
    return false;
  }


  return true;
}


const drive_car = () => {

  if (valid_input_speed()) {
    driving_status = 1;
    charge_status = 0;

    const driving_indicator = $("#battery_drain_id");
    const charging_indicator = $("#battery_charge_id");
    driving_indicator.checked = true;
    charging_indicator.checked = false;

    current_speed_pm_var = parseFloat(speedKMMObj.value);
    power_level_step_var = -1 * current_speed_pm_var;
    timerObj.nextElementSibling.textContent = "Driving Car";

  }
  console.log(
    `drive_car - master_clock_var ${master_clock_var} ` +
    `charge_status ${charge_status} ` +
    `driving_status ${driving_status} ` +
    `power_level_var ${power_level_var}`
  );
}

const charge_battery = () => {
  driving_status = 0
  charge_status = 1;
  power_level_step_var = 12
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = true;
  timerObj.nextElementSibling.textContent = "Battery charging";
  console.log(
    `charge_battery - master_clock_var ${master_clock_var} ` +
    `charge_status ${charge_status} ` +
    `driving_status ${driving_status} ` +
    `power_level_var ${power_level_var}`
  );
}

document.addEventListener("DOMContentLoaded",
  () => {
    $("#charge_battery_btn").addEventListener("click", charge_battery);
    $("#drive_car_btn").addEventListener("click", drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);
    timerObj.nextElementSibling.textContent = "Simulator not yet started";
    speedKMHObj.nextElementSibling.textContent = "";
    speedKMMObj.value = "0";
    batteryMinObj.value = "0";
  });
