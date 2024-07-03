// "use strict";
// Credit for closure example  goes to the following site participants
// https://forum.freecodecamp.org/t/can-you-restart-a-setinterval-after-youve-called-a-clearinterval/407657/5
// 5.3.1 Create a modular JavaScript application using 
// closures or the IIFE design pattern

function simulationClosure() {
   function simulation() {
      console.log(`Simulation Running currentSimulation ${currentSimulation}`);

      updateClock();
   }
   var currentSimulation;
   var run_status = false;

   return {
      start() {
         if (!run_status) {
            currentSimulation = setInterval(simulation, 1000)
            run_status = true;
         }
      },
      stop() {
         if (run_status) {
            clearInterval(currentSimulation)
            run_status = false;
         }
      }
   }
}


var simulation = simulationClosure();
let clock_val = 0;

$(document).ready(function () {
   console.log('DOM is loaded');
   $("#button_y_id").on("click", process_y);
   $("#button_z_id").on("click", process_z);
   $("#field_a_id").val("AAA");
});

const process_y = () => {
   simulation.start();
}

const process_z = () => {
   simulation.stop();
}

const updateClock = () => {
   // alert("tick");
   clock_val++;
   $("#clock_id").text(clock_val);
};
