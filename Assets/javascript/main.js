$(document).ready(function () {

    // Preloader dissapears after 2 seconds
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);

    //Location variables
    var lat
    var long
    var zip
    var state

    //Ask user for their location
    function getLocation() {
        var error = $(".geoError");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            error.text("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(long)
        console.log(lat)
    }

    //Get user location when the <body> has an id of "userLocation" (thirdpage.html)
    if ($('body#userLocation').length > 0) {
        getLocation();
    }

    //Get values from location form
    $("#submit").on("click", function (event) {

        event.preventDefault();

        zip = $("#zip").val().trim();
        state = $("#state").val().trim();
        console.log(zip);
        console.log(state);
    });

    $(".card").on("click", function () {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1213&entity_type=city&q=" + cuisine + "%20%2B%20random&count=1";

        var cuisine = ($(this).attr("id"));
        console.log(cuisine);
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {

        // })


    })

});