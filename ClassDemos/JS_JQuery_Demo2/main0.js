"use strict";

$(document).ready(() => {

    $("#faqs h2").click(evt => {
        $(evt.currentTarget).toggleClass("minus");
        $(evt.currentTarget).next().slideToggle(1500);
    });
});