// "use strict";
// Note: jquery-3.4.1.min.js required to support text effect
// Note: jquery-3.4.1.slim.min.js does not support many text Effects

let object1 = null; // used for h2.next
let object2 = null; // used for setTimeout Countdown then execute
let object3 = null; // used for interval Timer
let clock_val = 0;
let timer_running = true;
let clock_running = true;

$(document).ready(function () {
   // alert("DOM Loaded");

   object1 = $("h2").next();
   object2 = setTimeout(showSecret, 10000);
   object3 = setInterval(updateClock, 1000);

   $("#secret_id").hide();
   $("#button_y_id").on("click", process_y);
   $("#button_z_id").on("click", process_z);
   $("#clock_id").on("mouseover", restoreDiv);
   $("#div1_id").on("click", restartClock);

});

const process_y = () => {
   // alert("Process Y");
   object1.slideToggle(1500);
   $("#button_z_id").hide();
   restartClock();
}

const process_z = () => {
   if (timer_running) {
      clearTimeout(object2); // count down timer
      timer_running = false;
   }

   if (clock_running) {
      clearInterval(object3); // count up timer
      clock_running = false;
   }
   // $("div").hide();
};

const showSecret = () => {
   $("#secret_id").show();
};

const updateClock = () => {
   // alert("tick");
   clock_val++;
   $("#clock_id").text(clock_val);
};

const restoreDiv = () => {
   $("div").show();
   $("#button_z_id").show();
};

const restartClock = () => {
   console.log("Restarting Clock");
   if (!clock_running) {
      object3 = setInterval(updateClock, 1000);
      clock_running = true;
   }
};