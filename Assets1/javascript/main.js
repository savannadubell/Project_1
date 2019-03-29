$(document).ready(function () {

    var genres = ["American", "Chinese", "Japanese", "Italian", "Thai", "Mexican"];

    function displayGenre() {
        var genres = $(this).attr("data-name");
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1213&entity_type=city&q=" + genres + "%20%2B%20random&count=1"
    }


    // $("#american","#italian","#chinese","#japanese","#italian","#thai").on("click", function() {


})
