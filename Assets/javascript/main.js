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
    //Store user location in lat & long variables
    function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        //If user clicks allow position, clear form and show cuisine cards
        if (lat !== undefined) {
            $(".cusine-cards").css("display", "flex");
            $(".location-form").css("display", "none");
            $(".change-heading").text("Time to Pick Your Cusine Type");

            console.log(lat);
            console.log(long);

        }
    }

    //Get user location when the <body> has an id of "userLocation" (secondpage.html)
    if ($('body#userLocation').length > 0) {
        getLocation();
    }

    //Get values from location form
    $("#submit").on("click", function (event) {

        event.preventDefault();

        zip = parseInt($("#zip").val().trim());
        state = $("#state").val().trim();

        //On form submit clear the form and show cuisine cards
        $(".cusine-cards").css("display", "flex");
        $(".location-form").css("display", "none");
        $(".change-heading").text("Time to Pick Your Cusine Type");

        console.log(zip);
        console.log(state);
    });

    $(".card").on("click", function () {
        var queryURL = "";
        var cuisine = ($(this).attr("id"));
        console.log(cuisine);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });


    })

});
