"use strict";
// v101
$(document).ready(() => {
    $("#check_train_btn").click(event => {
        const cookie_value1 = getCookieByName("location");
        $("#train_location_id").val(cookie_value1);
        const cookie_value2 = getCookieByName("speed");
        $("#train_speed_id").val(cookie_value2);
    });
});

const getCookieByName = name => {
    const cookies = document.cookie;
    let start = cookies.indexOf(name + "=");

    if (start === -1) {
        return "";
    }
    else {
        start = start + (name.length + 1);
        let end = cookies.indexOf(";", start);
        if (end === -1) {
            end = cookies.length;
        }
        const cookieValue = cookies.substring(start, end);
        return decodeURIComponent(cookieValue);
    }
};
