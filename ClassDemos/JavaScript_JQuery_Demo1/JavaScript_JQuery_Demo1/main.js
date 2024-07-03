// "use strict";
// Note: jquery-3.4.1.min.js required to support text effect
// Note: jquery-3.4.1.slim.min.js does not support many text Effects

// let object1 = null; // used for h2.next
// let object2 = null; // used for setTimeout Countdown then execute
// let object3 = null; // used for interval Timer
// let clock_val = 0;

// $(document).ready(function () {
// alert("DOM Loaded");

//  $("h2").click( evt => {
//    // alert ("h2 clicked");
//    $(evt.currentTarget).next().slideToggle(1000);
//    });
//   $(evt.currentTarget).next().slideToggle(1000);
// object1 = $("h2").next();
// object2 = setTimeout(showSecret, 5000);
// object3 = setInterval(updateClock, 1000);

// $("#secret_id").hide();
// $("#button_y_id").on("click", process_y);
// $("#button_z_id").on("click", process_z);
// $("#clock_id").on("mouseover", restoreDiv);

// $("#div1_id").on("dblclick", restartClock);

// });

// const process_y = () => {
// alert("Process Y");
// object1.slideToggle(1000);
// $("#button_z_id").hide();
// }

// const process_z = () => {
// clearTimeout(object2);
// clearInterval(object3);
// $("div").hide();
// };

// const showSecret = () => {
// $("#secret_id").show();
// };

// const updateClock = () => {
// alert("tick");
// clock_val++;
// $("#clock_id").text(clock_val);
// };

// const restoreDiv = () => {
// $("div").show();
// };

// const restartClock = () => {
// object3 = setInterval(updateClock, 1000);
// };