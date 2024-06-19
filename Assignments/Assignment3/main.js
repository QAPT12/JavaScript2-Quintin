"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);

var masterClockVar = 0;
var masterClockStepVar = 0;

var powerLevelVar = 0.00;
var powerLevelStepVar = 0.00;

var chargeStatus = 0;
var drivingStatus = 0;

var timer;

const systemMessage = $("#system_status_message");
const inputValidationMessage = $("#input_validation_message");


function charge_battery_process(){
  powerLevelStepVar = parseFloat(12.00);
  powerLevelVar = Math.min(powerLevelVar + powerLevelStepVar, 100.00) ;
  $("#battery_power_id").value = (powerLevelVar).toFixed(2);
  $("#battery_min_id").value = (powerLevelVar / parseFloat($("#speed_KMM_id").value)).toFixed(2);
  if (powerLevelVar == 100) {
    systemMessage.textContent = "Battery charged";
    stop_battery_charge();
  }
}

function drive_car_process(){
  powerLevelStepVar = parseFloat($("#speed_KMM_id").value) * -1.00;
  powerLevelVar = Math.max(powerLevelVar + powerLevelStepVar, 0.00);
  $("#battery_power_id").value = (powerLevelVar).toFixed(2);
  $("#battery_min_id").value = (powerLevelVar / parseFloat($("#speed_KMM_id").value)).toFixed(2);
  if (powerLevelVar == 0) {
    systemMessage.textContent = "Battery Depleted";
    stop_drive_car();
  }
}


const tick = () => {
  masterClockVar += masterClockStepVar;
  $("#timer_id").value = masterClockVar;
  if(chargeStatus == 1){
    charge_battery_process();
  }else if(drivingStatus == 1){
    drive_car_process();
  }
}

const start_timer = () => {
  systemMessage.textContent = "Simulator Started";
  masterClockStepVar = 1;
  timer = setInterval(tick, 2000);
}

const stop_timer = () => {
  if(timer) {
    clearInterval(timer);
  }
}


const reset_system = () => {
  inputValidationMessage.textContent = "";
  systemMessage.textContent = "Simulator Not Yet Started";
  stop_timer();

  masterClockVar = 0;
  masterClockStepVar = 0;
  powerLevelVar = 0.00;
  powerLevelStepVar = 0.00;
  chargeStatus = 0;
  drivingStatus = 0;

  $("#battery_drain_id").checked = false;
  $("#battery_charge_id").checked = false;

  $("#battery_power_id").value = 0;
  $("#speed_KMH_id").value = 0;
  $("#speed_KMM_id").value = 0;
  $("#battery_min_id").value = 0;
  $("#timer_id").value = masterClockVar;
}

function start_battery_charge(){
  systemMessage.textContent = "Battery Charging";
  drivingStatus = 0;
  chargeStatus = 1;
  $("#battery_drain_id").checked = false;
  $("#battery_charge_id").checked = true;
}

function stop_battery_charge(){
  drivingStatus = 0;
  chargeStatus = 0;
  $("#battery_drain_id").checked = false;
  $("#battery_charge_id").checked = false;
}

function speed_change_handler(){
  let speedHr = parseFloat($("#speed_KMH_id").value);
  if(speedHr > 0 && speedHr <= 240){
    inputValidationMessage.textContent = "";
    let speedMin = speedHr / 60;
    $("#speed_KMM_id").value =  (speedMin).toFixed(2);
  } else {
    inputValidationMessage.textContent = "Invalid Input";
    $("#speed_KMM_id").value =  0;
  }
  
}


function start_drive_car() {
  systemMessage.textContent = "Driving Car";
  drivingStatus = 1;
  chargeStatus = 0;
  $("#battery_drain_id").checked = true;
  $("#battery_charge_id").checked = false;
}

function stop_drive_car(){
  drivingStatus = 0;
  chargeStatus = 0;
  $("#battery_drain_id").checked = false;
  $("#battery_charge_id").checked = false;
}

document.addEventListener("DOMContentLoaded",
  () => {

    $("#charge_battery_btn").addEventListener("click", start_battery_charge);
    $("#drive_car_btn").addEventListener("click", start_drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);
    $("#speed_KMH_id").addEventListener("keyup", speed_change_handler);

  });
