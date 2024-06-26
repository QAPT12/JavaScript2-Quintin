$(document).ready(function(){
    $(".return-button").on("click", return_to_main);
});

function return_to_main() {
    $("#divA").toggle();
}